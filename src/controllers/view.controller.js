import { productService} from "../services/index.js";
import { findCartByUserId, calculateCartTotal } from "../utils/associatingCart.js";

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

//ProductCreator
const productCreator = async (req,res) =>{
  try {
        return res.render("productCreator")
  } catch (error) {
    console.log("Se ha producido un error en vista ProductCreator", error);
  }
}

//Realtimeproducts
const realTimeProducts = async (req, res) => {
  try {
    const productos = await productService.getProducts();
    return res.render('realtimeproducts', { productos });
  } catch (error) {
    console.error('Error en realTimeProducts:', error);
    res.status(500).send('Error interno del servidor');
  }
};

//cartView
const cart = async (req,res) => {
  try {
    const userId = req.user._id;
    const userCart = await findCartByUserId(userId); 
    const total = calculateCartTotal(userCart);
    userCart.total = total;
    console.log(userCart.total); 
    return res.render("cart", { cart: userCart });  
  } catch (error) {
    console.log("Error renderizando vista Cart", error);
  }
}

const purchase = async (req,res) =>{
  try {

    res.locals.user = req.user;
    const userId = req.user._id;
    const cart = await findCartByUserId(userId);
    const total = calculateCartTotal(cart)
    cart.total = total;

    if (!cart || !cart.products || cart.products.length === 0) {
      return res.send("No tienes productos en el carrito. Para comprar debes agregar al menos un producto."); 
    }
    return res.render("purchase", {cart: cart})
  } catch (error) {
   console.log("Error renderizando vista purchase", error); 
  }
}


export default {
  productsView,
  productCreator,
  realTimeProducts,
  cart,
  purchase
};

