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

  
}
