const express = require("express")
const { loginController, verifyTokenController, registerController, requestPasswordResetController, verifyResetCodeController, resetPasswordController } = require("./auth.controller")
const { verifyToken, verifyRole } = require('./auth.middleware');
const authRouter = express.Router()

/* /api/auth/login */
authRouter.post("/login", loginController)
/* /api/auth/register */
authRouter.post("/register", registerController)
/* /api/auth/veriy-token */
authRouter.get("/verify-token", verifyTokenController)
/* /api/auth/request-password-reset */
authRouter.post("/request-password-reset", requestPasswordResetController);
/* /api/auth/verify-reset-code */
authRouter.post("/verify-reset-code", verifyResetCodeController);
/* /api/auth/reset-password */
authRouter.post("/reset-password", resetPasswordController);


// Ruta protegida solo para administradores
authRouter.get('/admin', verifyToken, verifyRole('admin'), (req, res) => {
  res.status(200).json({ message: "Bienvenido, administrador." });
});

// Ruta protegida solo para usuarios
authRouter.get('/user', verifyToken, verifyRole('user'), (req, res) => {
  res.status(200).json({ message: "Bienvenido, usuario." });
});

module.exports = { authRouter }




