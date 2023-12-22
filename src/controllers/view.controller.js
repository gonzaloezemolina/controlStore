import { productService } from "../services/index.js";
import { cartService } from "../services/index.js";
import { UserService } from "../services/index.js";


const home = async (req,res) =>{
    try {
        return res.render('home')
    } catch (error) {
        console.log("Error", error);
    }
}

const login = async (req,res) =>{
    try {
        return res.render('login')
    } catch (error) {
        console.log("Error", error);
    }
}

const register = async (req,res) =>{
    try {
        return res.render('register')
    } catch (error) {
        console.log("Error", error);
    }
}

const profile = async (req,res) =>{
    try {
        return res.render('profile')
    } catch (error) {
        console.log("Error", error);
    }
}



export default{
    home,login,register,profile
}
//  //Home
//  this.get('/',['PUBLIC'],async(req,res)=>{
//     res.render('home')
//   })

//   //Register
//   this.get('/register',['NO_AUTH'],async (req,res)=>{
//     res.render('Register')
//   })

//   //Login
//   this.get('/login',['NO_AUTH'],async(req,res)=>{
//     res.render('login')
//   })

//   //Profile
//   this.get('/profile', ['AUTH'], passport.authenticate('jwt', { session: false }), async (req, res) => {
//     res.render('profile');
// });

//   //Products
//   this.get('/products',['PUBLIC'],async(req,res)=>{
//     const renProducts = await productViewServices.getProducts();
//     res.render("products", {renProducts})
//   })

//   //Usuarios
//   this.get('/users',['ADMIN'],async(req,res)=>{
//     const renUsers = await userViewServices.getUsers();
//     res.render("users", {renUsers})
//   })

//   //Cart
//   this.get('/cart',['AUTH'],async(req,res) =>{
//     res.render('cart')
//   })
// }