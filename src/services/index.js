import cartService from "./cart.Service.js";
import ProductsService from "./product.Service.js";
import UsersService from "./user.Service.js";
import ticketService from "./ticket.Service.js";

import cartManager from "../dao/mongo/modelsManagers/carritosManager.js";
import productManager from "../dao/mongo/modelsManagers/productosManager.js";
import userManager from "../dao/mongo/modelsManagers/userManager.js";
import ticketManager from "../dao/mongo/modelsManagers/ticketManager.js";

export const CartService = new cartService(new cartManager());
export const productService = new ProductsService(new productManager())
export const UserService = new UsersService(new userManager())
export const TicketService = new ticketService(new ticketManager())