const PartM = require("../model/parts");
const { cloudinary } = require("../cloudinary");

module.exports.index = async (req, res) => {
  const parts = await PartM.find({});
  res.status(200).send(parts);
  // res.render('parts/index',{parts});
};

module.exports.userParts = async (req, res) => {
  const parts = await PartM.find({ pSeller: req.params.sellerId });
  // console.log("UserID");
  // console.log(req.params.sellerId);
  // console.log("UserID");
  // console.log(parts);
  res.status(200).send(parts);
  // res.render('parts/index',{parts});
};

module.exports.store = async (req, res) => {
  const part = new PartM(req.body);
  part.pImages = req.body.images.split(",");
  part.pSeller = req.user.user_id;
  await part.save();
  res.status(201).send(part);
};

module.exports.update = async (req, res) => {
  const { id } = req.params;
  const part = await PartM.findByIdAndUpdate(id, { ...req.body });
  part.pImages = req.body.images.split(",");
  // const img = req.files.map((f) => ({ url: f.path, filename: f.filename }));
  // part.images.push(...img);
  await part.save();
  // if (req.body.deleteImages) {
  // for (let filename of req.body.deleteImages) {
  //   await cloudinary.uploader.destroy(filename);
  // }
  //   const deletedimg = req.body.deleteImages.split(",");
  //   await part.updateOne({
  //     $pull: { pImages: { filename: { $in: deletedimg } } },
  //   });
  // }

  res.status(200).send(part);
  // req.flash('success','Successfully Updated the part!');
  // res.redirect(`/parts/${part._id}`);
};
module.exports.show = async (req, res) => {
  const parts = await PartM.findById(req.params.id);
  if (!parts) {
    res.status(400).send({ error: "Couldn't find that parts!" });
  }
  res.status(200).send(parts);
};
module.exports.delete = async (req, res) => {
  const { id } = req.params;
  const part = await PartM.findByIdAndDelete(id);

  res.status(200).send("Success");
  // req.flash('success','Successfully Deleted a part!');
  // res.redirect(`/parts`);
};
