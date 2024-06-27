const { validacionExistencia, validacionEmail } = require("../../helpers/validation.helper")

const validacionUsuario = (usuario) => {
  if (!validacionExistencia(usuario.email)) {
    throw { menssage: "Inexistent email ", status: 400 }
  }
  if (!validacionExistencia(usuario.password)) {
    throw { menssage: "Inexistent password", status: 400 }
  }
  if (!validacionEmail(usuario.email)) {
    throw { message: 'Email incorrect', status: 400 }
  }
}

module.exports = {validacionUsuario}

