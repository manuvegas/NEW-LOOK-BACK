const { obetenerOCrearCarrito, agregarAlCarrito, obtenerCarritoDetallado, eliminarProductoDelCarrito } = require("./carts.repository")

const agregarAlCarritoService = async (datos) => {
  try {
    const { user_id, product_id, cantidad } = datos
    const carrito = await obetenerOCrearCarrito(user_id)
    const carritoId = carrito.id
    agregarAlCarrito(carritoId, product_id, cantidad)
    return { status: 200, menssage: "producto agregado al carrito" }
  }
  catch (error) {
    return { status: 500, menssage: "Error al agregar producto al carrito" }
  }
}

const obetenerCarritoService = async (user_id) => {
  try {
    const carrito = await obetenerOCrearCarrito(user_id)
    const carritoId = carrito.id
    const carritoDetallado = await obtenerCarritoDetallado(carritoId)
    return { status: 200, message: "Carrito Obtenido", carrito: carritoDetallado }
  } catch (error) {
    return { status: 500, menssage: "Error al obtener productos del carrito" }
  }

}

const eliminarProductoDelCarritoService = async (user_id, product_id) => {
  try {
    const carrito = await obetenerOCrearCarrito(user_id)
    await eliminarProductoDelCarrito(carrito.id, product_id)
    return { status: 200, message: "Producto eliminado del carrito con exito" }
  } catch (error) {
    return { status: 500, menssage: "Error al eliminar un producto del carrito" }
  }

}

module.exports = { agregarAlCarritoService, obetenerCarritoService, eliminarProductoDelCarritoService }