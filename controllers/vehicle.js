const VehicleM = require('../model/vehicle');
const {cloudinary} = require('../cloudinary')

module.exports.index = async (req,res)=>{
    const vehicles = await VehicleM.find({});
    // res.json(vehicles);
    res.status(200).send(vehicles);
    // res.render('vehicles/index',{vehicles});
}

module.exports.store = async (req,res)=>{
    const vehicle = new VehicleM(req.body.vehicle);
    vehicle.vImages = req.files.map(f=>({url:f.path,filename:f.filename}))  
    vehicle.vSeller = req.user._id;
    await vehicle.save();
    
    res.status(200).send(vehicle);
    // req.flash('success','Successfully made a new vehicle!');
    // res.redirect(`/vehicles/${vehicle._id}`);
}
// module.exports.show = async (req,res)=>{
//     const vehicle = await vehicle.findById(req.params.id).populate({
//         path: 'reviews',
//         populate:{
//             path:'author'
//         }
//     }).populate('author');
//     if(!vehicle){
//         req.flash('error',"Couldn't find that vehicle!");
//         return res.redirect(`/vehicles`);
//     }
//     console.log(vehicle);
//     res.render('vehicles/show',{vehicle});
// }

// module.exports.edit = async (req,res)=>{  
//     const vehicle = await vehicle.findById(req.params.id);
//     if(!vehicle){
//         req.flash('error',"Couldn't find that vehicle!");
//         return res.redirect(`/vehicles`);
//     }
//     res.render('vehicles/edit',{vehicle});
// }

module.exports.update = async (req,res)=>{
    const {id} = req.params
    const vehicle = await VehicleM.findByIdAndUpdate(id, {...req.body.vehicle});
    const img = req.files.map(f=>({url:f.path,filename:f.filename}))
    vehicle.images.push(...img);
    await vehicle.save();
    if (req.body.deleteImages) {
        for(let filename of req.body.deleteImages){
            await cloudinary.uploader.destroy(filename);
        }
        await vehicle.updateOne({$pull:{images:{filename:{$in:req.body.deleteImages}}}});
    }

    res.status(200).send(vehicle);
    // req.flash('success','Successfully Updated the vehicle!');
    // res.redirect(`/vehicles/${vehicle._id}`);
}

module.exports.delete = async (req,res)=>{
    const {id} = req.params    
    const vehicle = await VehicleM.findByIdAndDelete(id);

    res.status(200).send("Success");
    // req.flash('success','Successfully Deleted a vehicle!');
    // res.redirect(`/vehicles`);
}