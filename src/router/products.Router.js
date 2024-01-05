import baseRouter from "./base.Router.js";
import productsController from "../controllers/products.controller.js";


class productsRouter extends baseRouter{
  init(){    
    //Paginate
    // this.get("/", ["PUBLIC"], productsController.paginateProducts);

    this.post("/", ["ADMIN"], productsController.createProduct);


    //All Products
    this.get("/",["PUBLIC"],async(req,res)=>{
      const productos = await productsController.getProducts();
      res.send({status:"success",payload:"products"})
    })

   

  //Delete product
  this.delete('/:pid',['ADMIN'],async (req,res)=>{
      const {pid} = req.params;
      const result = await productsController.deleteProduct(pid);
      res.send({status:"success",message:"Product Deleted"})
  })

  }
}

const prodRouter = new productsRouter();
export default prodRouter.getRouter();








