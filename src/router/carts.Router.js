import baseRouter from "./base.Router.js";
import cartManager from "../dao/mongo/modelsManagers/carritosManager.js";
const cartService = new cartManager();
class cartRouter extends baseRouter{
  init(){
    this.get(":cid",["user"],cartService.getCartById)

    this.post("/",["admin"],cartService.addCart)

    this.put(":cid/products/:pid",["NO_AUTH"],cartService.updateCart);

    this.put("/products/:pid",["user"],cartService.updateCart)

    this.delete("/:cid",["admin"],cartService.deleteCart)
  }
}

const carritoRouter = new cartRouter();
export default carritoRouter.getRouter();









// import express from "express";
// import productManager from "../dao/mongo/modelsManagers/productosManager.js";
// import cartManager from "../dao/mongo/modelsManagers/carritosManager.js";
// const router = express.Router();
// const cartService = new cartManager();
// const prodService = new productManager()



// router.get("/carts", async (req,res) => {
//     try{
//         const cart = await cartService.getCarts();
//         res.json({cart})
//     } catch (error) {
//         console.log("error", error);
//         res.status(500).json({mesagge: "Carts no encontrados"})
//     }
// })

// router.get("/carts/:cid", async (req,res) => {
//     const cartId = parseInt(req.params.cid);
//     try{
//         const cart = await cartService.getCartbyId(cartId); 
//     if (cart) {
//       res.json(cart);
//     } else {
//       res.status(404).json({ message: 'Cart no encontrado por id' });
//     }
//     } catch (error) {
//         console.log("Error", error);
//     }
// })


// router.post("/carts/", async (req, res) => {
//     const newcart = await cartService.addCart();
//      res.json({ status: "success", newcart });
//   });


//   router.post("/carts/:cid/products/:pid", async (req, res) => {
//     try {
//       const cid = parseInt(req.params.cid);
//       const pid = parseInt(req.params.pid);
  
//       await cartService.addProductToCart(cid, pid);
//       res.json({ status: "success", message: "Producto añadido." });
//     } catch (error) {
//       console.error("Error añadiendo:", error);
//       res.status(500).json({ status: "error", message: "Fallo en añadir el producto" });
//     }
//   });


//   router.delete("/carts/:cid/products/:pid", async (req, res) => {
//     try {
//       const cid = parseInt(req.params.cid);
//       const pid = parseInt(req.params.pid);
  
//       await cartService.removeProductFromCart(cid, pid);
//       res.json({ status: "success", message: "Producto eliminado del carrito." });
//     } catch (error) {
//       console.error("Error", error);
//       res.status(500).json({ status: "error", message: "Fallo en eliminar el producto." });
//     }
//   });

// export default router