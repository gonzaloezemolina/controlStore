import cartModel from "../models/cart.model.js";

export default class cartManager {
  getCartById = async (params, options = {}) => {
    if (options.populate) {
      return cartModel.findOne(params).populate("products.product");
    }
    return cartModel.findOne(params).lean();
  };

  createCart = () => {
    return cartModel.create({ products: [], populate: true });
  };

  updateCart = (cid, cart) => {
    return cartModel.updateOne({ _id: cid }, { $set: cart });
  };

  deleteCart = (id) => {
    return cartModel.updateOne({ _id: id }, { $set: { products: [] } });
  };
}