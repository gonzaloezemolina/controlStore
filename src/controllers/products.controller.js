import productModel from "../dao/mongo/models/product.model.js";
import { productService } from "../services/index.js";


const getProducts = async (req, res, next) => {
  try {
    const products = await productService.getProducts({});
    res.status(200).json({ status: "success", payload: products });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

const paginateProducts = async (req, res) => {
  const pagina = parseInt(req.query.page) || 1;
  const limite = parseInt(req.query.limit) || 9;

  try {
    const products = await productService.paginateProducts({}, { page: pagina, limit: limite });
    res.json({ status: "success", payload: products });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
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

const createProduct = async (req, res) => {
  try {
    const product = await productService.createProduct(req.body);
    if (product === "The insert code already exists") {
      res.status(400).json({ message: "Error al crear el producto", product });
    } else if (product === "Complete all fields") {
      res.status(400).json({ message: "Error al crear el producto", product });
    } else {
      res.status(201).json({ message: "Producto creado", product });
    }
  } catch (error) {
    throw new error("Error al crear el producto", error);
  }
};

const updateProduct = async (req, res) => {
  const id = parseInt(req.params.pid);
  const product = await productService.updateProduct(id, req.body);
  if (product) {
    res.status(200).json({ message: "Producto actualizado", product });
  } else {
    res.status(400).json({ message: "Error al actualizar el producto" });
  }
};

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
  paginateProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};