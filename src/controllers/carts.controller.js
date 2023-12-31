import cartService from "../services/cart.Service.js";
import { CartService, productService } from "../services/index.js";
//GetAll
const getCarts = async (req, res) => {
  const carts = await CartService.getCarts();
  return res.send({ status: "success", payload: carts });
};
//GetById
const getCartById = async (req, res) => {
  const { cid } = req.params;
  const cart = await CartService.getCartById({ _id: cid });
  if (!cart)
    return res.status(404).send({ status: "error", message: "Cart not found" });
  res.send({ status: "success", payload: cart });
};
//Create
const addCart = async (req, res) => {
  const result = await CartService.addCart();
  res.send({ status: "success", payload: result._id });
};
//Update
const updateCart = async (req, res) => {
  const { cid, pid } = req.params;
  const cart = await CartService.getCartById({ _id: cid });
  if (!cart)
    return res.status(400).send({ status: "error", message: "Cart not found" });
  const product = await productService.getProductById({ pid: pid });
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
  await CartService.updateCart(cid, {
    products: cart.products,
    quantity: cart.quantity,
  });
  res.send({ status: "success", payload: cart });
};
//UpdateCartUser
const updateCartUser = async (req, res) => {
  const { pid } = req.params;
  const cart = await CartService.getCartById({ _id: req.user.cart });
  if (!cart) {
    return res.status(400).send({ status: "error", message: "Cart not found" });
  }
  const product = await productService.getProductById({ _id: pid });
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

  await CartService.updateCart(req.user.cart, {
    products: cart.products,
    quantity: cart.quantity,
  });

  res.send({ status: "success", message: "Cart updated successfully" });
};
//Delete
const deleteCart = async (req, res) => {
  const { cid } = req.params;
  const cart = await CartService.deleteCart({ _id: cid });
  if (!cart)
    return res.status(400).send({ status: "error", message: "Cart not found" });
  await CartService.deleteCart(cid);
  res.send({ status: "success", message: "Cart deleted successfully" });
};



const addProductToCart = async (req, res) => {
  try {
    const productId = req.params.productId;
    // Crea un objeto de filtro con el ID del producto
    const filter = { _id: productId };
    // Obtener información del producto
    const product = await productService.getProductById(filter);
    await CartService.addProductToCart(req.user, product);
    
    
    res.json({ success: true, message: 'Producto agregado al carrito' });
  } catch (error) {
    console.error('Error al agregar al carrito:', error);
    res.status(500).json({ success: false, message: 'Error al agregar al carrito' });
  }
};










export default {
  getCarts,
  getCartById,
  addCart,
  updateCart,
  updateCartUser,
  deleteCart,
  addProductToCart
};