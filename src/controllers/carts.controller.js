import { CartService, productService, TicketService } from "../services/index.js";

//GetCarts
const getCarts = async (req, res) => {
  try {
    const obtainingCarts = await CartService.getCarts();
    return res.send({ status: "success", payload: obtainingCarts });
  } catch (error) {
    console.log("Se ha producido un error", error);
  }
};

//GetCartById
const getCartById = async (req, res) => {
  try {
    const { cid } = req.params;
  const cartXid = await CartService.getCartById({ _id: cid });
  if (!cartXid) {
    return res.status(404).send({ status: "error", message: "Cart x ID not found" });
  } else{
    res.send({ status: "success", payload: cartXid });
  }
  } catch (error) {
    console.log("Se ha producido un error", error);
  }
};


//Create
const CreateCart = async (req, res) => {
  try {
    const result = await CartService.createCart();
    res.send({ status: "success", payload: result._id });
  } catch (error) {
    console.log("Se ha producido un error", error);
  }
};




//Delete
const deleteCart = async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await CartService.deleteCart({ _id: cid });
    if (!cart) {
      return res.status(400).send({ status: "error", message: "Cart not found" });
    } else{
    res.send({ status: "success", message: "Cart deleted successfully" });
    }
    await CartService.deleteCart(cid);
  } catch (error) {
    console.log("Se ha producido un error", error);
  }
};



//Add product to cart

const addProductToCart = async (req,res,next) =>{
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
        arrayProducts.push({ product: pid, quantity: quantityAdd });
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
    console.log("Se ha producido un error", error);
  }
}



const updateProduct = async (req, res, next) => {
  try {
    const { cid, pid, quantity } = req.params;

    const cartId = await CartService.getCartById(cid);
    const quantityAdd = quantity ? quantity : 1;

    let objCart = await cartId[0];
    if (objCart) {
      const productId = await objCart.products.find(
        (product) => product.product._id == pid
      );
      if (productId) {
        let arrayProducts = await objCart.products;
        let positionProduct = await arrayProducts.findIndex(
          (product) => product.product._id == pid
        );

        arrayProducts[await positionProduct].quantity = quantityAdd;
        await CartService.updateCart(
          { _id: cid },
          { products: arrayProducts }
        );
        return res.send({
          status: "success",
          message: "Product updated successfully",
        });
      } else {
        return res.send({ status: "error", message: "Product not found" });
      }
    } else {
      return res.send({ status: "error", message: "Cart not found" });
    }
  } catch (error) {
    console.log("Se ha producido un error", error);
  }
};







//Delete product from cart


const deleteProduct = async (req, res, next) => {
  try {
    const cartId = await CartService.getCartById(cid);

    let objCart = await cartId[0];
    if (objCart) {
      const productId = await objCart.products.find(
        (product) => product.product._id == pid
      );
      if (productId) {
        let arrayProducts = await objCart.products;
        let newArrayProducts = await arrayProducts.filter(
          (product) => product.product._id != pid
        );

        if (newArrayProducts) {
          await CartService.updateCart(
            { _id: cid },
            { products: newArrayProducts }
          );
          return "Deleted successfully";
        }
      } else {
        return `Product not found`;
      }
    } else {
      return "Cart Not Found";
    }
  } catch (error) {
    console.log("Ha ocurrido un error", error);
  }
};


//Delete total of products 

const deleteTotalProduct = async (req, res, next) => {
  try {
    const { cid } = req.params;
    //accedo a la lista de carritos para ver si existe el id buscado
    const cart = await CartService.getCartById({ _id: cid });
    if (cart) {
      await CartService.updateCart({ _id: cid }, { products: [] });

      return res.send({
        status: "success",
        message: "All products deleted successfully",
      });
    } else {
      return res.send({ status: "error", message: "Cart not found" });
    }
  } catch (error) {
    console.log("Ha ocurrido un error", error);
  }
};



const showCart = async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await CartService.getCartById({ _id: cid });
    if (!cart) {
      return res.status(404).send({ status: "error", message: "Cart not found" });
    }
    res.render('cart', { cart, products: cart.products || [] });
  } catch (error) {
    console.log("Se ha producido un error", error);
    res.status(500).send({ status: "error", message: "Internal Server Error" });
  }
};


export default {
  getCarts,
  getCartById,
  CreateCart,
  deleteCart,
  deleteProduct,
  deleteTotalProduct,
  addProductToCart,
  showCart,
  updateProduct
};