const User = require("../models/Auth.model")

const buscarUsuarioPorEmail = async (email) => {
  try {
    const usuario = await User.findOne({ email: email })
    if (!usuario) {
      return null
    }
    return usuario
  }
  catch (error) {
    console.error("MONGODB_ERROR al seleccionar usuarios por email", error)
    throw { status: 500, message: "INTERNAL SERVER ERROR" }
  }
}

const insertarUsuario = async (usuario) => {
  try {
    const nuevoUsuario = new User(usuario)
    await nuevoUsuario.save()
    return true
  }
  catch (error) {
    throw { status: 500, message: "INTERNAL SERVER ERROR" }
  }
}


module.exports = { buscarUsuarioPorEmail, insertarUsuario }