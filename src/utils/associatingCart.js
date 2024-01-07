import cartModel from "../dao/mongo/models/cart.model.js";
import userModel from "../dao/mongo/models/user.model.js";
import { CartService } from "../services/index.js";

export const findCartByUserId = async (userId) => {
    try {
      const user = await userModel.findById(userId);
  
      if (!user) {
        throw new Error(`No se encontró el usuario con ID ${userId}`);
      }
  
      const cartId = user.cart;
  
      if (!cartId) {
        throw new Error(`El usuario con ID ${userId} no tiene un carrito asociado`);
      }
  
      const cart = await cartModel.findById(cartId);
  
      if (!cart) {
        throw new Error(`No se encontró el carrito con ID ${cartId}`);
      }
  
      return cart;
    } catch (error) {
      throw new Error('Error findCartByUserId', error);
    }
  };



  export const clearCart = async (userId) => {
    try {
      const cart = await CartService.getCartById(userId);

      if (cart) {
        cart.products = []; // Vaciar la lista de productos en el carrito
        await CartService.updateCart(userId, cart);
      }
    } catch (error) {
      throw new Error('Error al limpiar el carrito', error);
    }
  }

  export const calculateCartTotal = (cart) => {
    if (cart && cart.products) {
      const total = cart.products.reduce((acc, cartItem) => {
        if (cartItem.product && cartItem.quantity) {
          return acc + (cartItem.product.price * cartItem.quantity);
        }
        return acc;
      }, 0);
  
      return total;
    }
  
    return 0;
  };