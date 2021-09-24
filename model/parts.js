const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const imageSchema = new Schema({
  url: String,
  filename: String,
});

imageSchema.virtual("thumbnail").get(function () {
  return this.url.replace("/upload", "/upload/w_300");
});

const PartsSchema = new Schema({
  pImages: [imageSchema],
  pCatagory: String,
  pCondition: String,
  pName: String,
  pPrice: String,
  pNegotiate: String,
  pInfo: String,
});

module.exports = mongoose.model("part", PartsSchema);
