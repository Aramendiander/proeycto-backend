import cartController from "./cartController.js";

const addToCart = async (req, res) => {
    const id_user = req.session.user_id
    const id_product = req.body.product_id;
    const quantity = parseInt(req.body.quantity);
    const cart = await cartController.addToCart(id_user,id_product,quantity);
    res.redirect("back")
}

const getCart = async (req, res) => {
    let finalPrice = 0
    const user_id = req.session.user_id
    const [error,items] = await cartController.getCart(user_id);
    let totalPrice = 0;
    for (let item of items.cart_items) {
        totalPrice += item.product.price
        finalPrice = totalPrice.toFixed(2)
    }

    res.render("cart/cart", { error, items, finalPrice, user_id });
}

const purchase = async (req, res) => {
    const user_id = req.session.user_id
    const [error,items] = await cartController.purchase(user_id);
    res.redirect("/thanks");
}

const cartHistory = async (req, res) => {
    const user_id = req.session.user_id
    const [error,cartHistory] = await cartController.cartHistory(user_id);
    res.render("cart/history", { error, cartHistory });
}

const getCartById = async (req, res) => {
    const cart_id = req.params.id
    const [error,carts] = await cartController.getCartById(cart_id);
    carts.forEach(cartItem => {
        console.log(cartItem.cart_items)
    })
    res.render("cart/historycart", { error, carts });
}


const removeItemFromCart = async (req, res) => {
    const cart_itemId = req.body.cart_itemId
    console.log(cart_itemId)
    const id_user = req.session.user_id
    const [error,item] = await cartController.removeItemFromCart(cart_itemId,id_user);
    res.redirect("/cart")
}

export default {
    addToCart,
    getCart,
    purchase,
    cartHistory,
    getCartById,
    removeItemFromCart,
}