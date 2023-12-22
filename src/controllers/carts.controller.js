import { cartService, productService } from "../services/index.js";
//GetAll
const getCarts = async (req, res) => {
  const carts = await cartService.getCarts();
  return res.send({ status: "success", payload: carts });
};
//GetById
const getCartById = async (req, res) => {
  const { cid } = req.params;
  const cart = await cartService.getCartById({ _id: cid });
  if (!cart)
    return res.status(404).send({ status: "error", message: "Cart not found" });
  res.send({ status: "success", payload: cart });
};
//Create
const createCart = async (req, res) => {
  const result = await cartService.createCart();
  res.send({ status: "success", payload: result._id });
};
//Update
const updateCart = async (req, res) => {
  const { cid, pid } = req.params;
  const cart = await cartService.getCartById({ _id: cid });
  if (!cart)
    return res.status(400).send({ status: "error", message: "Cart not found" });
  const product = await productService.getProductBy({ pid: pid });
  if (!product)
    return res
      .status(400)
      .send({ status: "error", message: "Product not found" });
  const productExistInCart = cart.products.find((item) => {
    return item.product.toString() === pid;
  });
  if (productExistInCart)
    return res
      .status(400)
      .send({ status: "error", message: "Product already in cart" });
  cart.products.push({ product: pid, quantity: +1 });
  await cartService.updateCart(cid, {
    products: cart.products,
    quantity: cart.quantity,
  });
  res.send({ status: "success", payload: cart });
};
//UpdateCartUser
const updateCartUser = async (req, res) => {
  const { pid } = req.params;
  const cart = await cartService.getCartById({ _id: req.user.cart });
  if (!cart) {
    return res.status(400).send({ status: "error", message: "Cart not found" });
  }
  const product = await productService.getProductBy({ _id: pid });
  if (!product)
    return res
      .status(400)
      .send({ status: "error", message: "Product not found" });
  const productExistsInCart = cart.products.find((item) => {
    return item.product.toString() === pid;
  });
  if (productExistsInCart) {
    if (productExistsInCart.stock > 0) {
      productExistsInCart.stock -= 1;
      cart.products.quantity += 1;
    } else {
      return res
        .status(400)
        .send({ status: "error", message: "Not enough stock available." });
    }
  } else {
    if (product.stock > 0) {
      cart.products.push({ product: pid, quantity: 1 });
      product.stock -= 1;
    } else {
      return res
        .status(400)
        .send({ status: "error", message: "Product out of stock." });
    }
  }

  await cartService.updateCart(req.user.cart, {
    products: cart.products,
    quantity: cart.quantity,
  });

  res.send({ status: "success", message: "Cart updated successfully" });
};
//Delete
const deleteCart = async (req, res) => {
  const { cid } = req.params;
  const cart = await cartService.deleteCart({ _id: cid });
  if (!cart)
    return res.status(400).send({ status: "error", message: "Cart not found" });
  await cartService.deleteCart(cid);
  res.send({ status: "success", message: "Cart deleted successfully" });
};

export default {
  getCarts,
  getCartById,
  createCart,
  updateCart,
  updateCartUser,
  deleteCart,
};