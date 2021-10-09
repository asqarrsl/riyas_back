const PartM = require("../model/parts");
const { cloudinary } = require("../cloudinary");

module.exports.index = async (req, res) => {
  const {
    min_price = 0,
    max_price,
    type,
    category,
    condition,
    search,
    sort = "new",
  } = req.query;
  
  let query = {};
  let orderby = { createdAt: -1 };
  query.vPrice = { $gte: min_price };
  if (type) {
    query.pType = type;
  }
  if (category) {
    query.pCatagory = category;
  }
  if (condition) {
    query.pCondition = condition;
  }
  if (max_price) {
    query.pPrice = { $gte: min_price, $lte: max_price };
  }
  if (search) {
    query.vModel = { $regex: new RegExp(search, "i") };
  }
  if (sort == "last") {
    orderby = { createdAt: 1 };
  }
  if (sort == "low_price") {
    orderby = { pPrice: 1 };
  }
  if (sort == "high_price") {
    orderby = { pPrice: -1 };
  }
  const parts = await PartM.find(query).sort(orderby).exec();
  res.status(200).send(parts);
  return;

};

module.exports.userParts = async (req, res) => {
  const parts = await PartM.find({ pSeller: req.params.sellerId });
  res.status(200).send(parts);
  return;
};

module.exports.store = async (req, res) => {
  const part = new PartM(req.body);
  part.pImages = req.body.images.split(",");
  part.pSeller = req.user.user_id;
  await part.save();
  res.status(201).send(part);
  return;
};

module.exports.update = async (req, res) => {
  const { id } = req.params;
  const part = await PartM.findByIdAndUpdate(id, { ...req.body });
  part.pImages = req.body.images.split(",");
  await part.save();
  res.status(200).send(part);
  return;
};
module.exports.show = async (req, res) => {
  const parts = await PartM.findById(req.params.id);
  if (!parts) {
    return res.status(400).send({ error: "Couldn't find that parts!" });
  }
  res.status(200).send(parts);
  return;
};
module.exports.delete = async (req, res) => {
  const { id } = req.params;
  const part = await PartM.findByIdAndDelete(id);
  res.status(200).send("Success");
  return;
};
