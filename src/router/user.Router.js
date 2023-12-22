import baseRouter from "./base.Router.js";
import userController from "../controllers/user.controller.js";


class userRouter extends baseRouter {
    init(){
        this.get("/", ["ADMIN"], userController.getUsers);
    }
}

const usRouter = new userRouter
export default usRouter.getRouter()