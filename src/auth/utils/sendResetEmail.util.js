const nodemailer = require("nodemailer");

const sendResetEmail = async (email, code) => {
  console.log("EMAIL_USER:", process.env.EMAIL_USER);
  console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? "Cargado correctamente" : "No cargado");
  const transporter = nodemailer.createTransport({
    host: "smtp.office365.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Restablecimiento de contraseña',
    text: `Su código de restablecimiento de contraseña es: ${code}`,
  };
  try {
    await transporter.sendMail(mailOptions);
  }
  catch (error) {
    console.error("EMAIL_ERROR al enviar el correo de restablecimiento", error.message);
    throw { status: 500, message: "INTERNAL SERVER ERROR" };
  }
};

module.exports = { sendResetEmail };