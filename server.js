const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")
dotenv.config()
const { db } = require("./src/config/connection.mongodb")
const { authRouter } = require("./src/auth/auth.router")
const { productRouter } = require("./src/products/products.router")
const { cartRouter } = require("./src/Carts/carts.router")
const PORT = process.env.PORT || 4040
const app = express()
app.use(cors())
app.use(express.json())
app.use("/api/auth", authRouter)
app.use("/api/products", productRouter)
app.use("/api/carts", cartRouter)
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})


