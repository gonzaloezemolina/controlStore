import baseRouter from "./base.Router.js";
import purchaseController from "../controllers/purchase.controller.js";

class purchaseRouter extends baseRouter{
  init(){
    this.post("/purchase",["AUTH"],  purchaseController.purchaseCart)
}
}

const PurchaseRouter = new purchaseRouter();
export default PurchaseRouter.getRouter();