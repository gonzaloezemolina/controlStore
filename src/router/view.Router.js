import baseRouter from "./base.Router.js";
import passport from "passport";
import viewController from "../controllers/view.controller.js";
import userManager from "../dao/mongo/modelsManagers/userManager.js";
const userViewServices = new userManager();

class ViewRouter extends baseRouter{
  init(){

    //Home
    this.get('/',['PUBLIC'],async(req,res)=>{
      res.render('home')
    })

    //Register
    this.get('/register',['NO_AUTH'],async (req,res)=>{
      try {
      res.render('Register')
      } catch (error) {
        console.error("Error obteniendo vista register", error)
      }
    })

    //Login
    this.get('/login',['NO_AUTH'],async(req,res)=>{
      res.render('login')
    })

    //Profile
    this.get('/profile', ['AUTH'], passport.authenticate('jwt', { session: false }), async (req, res) => {
      res.locals.user = req.user;
      res.render('profile');
  });

    //Products
    this.get("/products", ["PUBLIC"], viewController.productsView);

    //Product creator
    this.get("/productCreator",["ADMIN"], viewController.productCreator)

    //Realtimeproducts
    this.get("/realtimeproducts",["ADMIN"], viewController.realTimeProducts)

    //Usuarios
    this.get('/users',['ADMIN'],async(req,res)=>{
      const renUsers = await userViewServices.getUsers();
      res.render("users", {renUsers})
    })

    //Cart
    this.get("/cart",["AUTH"], viewController.cart)
  }
}

const viewsRouter = new ViewRouter();
export default viewsRouter.getRouter();