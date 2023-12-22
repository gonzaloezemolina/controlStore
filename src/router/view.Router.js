import baseRouter from "./base.Router.js";
import passport from "passport";
import productManager from "../dao/mongo/modelsManagers/productosManager.js";;
import userManager from "../dao/mongo/modelsManagers/userManager.js";
const productViewServices = new productManager();
const userViewServices = new userManager();

class ViewRouter extends baseRouter{
  init(){

    //Home
    this.get('/',['PUBLIC'],async(req,res)=>{
      res.render('home')
    })

    //Register
    this.get('/register',['NO_AUTH'],async (req,res)=>{
      res.render('Register')
    })

    //Login
    this.get('/login',['NO_AUTH'],async(req,res)=>{
      res.render('login')
    })

    //Profile
    this.get('/profile', ['AUTH'], passport.authenticate('jwt', { session: false }), async (req, res) => {
      res.render('profile');
  });

    //Products
    this.get('/products',['PUBLIC'],async(req,res)=>{
      const renProducts = await productViewServices.getProducts();
      res.render("products", {renProducts})
    })

    //Usuarios
    this.get('/users',['ADMIN'],async(req,res)=>{
      const renUsers = await userViewServices.getUsers();
      res.render("users", {renUsers})
    })

    //Cart
    this.get('/cart',['AUTH'],async(req,res) =>{
      res.render('cart')
    })
  }
}

const viewsRouter = new ViewRouter();
export default viewsRouter.getRouter();