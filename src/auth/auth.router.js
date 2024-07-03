const express = require("express")
const { loginController, verifyTokenController, registerController } = require("./auth.controller")
const { verifyToken,verifyRole } = require('./auth.middleware');
const authRouter = express.Router()

/* /api/auth/login */
authRouter.post("/login", loginController)
/* /api/auth/register */
authRouter.post("/register", registerController)
/* /api/auth/veriy-token */
authRouter.get("/verify-token", verifyTokenController)

// Ruta protegida solo para administradores
authRouter.get('/admin', verifyToken, verifyRole('admin'), (req, res) => {
  res.status(200).json({ message: "Bienvenido, administrador." });
});

// Ruta protegida solo para usuarios
authRouter.get('/user', verifyToken, verifyRole('user'), (req, res) => {
  res.status(200).json({ message: "Bienvenido, usuario." });
});

module.exports = { authRouter }




