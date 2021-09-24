const PartM = require('../model/parts');
const {cloudinary} = require('../cloudinary')

module.exports.index = async (req,res)=>{
    const parts = await PartM.find({});
    res.status(200).send(parts);
    // res.render('parts/index',{parts});
}

module.exports.store = async (req,res)=>{
    const part = new PartM(req.body.part);
    part.images = req.files.map(f=>({url:f.path,filename:f.filename}))  
    part.author = req.user._id;
    await part.save();
    
    res.status(200).send(part);

    // req.flash('success','Successfully made a new part!');
    // res.redirect(`/parts/${part._id}`);
}
// module.exports.show = async (req,res)=>{
//     const part = await part.findById(req.params.id).populate({
//         path: 'reviews',
//         populate:{
//             path:'author'
//         }
//     }).populate('author');
//     if(!part){
//         req.flash('error',"Couldn't find that part!");
//         return res.redirect(`/parts`);
//     }
//     console.log(part);
//     res.render('parts/show',{part});
// }

// module.exports.edit = async (req,res)=>{  
//     const part = await part.findById(req.params.id);
//     if(!part){
//         req.flash('error',"Couldn't find that part!");
//         return res.redirect(`/parts`);
//     }
//     res.render('parts/edit',{part});
// }

module.exports.update = async (req,res)=>{
    const {id} = req.params
    const part = await PartM.findByIdAndUpdate(id, {...req.body.part});
    const img = req.files.map(f=>({url:f.path,filename:f.filename}))
    part.images.push(...img);
    await part.save();
    if (req.body.deleteImages) {
        for(let filename of req.body.deleteImages){
            await cloudinary.uploader.destroy(filename);
        }
        await part.updateOne({$pull:{images:{filename:{$in:req.body.deleteImages}}}});
    }
    
    res.status(200).send(part);
    // req.flash('success','Successfully Updated the part!');
    // res.redirect(`/parts/${part._id}`);
}

module.exports.delete = async (req,res)=>{
    const {id} = req.params    
    const part = await PartM.findByIdAndDelete(id);
    
    res.status(200).send("Success");
    // req.flash('success','Successfully Deleted a part!');
    // res.redirect(`/parts`);
}