import { DataTypes } from "sequelize";

import sequelize from "../config/sequelize.js";

const categoryModel = sequelize.define("category",
{
    id:{
        type: DataTypes.SMALLINT,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true,
    },
    name : {
        type: DataTypes.TEXT,
    },
})



export default categoryModel;