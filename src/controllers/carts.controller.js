import { CartService, productService, TicketService, UserService } from "../services/index.js";
import { findCartByUserId } from "../utils/associatingCart.js";

//GetCartById
const getCartById = async (req, res) => {
  const userId = req.params.userId;
  try {
    const cart = await CartService.getCartById(userId);
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

//Create
const createCart = async (req, res) => {
  try {
    const cart = await CartService.createCart();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

//UpdateCart
const updateCart = async (req, res) => {
  const userId = req.params.userId;
  const updatedCart = req.body;

  try {
    const result = await CartService.updateCart(userId, updatedCart);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};


//Delete
const deleteCart = async (req, res) => {
  const userId = req.params.userId;
  try {
    const result = await CartService.deleteCart(userId);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};


// Add product to cart
const addProduct = async (req, res, next) => {
  try {
    const { cid, pid, quantity } = req.params;
    const product = await productService.getProductById({
      _id: req.params.pid,
    });
    let cart;
    if (cid) {
      cart = await CartService.getCartById({ _id: cid });
    } else {
      cart = await CartService.getCartById({ _id: req.user.cart });
    }
    const quantityAdd = quantity ? quantity : 1;

    if (cart && product) {
      if (req.user.role === "ADMIN" && product.owner === req.user.id) {
        return res
          .status(403)
          .send({ status: "error", message: "Cannot add own product to cart" });
      }

      let arrayProducts = await cart.products;
      let positionProduct = arrayProducts.findIndex(
        (product) => product.product._id == pid
      );

      if (positionProduct != -1) {
        arrayProducts[positionProduct].quantity =
          arrayProducts[positionProduct].quantity + quantityAdd;
      } else {
        arrayProducts.push({ 
          product: pid, 
          quantity: quantityAdd,
          title: product.title });
      }

      await CartService.updateCart(
        { _id: cart._id },
        { products: arrayProducts }
      );
      return res.send({ status: "success", message: "Added successfully" });
    } else {
      return res
        .status(404)
        .send({ status: "error", message: "Product or Cart not found" });
    }
  } catch (error) {
    console.error("Error agregando producto ", error)
  }
};


//Delete product from cart
const deleteProductFromCart = async (req, res,) => {
  try {
    const { pid } = req.params;
    const userId = req.user._id; 

    const updatedCart = await CartService.deleteProductFromCart(userId, pid);

    res.json({ cart: updatedCart });
} catch (error) {
    console.error('Error al eliminar producto del carrito:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
}
};


//DeleteAllProducts
const deleteAllProducts = async (req, res, next) => {
  try {

    const userId = req.user._id;
    const userCart = await findCartByUserId(userId);
    if (userCart) {
      await CartService.updateCart({ _id: userCart._id }, { products: [] });

      return res.send({
        status: "success",
        message: "All products deleted successfully",
      });
    } else {
      return res.send({ status: "error", message: "Cart not found" });
    }
  } catch (error) {
    console.log("Ha ocurrido un error", error);
    return res.status(500).send({ status: "error", message: "Internal Server Error" });
  }
};




export default {
  getCartById,
  createCart,
  deleteCart,
  deleteProductFromCart,
  deleteAllProducts,
  addProduct,
  updateCart,
};