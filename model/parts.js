const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// const imageSchema = new Schema({
//   url: String,
//   filename: String,
// });

// imageSchema.virtual("thumbnail").get(function () {
//   return this.url.replace("/upload", "/upload/w_300");
// });

const PartsSchema = new Schema(
  {
    pImages: [String],
    // pImages: [imageSchema],
    pType: String,
    pCatagory: String,
    pCondition: String,
    pName: String,
    pPrice: String,
    pNegotiate: String,
    pInfo: String,
    pLocation: String,
    pSeller: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("part", PartsSchema);
