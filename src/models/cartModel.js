import { DataTypes } from "sequelize";

import sequelize from "../config/sequelize.js";
import userModel from "../models/userModel.js"
import cart_itemModel from "../models/cart_itemModel.js"

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

userModel.hasOne(cartModel, { foreignKey: 'id_user', as: 'cart', onDelete: 'CASCADE' });
cartModel.belongsTo(userModel, { foreignKey: 'id_user', targetKey: 'id', onDelete: 'CASCADE' });


cartModel.hasMany(cart_itemModel, { foreignKey: 'id_cart', as: 'cart_items', onDelete: 'CASCADE' });
cart_itemModel.belongsTo(cartModel, { foreignKey: 'id_cart', targetKey: 'id', onDelete: 'CASCADE' });

export default cartModel;