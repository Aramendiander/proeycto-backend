import parkingModel from "../models/parkingModel.js";

const noHayParking = async (req,res,next) => {
    const parking = await parkingModel.findOne({
        where:{
            id_coche:req.session.id_coche,
            activo: 1
        }
    });
    if(parking != null) {
        next();
    } else {
    res.redirect("/parking/errordesaparcar");
    }
}


const yaHayParking = async (req,res,next) => {
    const parking = await parkingModel.findOne({
        where:{
            id_coche:req.session.id_coche,
            activo: 1
        }
    });
    if(parking && parking.activo) {
        res.redirect("/parking/erroraparcar");
    } else {
    
    next();
    }
}


export {
    noHayParking,
    yaHayParking
}