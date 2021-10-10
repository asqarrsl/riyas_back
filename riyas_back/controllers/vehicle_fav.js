const VehicleFav = require("../model/vehicle_fav");

module.exports.index = async (req, res) => {
  // if(!req.body.campground) throw new ExpressError('Invalid Campground Data',400);
  const user = req.user.user_id;
  const vehicle = await VehicleFav.find({
    user: user,
  }).populate("vehicle");
  res.status(200).send(vehicle);
  return;
};
module.exports.checkfavvehicle = async (req, res) => {
  // if(!req.body.campground) throw new ExpressError('Invalid Campground Data',400);
  const user = req.user.user_id;
  const vehicle = await VehicleFav.find({
    vehicle: req.params.vehicle,
    user: user,
  });
  if (vehicle) {
    res.status(200).send(vehicle);
    return;
  }
  res.status(400).send("No Data Found");
  return;
};
module.exports.store = async (req, res) => {
  // if(!req.body.campground) throw new ExpressError('Invalid Campground Data',400);
  const user = req.user.user_id;
  const vehicle = await VehicleFav.find({
    vehicle: req.body.vehicle,
    user: user,
  });
  if (!vehicle.length) {
    const vehiclefav = new VehicleFav(req.body);
    vehiclefav.user = req.user.user_id;
    await vehiclefav.save();
    res.status(200).send(vehiclefav);
    return;
  }
  res.status(400).send("Already Exists");

  return;
};

module.exports.delete = async (req, res) => {
  const { id } = req.params;
  const user = req.user.user_id;
  const vehicle = await VehicleFav.findOneAndDelete({
    vehicle: id,
    user: user,
  });

  res.status(200).send("Success");
  return;
};
