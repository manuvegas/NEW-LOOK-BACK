const { agregarAlCarritoService, obetenerCarritoService, eliminarProductoDelCarritoService } = require("./carts.service")

const postCartController = async (req, res) => {
  const { product_id, cantidad } = req.body
  const user = req.user
  try {
    const result = await agregarAlCarritoService({ user_id: user.user_id, product_id, cantidad })
    res.status(result.status).json(result)
  } catch (error) {
    res.status(error.status).json(error)
  }
}
const getCartController = async (req, res) => {
  const user = req.user
  try {
    const result = await obetenerCarritoService(user.user_id)
    res.status(result.status).json(result)
  } catch (error) {
    res.status(error.status).json(error)
  }
}
const deleteProductController = async (req, res) => {
  const { product_id } = req.params
  const user = req.user
  try {
    const result = await eliminarProductoDelCarritoService(user.user_id,product_id)
    res.status(result.status).json(result)
  } catch (error) {
    res.status(error.status).json(error)
  }

}

module.exports = { postCartController, getCartController, deleteProductController }