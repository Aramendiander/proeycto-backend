import productController from "./productController.js";

/* const getAll = async (req, res) => {
    const errorMessage = req.query.error;
    const q = req.query.q;
    const [error, coches] = await productController.getAll(q);
    res.render("coches/list", { error, coches });
} */

const getByTitle = async (req, res) => {
    try {
        const title = req.params.title;
        const [error, product] = await productController.getByTitle(title);
        res.render("product/product", { error, product });
    }
    catch(e){
        console.log(e)
    }
}

const getByCategory = async (req, res, ) => {
    try {
        const category = req.params.category;
        const [error, products] = await productController.getByCategory(category);
        res.render("categories/products.pug", { error, products, category });
    }
    catch(e){
        console.log(e)
    }
}

const getByCategoryApi = async (req, res, ) => {
    try {
        const category = req.params.category;
        const [error, products] = await productController.getByCategory(category);
        res.json(products)
    }
    catch(e){
        console.log(e)
    }
}



export default {
    getByTitle,
    getByCategory,
    getByCategoryApi,
};