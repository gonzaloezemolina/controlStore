import baseRouter from "./base.Router.js";
import productsController from "../controllers/products.controller.js";
import uploader from "../services/uploadService.js";


class productsRouter extends baseRouter{
  init(){    
    //Paginate
    this.get("/", ["PUBLIC"], productsController.paginateProducts);

    this.post("/", ["ADMIN"], productsController.createProduct);


    //All Products
    this.get("/",["PUBLIC"],async(req,res)=>{
      const productos = await productsController.getProducts();
      res.send({status:"success",payload:"products"})
    })

    //Uploader
    this.post("/",["ADMIN"],uploader.array('images'),async(req,res)=>{
      const {
        title,description,price,thumbnail,code,stock
      } = req.body

      if (!title||!description||!price||!thumbnail||!code||!stock) return res.status(400).send({status:"error", error:"Incomplete values"}) 
        
      const newProd = {
        title,
        description,
        price,
        thumbnail,
        code,
        stock
      }

      //Create Product
      const images = req.files.map(file=>`${req.protocol}://${req.hostname}:${process.env.PORT||8080}/img/${file.filename}`);
      newProd.thumbnail = images
      const result = await productsController.createProduct(newProd);
      res.send({status:"success",payload:result._id});
    })


    this.put('/:pid',['ADMIN'],async (req,res)=>{
      const {pid} = req.params;
      const {
          title,
          description,
          price,
          thumbnail,
          code,
          stock
      } = req.body;

      const actualizarProducto = {
          title,
          description,
          price,
          thumbnail,
          code,
          stock
      }

      //Product by id
      const productoporid = await productsController.getProductById({_id:pid});
      if(!productoporid) return res.status(400).send({status:"error",error:"Producto no existe"});
      await productsController.updateProduct(pid,actualizarProducto);
      res.send({status:"success",message:"Product updated"});
  
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








