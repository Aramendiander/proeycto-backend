import cartController from "./cartController.js";

const addToCart = async (req, res) => {
    const id_user = req.session.user_id
    const id_product = req.body.product_id;
    const quantity = parseInt(req.body.quantity);
    const cart = await cartController.addToCart(id_user,id_product,quantity);
    res.redirect("/")
}

export default {
    addToCart,
}