export default class cartServiceManager{
    constructor(carritoManager){
        this.carritoManager=carritoManager
    }
    getCartById = (cid) => {
        return this.carritoManager.getCartById(cid);
      };
      addCart = (newCart) => {
        return this.carritoManager.addCart(newCart);
      };
      updateCart = (id, cart) => {
        return this.carritoManager.updateCart(id, cart);
      };
      deleteCart = (id) => {
        return this.carritoManager.deleteCart(id);
      };
}