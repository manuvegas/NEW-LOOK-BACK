const { validacionExistencia } = require("../helpers/validation.helper")
const { register, login } = require("./auth.service")
const jwt = require("jsonwebtoken")

const loginController = async (req, res) => {
  const { email, password } = req.body
  try {
    const { token, role } = await login({ email, password })
    res.status(200).json({ ok: true, message: "Usuario logueado", token: token, role })
  }
  catch (error) {
    res.status(error.status).json(error)
  }
}

const registerController = async (req, res) => {
  const { email, password } = req.body
  try {
    const resultado = await register({ email: email, password: password, role: "user" })
    res.status(200).json(resultado)
  }
  catch (error) {
    res.status(error.status).json(error)
  }
}

const verifyTokenController = (req, res) => {
  const token = req.headers['authorization']
  if (!validacionExistencia(token) || !isNaN(token) || token == "null") {
    res.status(401).json({ status: 400, message: "Token no valido" })
  }
  const tokenValido = jwt.verify(token, process.env.JWT_SECRET_KEY)
  if (!tokenValido) {
    res.status(401).json({ status: 401, message: "sin autorizacion token invalido" })
  }
  else {
    res.status(200).json({ status: 200, message: "Token valido,usuario logueado" })
  }

}

module.exports = { loginController, registerController, verifyTokenController }