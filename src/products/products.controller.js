const { crearProducto, obetenerProductoPorId, eliminarProductoPorId, buscarProductos, actualizarProducto } = require("./products.service")

const postProductController = async (req, res) => {
  try {
    const result = await crearProducto(req.body)
    res.status(200).json(result)
  }
  catch (error) {
    res.status(error.status).json(error)
  }
}
const getProductByIdController = async (req, res) => {
  try {
    const { pid } = req.params
    if (!(pid && !isNaN(pid))) {
      throw { status: 400, message: "debe ser un parametro valido" }
    }
    const result = await obetenerProductoPorId(pid)
    res.status(200).json(result)
  }
  catch (error) {
    res.status(error.status).json(error)
  }
}

const deleteProductByIdController = async (req, res) => {
  try {
    const { pid } = req.params //obtenemos el producto por id

    const result = await eliminarProductoPorId(pid)
    res.status(200).json(result)
  }
  catch (error) {
    res.status(error.status).json(error)
  }
}

const getAllProducts = async (req, res) => {
  try {
    const result = await buscarProductos()
    res.status(200).json(result)
  }
  catch (error) {
    res.status(error.status).json(error)
  }
}

const putProductByIdController = async (req, res) => {
  try {
    const { pid } = req.params
    if (!(pid && !isNaN(pid))) {
      throw { status: 400, message: 'EL ID DEBE SER UN NÚMERO.' }
    }
    const resultado = await actualizarProducto(pid, req.body)
    res.status(200).json(resultado)
  } catch (error) {
    res.status(error.status).json(error)
  }
}

module.exports = { postProductController, putProductByIdController, getProductByIdController, deleteProductByIdController, getAllProducts }