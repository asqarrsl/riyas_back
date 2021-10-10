const PartFav = require("../model/parts_fav");

module.exports.index = async (req, res) => {
  // if(!req.body.campground) throw new ExpressError('Invalid Campground Data',400);
  const user = req.user.user_id;
  const part = await PartFav.find({
    user: user,
  }).populate("part");
  res.status(200).send(part);
};
module.exports.checkfavpart = async (req, res) => {
  // if(!req.body.campground) throw new ExpressError('Invalid Campground Data',400);
  const user = req.user.user_id;
  const part = await PartFav.find({
    part: req.params.part,
    user: user,
  });
  if (part) {
    res.status(200).send(part);
    return;
  }
  res.status(400).send("No Data Found");
  return;
};

module.exports.store = async (req, res) => {
  // if(!req.body.campground) throw new ExpressError('Invalid Campground Data',400);
  const user = req.user.user_id;
  const part = await PartFav.find({
    part: req.body.part,
    user: user,
  });
  if (!part.length) {
    const part_fav = new PartFav(req.body);
    part_fav.user = req.user.user_id;
    await part_fav.save();

    res.status(200).send(part_fav);
    return;
  }
  res.status(400).send("Already Exists");
  return;
};

module.exports.delete = async (req, res) => {
  const { id } = req.params;
  const user = req.user.user_id;
  const part = await PartFav.findOneAndDelete({
    part: id,
    user: user,
  });

  res.status(200).send("Success");
  return;
};
