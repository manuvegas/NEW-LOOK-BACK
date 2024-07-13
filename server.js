const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")
dotenv.config()
const { db } = require("./src/config/connection.mongodb")
const { authRouter } = require("./src/auth/auth.router")
const { productRouter } = require("./src/products/products.router")
const { cartRouter } = require("./src/Carts/carts.router")
const routerSearch = require("./src/search/search.router")
const ImagesRouter = require("./src/imgs/imgs.router")
const PORT = process.env.PORT || 4000
const app = express()
app.use(cors())
app.use(express.json())
app.use("/api/auth", authRouter)
app.use("/api/products", productRouter)
app.use("/api/images",ImagesRouter )
app.use("/api/carts", cartRouter)
app.use('/api/search', routerSearch);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})


