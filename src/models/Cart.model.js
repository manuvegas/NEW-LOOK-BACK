const { conectionMongoose } = require("../config/connection.mongodb")
const mongoose = require("mongoose")

const cartItemSchema = new mongoose.Schema({
  product_id: {
    type: conectionMongoose.Schema.Types.ObjectId, ref: "Product", required: true
  },
  cantidad: {
    type: Number,
    required: true
  }
})
const cartSchema = new mongoose.Schema({
  user_id: { type: conectionMongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [cartItemSchema]
})
const Cart = conectionMongoose.model("Cart", cartSchema)

module.exports = Cart