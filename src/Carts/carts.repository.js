const Cart = require('../models/Cart.model');

const obetenerOCrearCarrito = async (user_id) => {
  try {
    const carrito = await Cart.findOne({ user_id: user_id })
    if (!carrito) {
      const carrito = new Cart({ user_id: user_id, items: [] })
      await carrito.save()
    }
    return carrito
  } catch (error) {
    console.error("MONGODB_ERROR al obetener o crear un carrito", error)
    throw { status: 500, message: "INTERNAL SERVER ERROR" }
  }

}

const agregarAlCarrito = async (cart_id, product_id, cantidad) => {
  try {
    const carrito = await Cart.findById(cart_id)
    if (!carrito) {
      throw { status: 404, message: "Carrito no encontrado" }
    }
    const itemIndex = carrito.items.findIndex((item) => {
      return item.product_id.equals(product_id)
    })
    if (itemIndex === -1) {
      carrito.items.push({ product_id, cantidad })
    }
    else {
      carrito.items[itemIndex].cantidad += cantidad
    }
    await carrito.save()
  }
  catch (error) {
    console.error("SQL_ERROR al agregar al carrito", error)
    throw { status: 500, message: "INTERNAL SERVER ERROR" }
  }
}

const obtenerCarritoDetallado = async (cart_id) => {
  try {
    const carrito = await Cart.findById(cart_id).populate("items.product_id")
    if (!carrito) {
      throw { status: 404, message: "Carrito no encontrado" }
    }
    return carrito
  } catch (error) {
    console.error("SQL_ERROR  al mirar detalles del carrito", error)
    throw { status: 500, message: "INTERNAL SERVER ERROR" }
  }
}

const eliminarProductoDelCarrito = async (cart_id, product_id) => {
  try {
    const carrito = await Cart.findById(cart_id)
    if (!carrito) {
      throw { status: 404, message: "Carrito no encontrado" }
    }
    carrito.items = carrito.items.filter((item => !item.product_id.equals(product_id)))
    await carrito.save()
  } catch (error) {
    console.error("MONGODB_ERROR  al eliminar el producto del carrito", error)
    throw { status: 500, message: "INTERNAL SERVER ERROR" }
  }

}

module.exports = { obetenerOCrearCarrito, agregarAlCarrito, obtenerCarritoDetallado, eliminarProductoDelCarrito }