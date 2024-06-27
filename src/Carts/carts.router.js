const express = require("express")
const { postCartController,getCartController,deleteProductController } = require("./carts.controller")
const { verifyToken } = require("../auth/auth.middleware")
const cartRouter = express.Router()

cartRouter.get("/",verifyToken,getCartController)
//verifyToken es el middleware para verificar y con el next pasa al postCartController
cartRouter.post("/",verifyToken,postCartController)

cartRouter.delete("/:product_id",verifyToken,deleteProductController)

module.exports={cartRouter}