import { CartService, productService, TicketService, UserService } from "../services/index.js";

//GetCartById
const getCartById = async (req, res) => {
  const userId = req.params.userId;
  try {
    const cart = await CartService.getCartById(userId);
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Create
const createCart = async (req, res) => {
  try {
    const cart = await CartService.createCart();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const updateCart = async (req, res) => {
  const userId = req.params.userId;
  const updatedCart = req.body;

  try {
    const result = await CartService.updateCart(userId, updatedCart);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



//Delete
const deleteCart = async (req, res) => {
  const userId = req.params.userId;
  try {
    const result = await CartService.deleteCart(userId);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// Add product to cart
const addProduct = async (req, res, next) => {
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
    console.error("Error aca ", error)
  }
};


const purchaseCart = async (req, res, next) => {
  try {
    const { cid } = req.params;
    const user = req.user;
    let productPurchase = [];
    let productNotPurchased = [];

    try {
      const cart = await CartService.getCartById({ _id: cid });
      if (!cart) {
        return res.status(404).send({
          status: "error",
          message: "Cart not found",
        });
      }

      if (req.user.role === "PREMIUM") {
        const userProducts = cart.products.filter(
          (item) => item.product.owner === req.user.id
        );

        if (userProducts.length > 0) {
          return res.status(403).send({
            status: "error",
            message: "Cannot purchase own products",
          });
        }
      }

      for (const item of cart.products) {
        const product = await productService.getProductById(item.product._id);
        if (!product) {
          productNotPurchased.push(item);
          continue;
        }

        if (item.quantity > product.stock) {
          productNotPurchased.push(item);
          continue;
        }

        product.stock -= item.quantity;
        await productService.updateProduct(
          { _id: product._id },
          { stock: product.stock }
        );

        productPurchase.push(item);
      }
    } catch (error) {
      return res.status(500).send({
        status: "error",
        message: "An error occurred while processing the purchase",
      });
    }

    const total = productPurchase.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    );
    const amount = total.toFixed(2);

    const codeTicket = Date.now().toString(15);

    const newTicket = {
      code: codeTicket,
      amount: amount,
      purchase_datetime: new Date().toISOString(),
      purchaser: user.email,
      products: productPurchase,
    };

    try {
      await TicketService.createTicket(newTicket);
      if (productNotPurchased.length > 0) {
        await CartService.updateCart(
          { _id: cid },
          { products: productNotPurchased }
        );
      }
    } catch (error) {
      return res.status(500).send({
        status: "error",
        message: "An error occurred while processing the purchase",
      });
    } 
  } catch{
    console.log("Error function purchaseCart", error);
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







export default {
  getCartById,
  createCart,
  deleteCart,
  deleteProduct,
  deleteTotalProduct,
  addProduct,
  updateProduct,
  updateCart,
  purchaseCart
};