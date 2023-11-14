import { DataTypes } from "sequelize";

import sequelize from "../config/sequelize.js";

const cartModel = sequelize.define("cart",
{
    id:{
        type: DataTypes.SMALLINT,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true,
    },
    buy_date : {
        type: DataTypes.DATE,
    },
    active: {
        type: DataTypes.BOOLEAN,
    },
    id_user: {
        type: DataTypes.SMALLINT,
        references: {
            model: 'user', 
            key: 'id',
          }
    },
})



export default cartModel;