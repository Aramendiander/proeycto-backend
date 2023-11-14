import categoryModel from "../../src/models/categoryModel.js";

describe("Tests de modelo de producto",() =>{
    let id = null;
    const name = 'nueva categoría';
    test("Crear un carrito nuevo",async ()=>{
        const category = await categoryModel.create({name});
        expect(category).not.toBeUndefined();
        expect(category).not.toBeNull();
        expect(category.name).toEqual(name);
        id = category.id;
    }) 

    test("Conseguir todos los productos",async() =>{
        const category = await categoryModel.findAll();
        expect(category.length).toBeGreaterThan(0);
        expect(category[0]).toHaveProperty("name")
    })

    test("Conseguir un producto por ID", async () => {
        const category = await categoryModel.findOne({
            where: {
                id: id
            }
        })
        expect(category).not.toBeUndefined();
        expect(category).not.toBeNull();
        expect(category.name).toEqual(name);


    })

    test("Editar un producto por ID", async () => {
        const category = await categoryModel.findOne({
            where: {
                id: id
            }
        })
        category.name='Modified cat'
        await category.save();
        const newCategory = await categoryModel.findOne({
            where: {
                id: id
            }
        })
        expect(newCategory).not.toBeUndefined();
        expect(newCategory).not.toBeNull();
        expect(newCategory.name).toEqual('Modified cat');
    })
    
    test("Borrar producto por iD", async() => {
        await categoryModel.destroy({
            where: {
                id: id
            }
        });
        const oldCategory = await categoryModel.findOne({
            where: {
                id: id
            }
        });
        expect(oldCategory).toBeNull()
    }) 
})