import { findCartByUserId, calculateCartTotal } from "../utils/associatingCart.js";
import { generarCodigoAleatorio } from "../utils/code.js";
import { productService, TicketService, UserService, CartService } from "../services/index.js";

const purchaseCart = async (req, res, next) => {
    try {
      const userId = req.user._id;
      const userCart = await findCartByUserId(userId);
      const total = calculateCartTotal(userCart)
      userCart.total = total


      const hasSufficientStock = await checkStock(userCart.products);
      console.log(checkStock);
      console.log(hasSufficientStock);

      if (!hasSufficientStock) {
        return res.status(400).json({ status: 'error', message: 'No hay suficiente stock para completar la compra' });
      }

      // Crea un nuevo ticket
      const newTicket = await TicketService.createTicket({
        code: generarCodigoAleatorio(),
        purchase_datetime: new Date().toISOString(),
        user: userId,
        purchaser: req.user.email,
        products: userCart.products,
        amount: userCart.total,
      });

      console.log(newTicket);

      const reducingStock = await reduceStock(userCart.products);
      console.log(reducingStock);
      await UserService.addToPurchaseHistory(userId, newTicket._id);

      // Vacía el carrito del usuario
      await CartService.updateCart({ _id: userCart._id }, { products: [] });

      return res.redirect('/history'); 
    } catch (error) {
      console.error('Error al realizar la compra:', error);
      return res.status(500).json({ status: 'error', message: 'Error interno del servidor' });
    }
  }

async function checkStock(products) {
  for (const item of products) {
    const product = await productService.getProductById(item.product._id);
    if (!product || product.stock < item.quantity) {
      return false;
    }
  }
  return true;
}

async function reduceStock(products) {
  try {
    for (const item of products) {
      const productId = item.product._id; 
      const product = await productService.getProductById(productId); 
      const newStock = product.stock - item.quantity; 
      await productService.updateProduct(productId, { stock: newStock }); 
    }
    return true; 
  } catch (error) {
    console.error('Error al reducir el stock:', error);
    return false; 
  }
}

export default {
  purchaseCart,
};
