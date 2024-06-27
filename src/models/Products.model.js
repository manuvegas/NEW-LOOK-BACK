const { conectionMongoose } = require("../config/connection.mongodb")
const mongoose = require("mongoose")
const productSchema = mongoose.Schema({
  titulo: { type: String, require: true },
  descripcion: { type: String, require: true },
  precio: { type: Number, required: true },
  stock: { type: Number, required: true },
  codigo: { type: Number, required: true }
})
const Product = conectionMongoose.model("Product", productSchema)

module.exports = Product