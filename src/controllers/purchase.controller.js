import { findCartByUserId, clearCart, calculateCartTotal } from "../utils/associatingCart.js";
import { productService, TicketService } from "../services/index.js";

const purchase = async (req, res) => {
  try {
    console.log("Esto deberia aparecer");
    const userId = req.user._id;

    // Obtener el carrito del usuario
    const cart = await findCartByUserId(userId);

    // Verificar si el carrito tiene productos
    if (!cart || !cart.products || cart.products.length === 0) {
      return res.status(400).send("No tienes productos en el carrito. Para comprar, agrega al menos un producto.");
    }

    // Restar el stock de los productos y actualizar la base de datos
    for (const productItem of cart.products) {
      const product = productItem.product;
      const newStock = product.stock - productItem.quantity;

      // Verificar si hay suficiente stock
      if (newStock < 0) {
        return res.status(400).send(`Stock insuficiente para el producto: ${product.title}`);
      }

      // Actualizar el stock del producto en la base de datos
      await productService.updateProduct(product._id, newStock);
    }

    // Vaciar el carrito del usuario
    const cleanCart = await clearCart(userId);
    console.log(cleanCart);
    // Realizar otras acciones necesarias

    const getTotal = async () => {
      try {
        const userCart = await findCartByUserId(userId);
        const total = calculateCartTotal(userCart);
        userCart.total = total;
      } catch (error) {
        console.log("Error cargando total", error);
      }
    };

    const total = await getTotal();
    const amount = total;
    const purchaserEmail = req.user.email;
    const codeTicket = Date.now().toString(15);

    console.log(total);

    const ticketData = {
      code: codeTicket,
      amount: amount,
      purchase_datetime: new Date().toISOString(),
      purchaser: purchaserEmail,
      products: cart.products,
    };

    const createdTicket = await TicketService.createTicket(ticketData);
    console.log(ticketData);
    // No renderizamos la vista de confirmación

    // Retornamos una respuesta indicando que la compra fue exitosa
    return res.status(200).send("¡Gracias por tu compra! Volver a la tienda - Ver historial");
  } catch (error) {
    console.log("Error al procesar la compra", error);
    return res.status(500).send("Error al procesar la compra. Por favor, inténtalo nuevamente.");
  }
};

export default {
  purchase,
};
