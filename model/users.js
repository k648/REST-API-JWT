const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const userSchema = new mongoose.Schema({
  first_name: { type: String, default: null },
  last_name: { type: String, default: null },
  email: { type: String, unique: true },
  password: { type: String },
  token: { type: String },
  isAdmin: Boolean
});
userSchema.methods.generateAuthToken = function(){
  const token = jwt.sign(
    { _id: this._id, isAdmin:this.isAdmin },
    process.env.TOKEN_KEY,
    {
      expiresIn: "2h",
    }
  )
  return token;
}
module.exports = mongoose.model("user", userSchema);