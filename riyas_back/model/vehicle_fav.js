const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const imageSchema = new Schema({
  url: String,
  filename: String,
});

imageSchema.virtual("thumbnail").get(function () {
  return this.url.replace("/upload", "/upload/w_300");
});

const vehicleFavSchema = new Schema({
  vehicle: {
    type: Schema.Types.ObjectId,
    ref: "vehicle",
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("vehicleFav", vehicleFavSchema);
