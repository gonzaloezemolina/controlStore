import cartServiceManager from "./cart.Service.js";
import ProductsService from "./product.Service.js";
import UsersService from "./user.Service.js";

import cartManager from "../dao/mongo/modelsManagers/carritosManager.js";
import productManager from "../dao/mongo/modelsManagers/productosManager.js";
import userManager from "../dao/mongo/modelsManagers/userManager.js";

export const cartService = new cartServiceManager(new cartManager());
export const productService = new ProductsService(new productManager())
export const UserService = new UsersService(new userManager())
