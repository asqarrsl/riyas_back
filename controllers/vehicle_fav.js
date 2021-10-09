const VehicleFav = require("../model/vehicle_fav");

module.exports.store = async (req, res) => {
  // if(!req.body.campground) throw new ExpressError('Invalid Campground Data',400);

  const vehiclefav = new VehicleFav(req.body);
  vehiclefav.author = req.user.user_id;
  await vehiclefav.save();

  res.status(200).send(vehiclefav);
};

module.exports.delete = async (req, res) => {
  const { id } = req.params;
  const vehicle = await VehicleM.findByIdAndDelete(id);

  res.status(200).send("Success");
};
