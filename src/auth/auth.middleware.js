const jwt = require("jsonwebtoken")
const { validacionExistencia } = require("../helpers/validation.helper")

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']
  if (!validacionExistencia(token) || !isNaN(token) || token == "null") {
    return res.status(401).json({ status: 400, message: "Token no valido" })
  }
  jwt.verify(token, process.env.JWT_SECRET_KEY, (error, datos) => {
    if (error) {
      return res.status(401).json({ status: 401, message: "sin autorizacion token invalido" })
    }
    else {
      req.user = datos
      next()
    }
  })
}

module.exports = { verifyToken }