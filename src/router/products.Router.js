import baseRouter from "./base.Router.js";
import productsController from "../controllers/products.controller.js";


class productsRouter extends baseRouter{
  init(){    

    this.post("/", ["ADMIN"], productsController.createProduct);


    this.get("/", ["PUBLIC"], productsController.getProductById);


    //All Products
    this.get("/",["PUBLIC"],async(req,res)=>{
      const productos = await productsController.getProducts();
      res.send({status:"success",payload: productos})
    })

    this.get("/message", ["PUBLIC"], async (req, res) => {
      try {
        // Llamando a la función de prueba desde el controlador
        const prueba = await productsController.getMessage();
        res.send(prueba);
      } catch (error) {
        console.log("Error getting products", error);
        res.status(500).send({ status: "error", message: "Internal Server Error" });
      }
    });


  //Delete product
  this.delete('/:pid',['PUBLIC'],async (req,res)=>{
      const {pid} = req.params;
      const result = await productsController.deleteProduct(pid);
      res.send({status:"success",message:"Product Deleted"})
  })

  }
}

const prodRouter = new productsRouter();
export default prodRouter.getRouter();








