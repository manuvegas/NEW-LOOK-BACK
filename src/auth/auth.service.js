const { buscarUsuarioPorEmail, insertarUsuario, guardarCodigoReset, actualizarPassword, buscarCodigoReset } = require("./auth.repository")
const bcrtypt = require("bcrypt")
const { validacionUsuario } = require("./utils/validationUser.util")
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { sendResetEmail } = require("./utils/sendResetEmail.util");

const requestPasswordReset = async (email) => {
  const usuario = await buscarUsuarioPorEmail(email);
  if (!usuario) {
    throw { status: 400, message: "No existe usuario con ese email" };
  }
  const resetCode = crypto.randomBytes(4).toString("hex");
  await guardarCodigoReset(email, resetCode);
  await sendResetEmail(email, resetCode);
  return { message: "Código de restablecimiento enviado" };
};

const verifyResetCode = async (email, code) => {
  const codigoReset = await buscarCodigoReset(email, code);
  if (!codigoReset) {
    throw { status: 400, message: "Código de verificación inválido" };
  }
  return { message: "Código de verificación válido" };
};

const resetPassword = async (email, newPassword) => {
  const passwordHash = await bcrtypt.hash(newPassword, 10);
  await actualizarPassword(email, passwordHash);
  return { message: "Contraseña actualizada correctamente" };
};


const register = async (usuario) => {
  try {
    const { email, password, role } = usuario
    validacionUsuario({ email, password })
    const usuarioExistente = await buscarUsuarioPorEmail(usuario.email)
    if (usuarioExistente) {
      throw { status: 400, message: "Email ya registrado" }
    }
    const passwordHash = await bcrtypt.hash(usuario.password, 10)
    const resultado = await insertarUsuario({ email: usuario.email, password: passwordHash, role })
    if (resultado) {
      return { ok: true, message: "Se inserto el usuario" }
    }
  }
  catch (error) {
    if (error.status) {
      throw error
    }
    else {
      throw { status: 500, message: "INTERNAL SERVER ERROR" }
    }
  }
}

const login = async (usuario) => {
  try {
    const { email, password } = usuario
    validacionUsuario(usuario)
    const usuarioExistente = await buscarUsuarioPorEmail(usuario.email)
    if (!usuarioExistente) {
      throw { status: 400, message: "No existe usuario con ese email" }
    }
    const passwordValido = await bcrtypt.compare(password, usuarioExistente.password)
    if (!passwordValido) {
      throw { status: 400, message: "Contraseña incorrecta" }
    }
    else {
      const token = jwt.sign({ email, user_id: usuarioExistente.id_usuarios, role: usuarioExistente.role }, process.env.JWT_SECRET_KEY)
      return { token, role: usuarioExistente.role }
    }
  }
  catch (error) {
    if (error.status) {
      throw error
    }
    else {
      throw { status: 500, message: "INTERNAL SERVER ERROR" }
    }
  }
}

module.exports = { register, login, requestPasswordReset, verifyResetCode, resetPassword }