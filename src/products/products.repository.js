
const insertarProducto = async ({ titulo, descripcion, stock, precio, codigo }) => {
  try {
    const nuevoProducto = new Product({ titulo, descripcion, stock, precio, codigo })
    await nuevoProducto.save()
    return nuevoProducto._id
  }
  catch (error) {
    throw { status: 500, message: "Error interno en el servidor" }
  }
}

const seleccionarProductoPorId = async (pid) => {
  try {
    const producto = await Product.findById(pid)
    if (!producto) {
      throw { status: 404, message: `producto con id` + pid + `no encontrado` }
    }
    else { return producto }

  }
  catch (error) {
    throw { status: 500, message: "Error interno en el servidor" }
  }
}

const deleteProductoPorId = async (pid) => {
  try {
    const producto = await Product.findByIdAndDelete(pid)

    if (!producto) {
      throw { status: 404, message: 'Producto con id ' + pid + ' no existe' }
    }
    else {
      throw { status: 200, message: 'Producto con id ' + pid + ' eliminado correctamente' }
    }
  }
  catch (error) {
    if (error.status === 404) {
      throw error
    }
    else {
      throw { status: 500, message: 'Error interno en el servidor', error }
    }
  }
}

const seleccionarProductos = async () => {
  try {
   const productos = await Product.find({})
    return productos
  }
  catch (error) {
    if (error.status) {
      throw error
    }
    else {
      throw { status: 500, message: 'Error interno en el servidor' }
    }
  }
}

const modificarProductoPorId = async (pid, producto) => {
  const { titulo, descripcion, stock, precio, codigo } = producto
  try {
    const modificar = 'UPDATE productos SET titulo = ?, descripcion = ?, stock = ?, precio = ?, codigo = ? WHERE id = ?'
    const valores = [titulo, descripcion, stock, precio, codigo, pid]
    const resultadoModificar = await query(modificar, valores)
    if (resultadoModificar.affectedRows === 0) {
      throw { status: 404, message: 'PRODUCTO CON ID ' + pid + ' NO ENCONTRADO' }
    }
  } catch (error) {
    if (error.status === 404) {
      throw error
    }
    else {

      throw { status: 500, message: 'ERROR INTERNO EN LA BASE DE DATOS.' }
    }
  }
}

module.exports = { insertarProducto, modificarProductoPorId, seleccionarProductoPorId, deleteProductoPorId, seleccionarProductos }