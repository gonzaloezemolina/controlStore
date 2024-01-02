import { productService } from "../services/index.js";

const productsView = async (req, res) => {
  const pagina = parseInt(req.query.page) || 1;
  const limite = parseInt(req.query.limit) || 9;

  try {
    const currentPage = pagina;

    const user = req.user;
    const isAdmin = user && user.role === 'admin';

    const result = await productService.paginateProducts({}, { page: pagina, limit: limite });

    if (!result || result.docs.length === 0) {
      return res.status(404).send("No se encontraron productos, estamos trabajando en ello :)");
    }

    const { docs, totalDocs, totalPages, hasNextPage, hasPrevPage } = result;

    const nextPage = currentPage + 1;
    const prevPage = currentPage - 1;
    console.log("isAdmin:", isAdmin);
    return res.render('products', {
      status: "success",
      products: docs,
      hasNextPage: hasNextPage,
      hasPrevPage: hasPrevPage,
      totalProducts: totalDocs,
      totalPages: totalPages,
      currentPage: currentPage,
      itemsPerPage: limite,
      nextPage: nextPage,
      prevPage: prevPage,
      isAdmin: isAdmin  
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).send("Error interno del servidor");
  }


};

//Real time products
const productCreator = async (req,res) =>{
  try {
        return res.render("productCreator")
  } catch (error) {
    console.log("Se ha producido un error en vista ProductCreator", error);
  }
}

export default {
  productsView,
  productCreator
};

