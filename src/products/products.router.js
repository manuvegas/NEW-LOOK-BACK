const express = require("express")
const { postProductController,putProductByIdController, getProductByIdController, deleteProductByIdController, getAllProducts } = require("./products.controller")
const productRouter = express.Router()


productRouter.get("/", getAllProducts)

productRouter.post("/", postProductController)

productRouter.put("/:pid",putProductByIdController)

productRouter.delete("/:pid", deleteProductByIdController)

productRouter.get("/:pid", getProductByIdController)


module.exports = { productRouter }