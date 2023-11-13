import { fecha } from '../controllers/parking/parkingController.js';
import parkingModel from '../models/parkingModel.js';
import multasModel from '../models/multasModel.js';



const checkMultado = async (req,res,next) => {
    const parking = await parkingModel.findOne({
        include: [
            {
                model: multasModel,
                as: "multas",
                attributes: ['id_multa','importe_multa','fecha_multa','activa']
        }
    ],
        where:{
            id_coche:req.session.id_coche,
            activo: 1
        }
    })
    if (!parking) {
        console.log("no hay un parking activo así que next")
        next()
    }
    else if (parking.id_coche == req.session.id_coche && parking.multas && parking.multas.activa == 1) {
        res.redirect("/multas/multado")
    } else {
        console.log("no hay multa")
        next();
    }
}

const multar = async (req,res,next) => {
    const multado = await multado()
    if (multado) {
        console.log("ya está multado")
        next()
    }
    const parking = await parkingModel.findOne({
        where:{
            id_coche:req.session.id_coche,
            activo: 1
        }
    })
    const now = new Date()
    const fecha_fin = new Date(parking.fecha_fin)
    if (now > fecha_fin) {
        console.log("multado")
        const importe_multa = 20
        const fecha_multa = now
        const id_parking = parking.id_parking
        console.log(id_parking)
        const activa = 1
        await multasModel.create({importe_multa, fecha_multa, id_parking, activa})
    } else {
        console.log("no multado");
    }
}



export {
    multar,
    checkMultado,
}