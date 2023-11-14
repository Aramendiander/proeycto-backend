import { DataTypes } from "sequelize";

import sequelize from "../config/sequelize.js";

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



export default productModel;