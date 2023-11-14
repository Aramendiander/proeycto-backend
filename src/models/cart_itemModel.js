import { DataTypes } from "sequelize";

import sequelize from "../config/sequelize.js";

const cart_itemModel = sequelize.define("cart_item",
{
    id:{
        type: DataTypes.SMALLINT,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true,
    },
    quantity : {
        type: DataTypes.SMALLINT,
    },
    id_cart: {
        type: DataTypes.SMALLINT,
        references: {
            model: 'cart', 
            key: 'id',
          }
    },
    id_product: {
        type: DataTypes.SMALLINT,
        references: {
            model: 'product', 
            key: 'id',
          }
    },
})



export default cart_itemModel;