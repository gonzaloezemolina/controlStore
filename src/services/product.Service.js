export default class ProductsService {
    constructor(productoManager) {
      this.productoManager = productoManager;
    }
    getProducts = (params) => {
      return this.productoManager.getProducts(params);
    };
 
    getProductById = (params) => {
      return this.productoManager.getProductById(params);
    };

    paginateProducts = (params, paginateOptions) => {
      return this.productoManager.paginateProducts(params, paginateOptions);
    };

    createProduct = (product) => {
      return this.productoManager.createProduct(product);
    };
    updateProduct = (id, product) => {
      return this.productoManager.updateProduct(id, product);
    };
    deleteProduct = (id) => {
      return this.productoManager.deleteProduct(id);
    };
  }