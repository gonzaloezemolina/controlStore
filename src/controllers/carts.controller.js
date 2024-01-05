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
const addProductToCart = async (req, res) => {
  try {
    const userId = req.user._id; // Obtén el ID del usuario autenticado
    const user = await UserService.getUserById(userId);

    if (!user) {
      throw new Error(`No se encontró el usuario con ID ${userId}`);
    }

    const cartId = user.cart; // Obtén el ID del carrito asociado al usuario

    // Llamar al servicio de carrito para agregar el producto al carrito existente
    const productId = req.params.productId;
    const quantity = req.body.quantity;
    const updatedCart = await CartService.addProductToCart(cartId, productId, quantity);

    res.json(updatedCart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }


  // const userCart = req.user.cart;
  // const productId = req.params.pid;
  // const quantity = req.body.quantity;


  // console.log('userCart:', userCart);
  //   console.log('productId:', productId);
  //   console.log('quantity:', quantity);
  //   console.log(typeof req.user.cart);
  // try {
  //   // Realiza la lógica para agregar el producto al carrito usando cartService
  //   const cart = await CartService.addProductToCart(userCart, productId, quantity);
  //   res.json(cart);
  // } catch (error) {
  //   res.status(500).json({ error: error.message });
  // }
};




// const addProductToCart = async (req, res, next) => {
//   try {
//     const { cid, pid, quantity } = req.params;
//     const product = await productService.getProductById({
//       _id: req.params.pid,
//     });
//     let cart;
//     if (cid) {
//       cart = await CartService.getCartById({ _id: cid });
//     } else {
//       cart = await CartService.getCartById({ _id: req.user.cart });
//     }
//     const quantityAdd = quantity ? quantity : 1;

//     if (cart && product) {
//       if (req.user.role === "PREMIUM" && product.owner === req.user.id) {
//         return res
//           .status(403)
//           .send({ status: "error", message: "Cannot add own product to cart" });
//       }

//       let arrayProducts = await cart.products;
//       let positionProduct = arrayProducts.findIndex(
//         (product) => product.product._id == pid
//       );

//       if (positionProduct != -1) {
//         arrayProducts[positionProduct].quantity =
//           arrayProducts[positionProduct].quantity + quantityAdd;
//       } else {
//         arrayProducts.push({ product: pid, quantity: quantityAdd });
//       }

//       await CartService.updateCart(
//         { _id: cart._id },
//         { products: arrayProducts }
//       );
//       return res.send({ status: "success", message: "Added successfully" });
//     } else {
//       return res
//         .status(404)
//         .send({ status: "error", message: "Product or Cart not found" });
//     }
//   } catch (error) {
//     console.log("Error en cart Controller, addProduct", error);
//   }
// };









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
  addProductToCart,
  updateProduct,
  updateCart
};