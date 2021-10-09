const VehicleM = require("../model/vehicle");
const { cloudinary } = require("../cloudinary");

module.exports.index = async (req, res) => {
  const {
    min_price = 0,
    max_price,
    type,
    condition,
    fuel,
    transmission,
    search,
    sort = "new",
  } = req.query;

  let query = {};
  let orderby = { createdAt: -1 };
  query.vPrice = { $gte: min_price };
  if (type) {
    query.vType = type;
  }
  if (condition) {
    query.vCondition = condition;
  }
  if (fuel) {
    query.vFuelType = fuel;
  }
  if (transmission) {
    query.vTransType = transmission;
  }
  if (max_price) {
    query.vPrice = { $gte: min_price, $lte: max_price };
  }
  if (search) {
    query.vModel = { $regex: new RegExp(search, "i") };
  }
  if (sort == "last") {
    orderby = { createdAt: 1 };
  }
  if (sort == "low_price") {
    orderby = { vPrice: 1 };
  }
  if (sort == "high_price") {
    orderby = { vPrice: -1 };
  }
  const vehicles = await VehicleM.find(query).sort(orderby).exec();
  res.status(200).send(vehicles);
  return
};

module.exports.userVehicles = async (req, res) => {
  const vehicles = await VehicleM.find({
    vSeller: req.params.sellerId,
  });
  res.status(200).send(vehicles);
  return
};

module.exports.store = async (req, res) => {
  const vehicle = new VehicleM(req.body);
  vehicle.vImages = req.body.images.split(",");
  vehicle.vSeller = req.user.user_id;
  await vehicle.save();

  res.status(201).send(vehicle);
  return
};
module.exports.show = async (req, res) => {
  const vehicle = await VehicleM.findById(req.params.id);
  if (!vehicle) {
    res.status(400).send({ error: "Couldn't find that vehicle!" });
    return
  }
  res.status(200).send(vehicle);
  return
};

module.exports.update = async (req, res) => {
  const { id } = req.params;
  const vehicle = await VehicleM.findByIdAndUpdate(id, { ...req.body });
  const img = req.body.images.split(",");
  vehicle.vImages = img;
  await vehicle.save();

  res.status(200).send(vehicle);
  return
};

module.exports.delete = async (req, res) => {
  const { id } = req.params;
  const vehicle = await VehicleM.findByIdAndDelete(id);

  res.status(200).send("Success");
  return
};
