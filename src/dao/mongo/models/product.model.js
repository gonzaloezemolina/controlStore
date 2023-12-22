import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const collection = "products"


const schema = new mongoose.Schema({
    title:{
        type : String,
        required : true,
    },
    categories:{
        type: Array,
        default: []
    },
    description:{
        type: String,
        required: true,
    },
    price:{
        type: Number,
        required: true,
    },
    thumbnail:{
        type: String,
        required: true
    },
    code:{
        type:Number,
        required: true
    },
    stock:{
        type:Number,
        required:true
    },
    status:{
        type: Boolean,
        default: true
    }
},{timestamps:true});

schema.plugin(mongoosePaginate);


const productModel = mongoose.model(collection,schema)
export default productModel