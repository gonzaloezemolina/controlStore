import mongoose from "mongoose";

const collection = "tickets";

const schema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
    },
    purchase_datetime: {
      type: Date,
      required: true,
      default: new Date().toISOString(),
    },
    amount: {
      type: Number,
      required: true,
    },
    purchaser: {
      type: String,
      required: true,
    },
    products: {
      type: Array,
      default: [],
    },
    active: {
      type: Boolean,
      default: true,
    },
    user: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'users' 
    },
  },
  {
    timestamps: false,
  }
);

const ticketModel = mongoose.model(collection, schema);

export default ticketModel;