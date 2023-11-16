import cartModel from "../../models/cartModel.js";
import cart_itemModel from "../../models/cart_itemModel.js";
import productModel from "../../models/productModel.js";
import { Op } from "sequelize";


const getCart = async (id_user) => {
    try {
        const items = await cartModel.findOne({
            where: {
                id_user: id_user,
                active: true
            },
            include: [
                {
                    model: cart_itemModel,
                    as: "cart_items",
                    attributes: ["id", "quantity", "id_cart", "id_product"],
                    include: [
                        {
                            model: productModel,
                            as: "product",
                            attributes: ["id", "title", "description", "picture", "price", "id_category"]
                        }
                    ]
                }
            ]
        })
        return [null, items];
    }
    catch (e) {
        console.log(e)
        return [e.message, null];
    }
}


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

const createNewCart = async (id_user) => {
    try {
        const newCart = await cartModel.create({
            id_user: id_user,
            active: true
        })
        return newCart;
    }
    catch (e) {
        console.log(e)
    }
}


const purchase = async (id_user) => {
    try {
        const activeCart = await cartModel.findOne({
            where: {
                id_user: id_user,
                active: true
            },
            include: [
                {
                    model: cart_itemModel,
                    as: "cart_items",
                    attributes: ["id", "quantity", "id_cart", "id_product"],
                    include: [
                        {
                            model: productModel,
                            as: "product",
                            attributes: ["id", "title", "description", "picture", "price", "id_category"]
                        }
                    ]
                }
            ]
        })
        if (activeCart) {
            activeCart.active = false;
            activeCart.buy_date = moment().format('YYYY-MM-DD')
            await activeCart.save()
            await createNewCart(id_user) // TODO: Check this
            return activeCart;
        }
        else {
            return createNewCart(id_user)
        }
    }
    catch (e) {
        console.log(e)
        return [e,null];
    }
}


export default {
    addToCart,
    getCart,
}