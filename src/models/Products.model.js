const { conectionMongoose } = require("../config/connection.mongodb");
const mongoose = require("mongoose");

const talleSchema = new mongoose.Schema({
  nombre: { type: String, enum: ['S', 'M', 'L', 'XL', 'XXL'], required: true },
  stock: { type: Number, required: true }
});

const colorSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  talles: { type: [talleSchema], required: true }
});

const productSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  descripcion: { type: String, required: true },
  precio: { type: Number, required: true },
  img: { type: String, required: true },
  cuotas: { type: Number, required: true },
  colores: { type: [colorSchema], required: true },
  categoria: { type: String, required: true }
});

const Product = conectionMongoose.model("Product", productSchema);

module.exports = Product;