import userModel from "../models/user.model.js";
export default class userManager{
    getUsers = (params) => {
        return userModel.find(params);
    }

    getUserById = (params) => {
        return userModel.findOne(params);
    }

    createUser = (user) => {
        return userModel.create(user);
    }

    updateUser = (id,user) => {
        return userModel.updateOne({_id:id},user);
    }
    
    deleteUser = (id) => {
        return userModel.deleteOne({_id:id})
    }
}