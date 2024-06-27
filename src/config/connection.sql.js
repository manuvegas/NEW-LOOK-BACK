const mysql = require("mysql")
//util me permite hacer promesas a lo que no trabaja con promesas
const util =require("util")

const DB_NAME = process.env.DB_NAME
const DB_HOST = process.env.DB_HOST || "localhost"
const DB_PASSWORD = process.env.DB_PASSWORD || ""
const DB_USERNAME = process.env.DB_USERNAME || "root"

const userSettings = {
  host: DB_HOST,
  user: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_NAME
}

const db = mysql.createConnection(userSettings)

const query = util.promisify(db.query).bind(db)

db.connect((error) => {
  if (error) {
    console.log("error de coneccion", error)
  }
  else {
    console.log("conectado a la base de datos")
  }
})

module.exports = { db,query }