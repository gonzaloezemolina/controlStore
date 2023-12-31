import cartService from "./cart.Service.js";
import ProductsService from "./product.Service.js";
import UsersService from "./user.Service.js";

import cartManager from "../dao/mongo/modelsManagers/carritosManager.js";
import productManager from "../dao/mongo/modelsManagers/productosManager.js";
import userManager from "../dao/mongo/modelsManagers/userManager.js";

export const productService = new ProductsService(new productManager())
export const UserService = new UsersService(new userManager())
export const CartService = new cartService(new cartManager(), productService, UserService);