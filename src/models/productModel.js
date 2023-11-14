import { DataTypes } from "sequelize";

import sequelize from "../config/sequelize.js";
import categoryModel from "../models/categoryModel.js"
import cart_itemModel from "../models/cart_itemModel.js"

const productModel = sequelize.define("product",
{
    id:{
        type: DataTypes.SMALLINT,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true,
    },
    title : {
        type: DataTypes.TEXT,
    },
    description: {
        type: DataTypes.TEXT,
    },
    picture: {
        type: DataTypes.TEXT,
    },
    price: {
        type: DataTypes.DOUBLE,
    },
    id_category: {
        type: DataTypes.SMALLINT,
        references: {
            model: 'category', 
            key: 'id',
          }
    },
})


productModel.belongsTo(categoryModel, { foreignKey: 'id_category', targetKey: 'id' });
categoryModel.hasMany(productModel, { foreignKey: 'id_category', as: 'products' });

productModel.hasMany(cart_itemModel, { foreignKey: 'id_product', as: 'cart_items', onDelete: 'CASCADE' });
cart_itemModel.belongsTo(productModel, { foreignKey: 'id_product', targetKey: 'id', onDelete: 'CASCADE' });



export default productModel;