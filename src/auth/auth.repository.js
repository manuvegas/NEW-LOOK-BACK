const User = require("../models/Auth.model")
const ResetCode = require("../models/resetCode.model")

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

const guardarCodigoReset = async (email, code) => {
  try {
    const resetCode = new ResetCode({ email, code });
    await resetCode.save();
  } catch (error) {
    console.error("MONGODB_ERROR al guardar código de reset", error);
    throw { status: 500, message: "INTERNAL SERVER ERROR" };
  }
};

const buscarCodigoReset = async (email, code) => {
  try {
    const codigoReset = await ResetCode.findOne({ email, code });
    if (!codigoReset) {
      return null;
    }
    return codigoReset;
  } catch (error) {
    console.error("MONGODB_ERROR al buscar código de reset", error);
    throw { status: 500, message: "INTERNAL SERVER ERROR" };
  }
};

const actualizarPassword = async (email, passwordHash) => {
  try {
    await User.updateOne({ email }, { password: passwordHash });
  } catch (error) {
    console.error("MONGODB_ERROR al actualizar password", error);
    throw { status: 500, message: "INTERNAL SERVER ERROR" };
  }
};
module.exports = { buscarUsuarioPorEmail, insertarUsuario,guardarCodigoReset, buscarCodigoReset, actualizarPassword }