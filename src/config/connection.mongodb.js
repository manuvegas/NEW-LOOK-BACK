const conectionMongoose = require("mongoose")

const URI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.rttnoyy.mongodb.net/${process.env.DB_NAME}`

conectionMongoose.connect(URI).then(
  () => console.log("CONECTADO A LA BD MONGO")
)
  .catch(
    (err) => console.log("error al conectar mongo db:", err)
  )

module.exports = { conectionMongoose }