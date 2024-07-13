const Product = require("../models/Products.model")

const insertarProducto = async ({ titulo, descripcion, precio, img, cuotas, colores, categoria }) => {
  try {
    const nuevoProducto = new Product({ titulo, descripcion, precio, img, cuotas, colores, categoria });
    await nuevoProducto.save();
    return nuevoProducto._id;
  } catch (error) {
    throw { status: 500, message: "Error interno en el servidor" };
  }
};

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
      throw { status: 500, message: 'Error interno en el servidor', error }
    }
  }
}

const modificarProductoPorId = async (pid, producto) => {
  const { titulo, descripcion, precio, img, cuotas, colores, categoria } = producto;
  try {
    const resultadoModificar = await Product.findByIdAndUpdate(pid, {
      titulo,
      descripcion,
      precio,
      img,
      cuotas,
      colores,
      categoria,
    }, { new: true });

    if (!resultadoModificar) {
      throw { status: 404, message: 'PRODUCTO CON ID ' + pid + ' NO ENCONTRADO' };
    }
    return resultadoModificar;
  } catch (error) {
    if (error.status === 404) {
      throw error;
    } else {
      throw { status: 500, message: 'ERROR INTERNO EN LA BASE DE DATOS.', error };
    }
  }
}

module.exports = { insertarProducto, modificarProductoPorId, seleccionarProductoPorId, deleteProductoPorId, seleccionarProductos }