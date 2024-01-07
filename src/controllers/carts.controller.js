import { CartService, productService, TicketService, UserService } from "../services/index.js";
import { findCartByUserId } from "../utils/associatingCart.js";

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



const deleteAllProducts = async (req, res, next) => {
  try {

    const userId = req.user._id;
    const userCart = await findCartByUserId(userId);
    if (userCart) {
      await CartService.updateCart({ _id: userCart._id }, { products: [] });

      return res.send({
        status: "success",
        message: "All products deleted successfully",
      });
    } else {
      return res.send({ status: "error", message: "Cart not found" });
    }
  } catch (error) {
    console.log("Ha ocurrido un error", error);
    return res.status(500).send({ status: "error", message: "Internal Server Error" });
  }
};


// const purchase = async (req, res) => {
//   try {
//     console.log("Esto deberia aparecer");
//     const userId = req.user._id;

//     // Obtener el carrito del usuario
//     const cart = await findCartByUserId(userId);

//     // Verificar si el carrito tiene productos
//     if (!cart || !cart.products || cart.products.length === 0) {
//       return res.status(400).send("No tienes productos en el carrito. Para comprar, agrega al menos un producto.");
//     }

//     // Restar el stock de los productos y actualizar la base de datos
//     for (const productItem of cart.products) {
//       const product = productItem.product;
//       const newStock = product.stock - productItem.quantity;

//       // Verificar si hay suficiente stock
//       if (newStock < 0) {
//         return res.status(400).send(`Stock insuficiente para el producto: ${product.title}`);
//       }

//       // Actualizar el stock del producto en la base de datos
//       await productService.updateProduct(product._id, newStock);
//     }

//     // Vaciar el carrito del usuario
//     const cleanCart = await clearCart(userId);
//     console.log(cleanCart);
//     // Realizar otras acciones necesarias

//     const getTotal = async () => {
//       try {
//         const userCart = await findCartByUserId(userId);
//         const total = calculateCartTotal(userCart);
//         userCart.total = total;
//       } catch (error) {
//         console.log("Error cargando total", error);
//       }
//     };

//     const total = await getTotal();
//     const amount = total;
//     const purchaserEmail = req.user.email;
//     const codeTicket = Date.now().toString(15);

//     console.log(total);

//     const ticketData = {
//       code: codeTicket,
//       amount: amount,
//       purchase_datetime: new Date().toISOString(),
//       purchaser: purchaserEmail,
//       products: cart.products,
//     };

//     const createdTicket = await TicketService.createTicket(ticketData);
//     console.log(ticketData);
//     // No renderizamos la vista de confirmación

//     // Retornamos una respuesta indicando que la compra fue exitosa
//     return res.status(200).send("¡Gracias por tu compra! Volver a la tienda - Ver historial");
//   } catch (error) {
//     console.log("Error al procesar la compra", error);
//     return res.status(500).send("Error al procesar la compra. Por favor, inténtalo nuevamente.");
//   }
// };



export default {
  getCartById,
  createCart,
  deleteCart,
  deleteProduct,
  deleteAllProducts,
  addProduct,
  updateProduct,
  updateCart,
  // purchase
};