const { insertarProducto, seleccionarProductoPorId, deleteProductoPorId, seleccionarProductos, modificarProductoPorId } = require("./products.repository")
const { validarPropiedadesProducto } = require("./utils/validarProducto")

const crearProducto = async (producto) => {
  try {
    const paso = validarPropiedadesProducto(producto)
    if (paso) {
      const idCreado = await insertarProducto(producto)
      return { ok: true, message: `producto creado con id ${idCreado}`, idCreado: idCreado }
    }
    else {
      throw { status: 400, message: "exepcion:no se pasaron las validaciones del producto" }
    }
  }
  catch (error) {
    if (error.status) {
      throw error
    }
    else {
      throw { status: 500, message: "error interno del servidort de insertar" }
    }
  }
}

const obetenerProductoPorId = async (pid) => {
  try {
    const producto = await seleccionarProductoPorId(pid)
    return { ok: true, status: 200, producto }
  }
  catch (error) {
    if (error.status) {
      throw error
    }
    else {
      throw { status: 500, message: "error interno del servidor" }
    }
  }
}

const eliminarProductoPorId = async (pid) => {
  try {
    const producto = await deleteProductoPorId(pid)
    return { ok: true, status: 200, producto }
  }
  catch (error) {
    if (error.status) {
      throw error
    }
    else {
      throw { status: 500, message: "Error interno del servidor" }
    }
  }
}

const buscarProductos = async () => {
  try {
    productos = await seleccionarProductos()
    if (productos.length === 0) {
      throw { status: 404, message: "NO" }
    }
    return { status: 200, message: "productos obtenidos", productos: productos }
  }
  catch (error) {
    throw error
  }
}

const actualizarProducto = async (pid, producto) => {
  try {
    validarProducto(producto)
    const modificarProducto = await modificarProductoPorId(pid, producto)
    return { status: 200, message: 'PRODUCTO MODIFICADO CORRECTAMENTE' }
  } catch (error) {
    if (error.status) {
      throw error
    }
    else {
      throw { status: 500, message: 'ERROR DESCONOCIDO.' }
    }
  }
}


module.exports = { crearProducto, buscarProductos, actualizarProducto, obetenerProductoPorId, eliminarProductoPorId }






