
export default class cartService{
    constructor(carritoManager,productService){
        this.carritoManager=carritoManager
        this.productService = productService;
    }
    getCarts = (params) =>{
      return this.carritoManager.getCarts(params)
    }
    getCartById = (cid) => {
        return this.carritoManager.getCartById(cid);
      };
      addCart = (newCart) => {
        return this.carritoManager.addCart(newCart);
      };
      updateCart = (id, cart) => {
        return this.carritoManager.updateCart(id, cart);
      };
      deleteCart = (id) => {
        return this.carritoManager.deleteCart(id);
      };
      addProductToCart = async (cartId, productId) => {
        try {
          // Obtener información del producto
          const product = await this.productService.getProductById(productId);
    
          // Obtener el carrito actual
          const currentCart = await this.carritoManager.getCartById(cartId);
    
        // Verificar si el carrito actual no es nulo
    // if (currentCart) {
    //   currentCart.products.push(product);

    //   // Resto del código...
    // } else{
    //   console.log("whats going on with the carrrrrt");
    //   // Manejar el caso en el que el carrito es nulo
    // }
    
          // Actualizar el carrito
          await this.carritoManager.updateCart(cartId, currentCart);
    
          return currentCart;
        } catch (error) {
          console.error('Error al agregar al carrito:', error);
          throw error;
        }
      };
    }