const { conectionMongoose } = require("../config/connection.mongodb")
const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
  email: { type: String, require: true, unique: true },
  password: { type: String, require: true, unique: true },
  role: { type: String, required: true, default: 'user' }
})
const User = conectionMongoose.model("User", userSchema)

module.exports = User 