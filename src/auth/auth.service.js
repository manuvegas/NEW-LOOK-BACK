const { buscarUsuarioPorEmail, insertarUsuario } = require("./auth.repository")
const bcrtypt = require("bcrypt")
const { validacionUsuario } = require("./utils/validationUser.util")
const jwt = require ("jsonwebtoken")

const register = async (usuario) => {
  try {
    const { email, password } = usuario
    validacionUsuario({ email, password })
    const usuarioExistente = await buscarUsuarioPorEmail(usuario.email)
    if (usuarioExistente) {
      throw { status: 400, message: "Email ya registrado" }
    }
    const passwordHash = await bcrtypt.hash(usuario.password, 10)
    const resultado = await insertarUsuario({ email: usuario.email, password: passwordHash })
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
      throw {status:400 ,message:"No existe usuario con ese email"}
    }
    const passwordValido = await bcrtypt.compare(password, usuarioExistente.password)
    if(!passwordValido){
      throw {status:400 ,message:"Contraseña incorrecta"}
    }
    else{
      const token = jwt.sign({email,user_id: usuarioExistente.id_usuarios},process.env.JWT_SECRET_KEY)
      return token
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



module.exports = { register, login }