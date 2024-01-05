import cartModel from "../models/cart.model.js";

export default class cartManager {
  getCartById = async (userId) => {
    const cart = await cartModel.findOne({userId})
    return cart
  }


  createCart = async (userId) => {
    try {
      const newCart = new cartModel({ user: userId, products: [] });
      const savedCart = await newCart.save();
      return savedCart;
    } catch (error) {
      throw error;
    }
  };

  updateCart = (userId, cart) => {
    return cartModel.updateOne({ _id: userId }, { $set: cart });
  };

  deleteCart = (id) => {
    return cartModel.updateOne({ _id: id }, { $set: { products: [] } });
  };


  addProductToCart = async (userId, productId, quantity) => {
    try {
      let cart = await cartModel.findOne({ user: userId });
  
      if (!cart) {
        cart = new cartModel({ user: userId, products: [{ productId, quantity }] });
      } else {
        const existingProductIndex = cart.products.findIndex(
          (product) => product.productId.toString() === productId.toString()
        );
  
        if (existingProductIndex !== -1) {
          cart.products[existingProductIndex].quantity += quantity;
        } else {
          cart.products.push({ productId, quantity });
        }
      }
  
      await cart.save();
      return cart;
    } catch (error) {
      throw new Error('Error addProductToCart', error);
    }
  }


  deleteProductFromCart = async (userId, productId) => {
    try {
      const cart = await cartModel.findOne({userId})
      if (cart) {
        cart.products = cart.products.filter(
          (product) => product.productId.toString() !== productId.toString()
        );

        await cart.save();
        return cart;
      }
    } catch (error) {
      console.log("Error deleteProductFromCart", error);
    }
  }
}