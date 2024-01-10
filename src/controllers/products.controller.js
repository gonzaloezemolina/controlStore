import { productService } from "../services/index.js";


const getProducts = async (req, res, next) => {
  try {
    const products = await productService.getProducts({});
    res.send({ status: "success", payload: products });
  } catch (error) {
    res.status(500).send({ status: "error", message: "Internal Server Error" });
  }
};






const getProductById = async (req, res) => {
  const id = parseInt(req.params.pid);
  const product = await productService.getProductById(id);
  if (product === "Not Found") {
    res.status(400).json({ message: "Producto no encontrado" });
  } else if (product) {
    res.status(200).json(product);
  } else {
    res.status(400).json({ message: "Producto no encontrado" });
  }
};


//CreateProduct
const createProduct = async (req, res, next) => {
  try {
    const { title, description, code, price, stock, thumbnail } =
      req.body;
    if (!title || !description || !code || !price || !stock ) {
      return res.status(400).json({ message: "Error! product not created" });
    }

    const newProduct = {
      title,
      description,
      code,
      thumbnail,
      price,
      stock,
    };


    if (thumbnail !== undefined) {
      newProduct.thumbnail = thumbnail;
    }


    const product = await productService.createProduct(newProduct);

    if (product === "The insert code already exists") {
      return res.status(400).json({ message: "Error! product not created" });
    } else if (product === "Complete all fields") {
      return res.status(400).json({ message: "Error! product not created" });
    } else {
      return res.status(201).json({ message: "Product created", product });
    }
  } catch (error) {
    console.log("Otro error mas", error);
  }
}


//UpdateProduct
const updateProduct = async (req, res) => {
  const id = parseInt(req.params.pid);
  const product = await productService.updateProduct(id, req.body);
  if (product) {
    res.status(200).json({ message: "Producto actualizado", product });
  } else {
    res.status(400).json({ message: "Error al actualizar el producto" });
  }
};


//DeleteProduct
const deleteProduct = async (req, res) => {
  const id = parseInt(req.params.pid);
  const product = await productService.deleteProduct(id);
  if (product === `Can't find product with id : ${id}`) {
    return res
      .status(400)
      .json({ message: "Error al eliminar el producto", product });
  } else if (product) {
    return res.status(200).json({ message: "Producto eliminado", product });
  } else {
    return res.status(400).json({ message: "Error al eliminar el producto" });
  }
};

export default {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};