import cartModel from "../../models/cartModel.js";
import cart_itemModel from "../../models/cart_itemModel.js";
import { Op } from "sequelize";


const activeCartId = async (id_user) => {
    try {
        const activeCart = await cartModel.findOne({
            where: {
                id_user: id_user,
                active: true    
            }
        });
        if (activeCart) {
            return activeCart.id;
        }
        else {
            await cartModel.create({
                id_user: id_user,
                active: true
            })
            return activeCart.id
        }
    }
    catch (e) {
        console.log(e)
    }
}

const addToCart = async (id_user, id_product, quantity) => {
    const id_cart = await activeCartId(id_user);
    if (id_cart) {
        // Check if the product is already in the cart
        const cartItem = await cart_itemModel.findOne({
            where: {
                id_cart: id_cart,
                id_product: id_product
            }
        })
        // If item is already in the cart, update quantity
        if (cartItem) {
            cartItem.quantity += quantity;
            await cartItem.save()
            return cartItem;
        }
        else {
            // If product is not in the cart create a new cart item
            const newItem = await cart_itemModel.create({
                id_cart: id_cart,
                id_product: id_product,
                quantity: quantity
            })
            console.log(newItem)
            return newItem;
        }
    }
}


export default {
    addToCart,
}