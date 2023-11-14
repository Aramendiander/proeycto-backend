import productModel from "../../src/models/productModel.js";

describe("Tests de modelo de producto",() =>{
    let id = null;
    const title = "Potonoeto";
    const description = "Fiumba";
    const picture = "foto";
    const price = 50;
    const id_category = 2;
    test("Crear un producto nuevo",async ()=>{
        const producto = await productModel.create({title,description,picture,price,id_category})
        expect(producto).not.toBeUndefined();
        expect(producto).not.toBeNull();
        expect(producto.title).toEqual(title);
        expect(producto.description).toEqual(description);
        expect(producto.picture).toEqual(picture);
        expect(producto.price).toEqual(price);
        expect(producto.id_category).toEqual(id_category);
        id = producto.id;
    }) 

    test("Conseguir todos los productos",async() =>{
        const producto = await productModel.findAll();
        expect(producto.length).toBeGreaterThan(0);
        expect(producto[0]).toHaveProperty("title")
        expect(producto[0]).toHaveProperty("description")
        expect(producto[0]).toHaveProperty("picture")
        expect(producto[0]).toHaveProperty("price")
        expect(producto[0]).toHaveProperty("id_category")
    })

    test("Conseguir un producto por ID", async () => {
        const producto = await productModel.findOne({
            where: {
                id: id
            }
        })
        expect(producto).not.toBeUndefined();
        expect(producto).not.toBeNull();
        expect(producto.title).toEqual(title);
        expect(producto.description).toEqual(description);
        expect(producto.picture).toEqual(picture);
        expect(producto.price).toEqual(price);
        expect(producto.id_category).toEqual(id_category);

    })

    test("Editar un producto por ID", async () => {
        const product = await productModel.findOne({
            where: {
                id: id
            }
        })
        product.title="Panchineta"
        product.description="esto está editado"
        product.picture="imagen"
        product.price=12
        product.id_category=1
        await product.save();
        const newProduct = await productModel.findOne({
            where: {
                id: id
            }
        })
        expect(newProduct).not.toBeUndefined();
        expect(newProduct).not.toBeNull();
        expect(newProduct.title).toEqual("Panchineta");
        expect(newProduct.description).toEqual("esto está editado");
        expect(newProduct.picture).toEqual("imagen");
        expect(newProduct.price).toEqual(12);
        expect(newProduct.id_category).toEqual(1);

    })
    
    test("Borrar producto por iD", async() => {
        await productModel.destroy({
            where: {
                id: id
            }
        });
        const oldProduct = await productModel.findOne({
            where: {
                id: id
            }
        });
        expect(oldProduct).toBeNull()
    }) 
})