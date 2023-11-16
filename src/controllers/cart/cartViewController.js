import cartController from "./cartController.js";

const addToCart = async (req, res) => {
    const id_user = req.session.user_id
    const id_product = req.body.product_id;
    const quantity = parseInt(req.body.quantity);
    const cart = await cartController.addToCart(id_user,id_product,quantity);
    res.redirect("/")
}

const getCart = async (req, res) => {
    const user_id = req.session.user_id
    const [error,items] = await cartController.getCart(user_id);
    let totalPrice = 0;
    for (let item of items.cart_items) {
        totalPrice += item.product.price
        console.log(item.product.price)
    }

    res.render("cart/cart", { error, items, totalPrice });
}


export default {
    addToCart,
    getCart,
}