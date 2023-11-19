import productController from "../../models/productModel.js";
import categoryModel from "../../models/categoryModel.js";
import productModel from "../../models/productModel.js"
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

const getByTitle = async(title) => {
    try{
        const producto = await productController.findOne(
            {
                where: {
                    title: {
                        [Op.like]: `%${title}%`
                    }
                }
            }
        );
        return [null, producto];
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


const getByCategory = async (category) => { 
    try {
        const products = await categoryModel.findAll({
            where: {
                name: category
            },
            include: [
                {
                    model: productModel,
                    as: "products",
                    attributes: ["id", "title", "description", "picture", "price", "id_category"]
                }
            ]
        });
        return [null, products];
    }
    catch(e) {
        console.log(e)
        return [e.message, null];
    }
}


export {
    getAll,
    getById,
    getLastProducts,
    getByTitle,
};



export default {
    getAll,
    getById,
    getLastProducts,
    getByTitle,
    getByCategory,
};
