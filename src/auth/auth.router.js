const express = require("express")
const { loginController, verifyTokenController, registerController } = require("./auth.controller")
const authRouter = express.Router()

/* /api/auth/login */
authRouter.post("/login", loginController)
/* /api/auth/register */
authRouter.post("/register", registerController)
/* /api/auth/veriy-token */
authRouter.get("/verify-token", verifyTokenController)

module.exports = { authRouter }




