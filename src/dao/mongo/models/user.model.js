import mongoose from 'mongoose';
const collection = "users"
const schema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    role:{
        type:String,
        enum: ["admin", "user"],
        default: "user",
    },
    cart:{
        type: mongoose.SchemaTypes.ObjectId,
        ref:"carts",
    },
    purchaseHistory:[{
        type: mongoose.SchemaTypes.ObjectId,
        ref:"tickets",
    }]
    
});
const userModel = mongoose.model(collection,schema);
export default userModel