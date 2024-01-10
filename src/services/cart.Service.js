import { findCartByUserId } from "../utils/associatingCart.js";

export default class cartService {
  constructor(dao) {
    this.dao = dao;
  }
  getCartById = (cid) => {
    return this.dao.getCartById(cid);
  };
  createCart = (cart) => {
    return this.dao.createCart(cart);
  };
  updateCart = (id, cart) => {
    return this.dao.updateCart(id, cart);
  };
  deleteCart = (id) => {
    return this.dao.deleteCart(id);
  };
  deleteProductFromCart = async (userId, pid) => {
    try {
      
      const userCart = await findCartByUserId(userId);

      if (!userCart) {
          console.log('No se encontró un carrito para el usuario:', userId);
          return null;
      }

      userCart.products = userCart.products.filter(product => String(product.product._id) !== pid);
        const updatedCart = await userCart.save();

      console.log('Producto eliminado del carrito:', updatedCart);

      return updatedCart;
    } catch (error) {
        console.error('Error en el servicio al eliminar producto del carrito:', error);
        throw error;
    }
}
}
