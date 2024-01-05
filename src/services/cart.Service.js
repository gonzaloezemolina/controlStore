export default class cartService {
  constructor(cartManager) {
    this.cartManager = cartManager;
  }

  getCartById = (userId) => {
    return this.cartManager.getCartById(userId);
  };

  createCart = () => {
    return this.cartManager.createCart();
  };

  updateCart = (userId, cart) => {
    return this.cartManager.updateCart(userId, cart);
  };

  deleteCart = (id) => {
    return this.cartManager.deleteCart(id);
  };

  addProductToCart = (userId, productId, quantity) => {
    return this.cartManager.addProductToCart(userId, productId, quantity);
  };

  deleteProductFromCart = (userId, productId) => {
    return this.cartManager.deleteProductFromCart(userId, productId);
  };
}
