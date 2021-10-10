const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const imageSchema = new Schema({
  url: String,
  filename: String,
});

imageSchema.virtual("thumbnail").get(function () {
  return this.url.replace("/upload", "/upload/w_300");
});

const VehiclSchema = new Schema(
  {
    vImages: [String],
    vType: String,
    vBrand: String,
    vCondition: String,
    vModel: String,
    vManfYear: String,
    vPrice: String,
    vNegotiate: String,
    vTransType: String,
    vFuelType: String,
    vMilage: String,
    vInfo: String,
    vLocation: String,
    vSeller: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("vehicle", VehiclSchema);
