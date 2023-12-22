import cartModel from "../models/cart.model.js";


export default class cartManager {
    getCarts = () =>{
        return cartModel.find()
    }

    getCartById = (params) => {
        return cartModel.findOne(params)
    }

    addCart = (newCart) => {
        return cartModel.create(newCart)
    }

    updateCart = (id,carrito) => {
        return cartModel.updateOne({_id:id},{$set:carrito})
    }

     addProductToCart = async (cartId, productId, quantity) => {
        try {
          const cart = await cart.findById(cartId);
      
          if (!cart) {
            throw new Error('Cart not found');
          }
          const existingItem = cart.items.find(item => item.product.equals(productId));
      
          if (existingItem) {
            existingItem.quantity += quantity;
          } else {
            cart.items.push({ product: productId, quantity });
          }
          await cart.save();
      
          return cart;
        } catch (error) {
          throw error;
        }
      }
   

    removeProductFromCart = (cid, pid) => {
        return cartModel.updateOne(
          { _id: cid },
          { $pull: { products: { _id: pid } } }
        );
      };

    deleteCart = (id) => {
        return cartModel.deleteOne({_id:id})
    }
}