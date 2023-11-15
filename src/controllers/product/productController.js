import productController from "../../models/productModel.js";
import {Op} from "sequelize";

const getAll = async(q=null) => {
    const options = {};

    try{
        const parking = await parkingModel.findAll(options);
        return [null, parking];
    }catch(e){
        return [e.message,null];
    }
}

const getLastProducts = async() => {
    try{
        const products = await productController.findAll({
            limit: 20,
            order: [
                ['id', 'DESC']
            ]
        });
        return [null, products];
    }catch(e){
        return [e.message,null];
    }
}

const getById = async (id) => {
    try {
        const parkings = await parkingModel.findByPk(id);
        return [null, parkings];
    }
    catch (e) {
        return [e.message, null];
    }
}
const create = async (fecha_inicio,fecha_fin,id_coche,id_zona,activo) => {
    if (fecha_inicio === undefined || fecha_fin === undefined || id_coche === undefined || id_zona === undefined || activo === undefined) {
        const error = "fecha_inicio, fecha_fin, id_zona, id_coche y activo deben ser definidos";
        return [error, null];
    }
    try{
        const parkings = await parkingModel.create({fecha_inicio,fecha_fin,id_coche,id_zona,activo});
        return [null,parkings];
    }
    catch(e){
        return [e.message, null];
    }
}

const update = async(id_parking,fecha_inicio,fecha_fin,id_coche,id_zona,activo) => {
    
    if(id_parking == undefined){
        const error = "Tienes que especificar un ID válido";
        return [error,null];
    }
    if (fecha_inicio === undefined || fecha_fin === undefined || id_coche === undefined || id_zona === undefined || activo === undefined) {
        const error = "fecha_inicio, fecha_fin, id_zona, id_coche y activo deben ser definidos";
        return [error, null];
    }
    try {
        console.log("id",id);
        const parkings = await parkingModel.findByPk(id);
        parkings.fecha_inicio = fecha_inicio;
        parkings.fecha_fin = fecha_fin;
        parkings.id_coche = id_coche;
        parkings.id_zona = id_zona;
        parkings.activo = activo;
        return [null,parkings];
    }
    catch (e) {
        console.log(e)
        return [e.message,null];
    }
};

const remove = async (id) => {
    try {
        const parkings = await parkingModel.findByPk(id);
        if(!parkings){
            const error = "No se ha encontrado ningún elemento con ese ID";
            return[error,null];
        }
        return [null,parkings];
    }
    catch (e) {
        return [e.message,null];
    }
}


function fecha(fecha) {
    // Transforma la fecha actual a formato Datetime de MYSQL
    fecha.setMinutes(0);
    fecha.setSeconds(0);
    return fecha.toISOString().slice(0, 19).replace('T', ' ');
}




function sumarHoras(tiempo) {
    let now = new Date();
    now.setHours(now.getHours() + parseInt(tiempo))
    return fecha(new Date(now))
  }




const aparcar = async(id_coche,id_zona,tiempo) => {
    const hoy = new Date();
    const fecha_inicio = fecha(hoy);
    const fecha_fin= sumarHoras(tiempo)
    try {
        const aparcado = await parkingModel.create({fecha_inicio,fecha_fin,id_zona,id_coche})
        return [null,aparcado]
    }
    catch(e){
        console.log(e)
        return [e.message, null]
    }
}


const desaparcar = async (id_coche) => {
    const hoy = new Date();
    const fecha_fin = fecha(hoy)
    const activo = 0
    
    try {
        // Sacar el id con un select id from where matricula y activo = true
        let aparcado = await parkingModel.findOne({
            where: {
                id_coche: id_coche,
                activo: 1
            }});
        await aparcado.update({fecha_fin,activo})
        return [null,aparcado]
    }
    catch(e){
        console.log(e)
    }
}



export {
    getAll,
    getById,
    create,
    update,
    remove,
    aparcar,
    desaparcar,
    fecha,
    getLastProducts
};



export default {
    getAll,
    getById,
    create,
    update,
    remove,
    aparcar,
    desaparcar,
    fecha,
    getLastProducts,
};
