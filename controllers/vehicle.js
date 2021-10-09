const VehicleM = require("../model/vehicle");
const { cloudinary } = require("../cloudinary");

module.exports.index = async (req, res) => {
  const vehicles = await VehicleM.find({});
  // res.json(vehicles);
  res.status(200).send(vehicles);
  // res.render('vehicles/index',{vehicles});
};

module.exports.userVehicles = async (req, res) => {
  const vehicles = await VehicleM.find({
    vSeller: req.params.sellerId,
  });
  console.log("UserID");
  console.log(req.params.sellerId);
  console.log("UserID");
  console.log(vehicles);
  res.status(200).send(vehicles);
  // res.render('parts/index',{parts});
};

module.exports.store = async (req, res) => {
  const vehicle = new VehicleM(req.body);
  vehicle.vImages = req.body.images.split(",");
  vehicle.vSeller = req.user.user_id;
  await vehicle.save();

  res.status(201).send(vehicle);
};
module.exports.show = async (req, res) => {
  const vehicle = await VehicleM.findById(req.params.id);
  if (!vehicle) {
    res.status(400).send({ error: "Couldn't find that vehicle!" });
  }
  res.status(200).send(vehicle);
};

// module.exports.edit = async (req,res)=>{
//     const vehicle = await vehicle.findById(req.params.id);
//     if(!vehicle){
//         req.flash('error',"Couldn't find that vehicle!");
//         return res.redirect(`/vehicles`);
//     }
//     res.render('vehicles/edit',{vehicle});
// }

module.exports.update = async (req, res) => {
  const { id } = req.params;
  const vehicle = await VehicleM.findByIdAndUpdate(id, { ...req.body });
  const img = req.body.images.split(",");
  vehicle.vImages = img;
  await vehicle.save();

  res.status(200).send(vehicle);
  // req.flash('success','Successfully Updated the vehicle!');
  // res.redirect(`/vehicles/${vehicle._id}`);
};

module.exports.delete = async (req, res) => {
  const { id } = req.params;
  const vehicle = await VehicleM.findByIdAndDelete(id);

  res.status(200).send("Success");
  // req.flash('success','Successfully Deleted a vehicle!');
  // res.redirect(`/vehicles`);
};
