import cartManager from "../dao/mongo/modelsManagers/carritosManager.js";
const cartService = new cartManager
const cartSetter = async (req,res,next) => {
    if (req.user && req.cookies.cart) {
        //OPCIONAL
        res.clearCookie("cart");
        return next();
      }
    if(!req.cookies.cart && !req.user){
        const cart = await cartService.createCart();
        console.log("Nuevo carrito creado:", cart);
        res.cookie("cart",cart._id.toString())
        console.log("Cookie 'cart' establecida:", req.cookies.cart)
    }
    next();
}
export default cartSetter