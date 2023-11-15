import productController from "./productController.js";

 const getAll = async (req,res) =>{
    const errorMessage = req.query.error;
    const q = req.query.q;
    const [error, coches] = await productController.getAll(q);
    res.render("coches/list",{error,coches});
}




export default{
    getAll,
};