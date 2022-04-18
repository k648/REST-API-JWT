const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
  title: { type: String, default: null },
  content : { type: String, default: null }
});

module.exports = mongoose.model("article", articleSchema);