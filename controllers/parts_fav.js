const PartFav = require('../model/parts_fav');

module.exports.store = async (req,res)=>{

    // if(!req.body.campground) throw new ExpressError('Invalid Campground Data',400);

    const part_fav = new PartFav(req.body.part_fav);
    part_fav.author = req.user._id;
    await part_fav.save();
    
    res.status(200).send(part_fav);
}

module.exports.delete = async (req,res)=>{
    const {id} = req.params    
    const vehicle = await VehicleM.findByIdAndDelete(id);

    res.status(200).send("Success");
}