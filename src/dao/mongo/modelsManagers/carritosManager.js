import cartModel from "../models/cart.model.js";


export default class cartManager {
  getCarts = () => {
    return cartModel.find();
  };

  getCartById = (params) => {
    return cartModel.findById(params);
  };

  addCart = (newCart) => {
    return cartModel.create(newCart);
  };

  updateCart = (id, cart) => {
    return cartModel.updateOne({ _id: id }, { $set: cart });
  };

  // Añade el producto al carrito
  addProductToCart = async (cartId, productId, quantity) => {
    try {
      const cart = await cartModel.findById(cartId);

      if (!cart) {
        throw new Error('No se encontró el carrito');
      }

      const existingItem = cart.products.find((item) => item.product.equals(productId));

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.products.push({ product: productId, quantity });
      }

      await cart.save();

      return cart;
    } catch (error) {
      console.error('Error al agregar producto al carrito:', error);
      throw error;
    }
  };

  removeProductFromCart = (cartId, productId) => {
    return cartModel.updateOne(
      { _id: cartId },
      { $pull: { products: { product: productId } } }
    );
  };

  deleteCart = (id) => {
    return cartModel.deleteOne({ _id: id });
  };
}