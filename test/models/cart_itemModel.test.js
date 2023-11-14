import cart_itemModel from "../../src/models/cart_itemModel.js";

describe("Tests de modelo de producto",() =>{
    let id = null;
    const quantity = 2;
    const id_cart = 2;
    const id_product = 3;
    test("Crear un producto nuevo",async ()=>{
        const item = await cart_itemModel.create({quantity,id_cart,id_product});
        expect(item).not.toBeUndefined();
        expect(item).not.toBeNull();
        expect(item.quantity).toEqual(quantity);
        expect(item.id_cart).toEqual(id_cart);
        expect(item.id_product).toEqual(id_product);
        id = item.id;
    }) 

    test("Conseguir todos los productos",async() =>{
        const item = await cart_itemModel.findAll();
        expect(item.length).toBeGreaterThan(0);
        expect(item[0]).toHaveProperty("quantity")
        expect(item[0]).toHaveProperty("id_cart")
        expect(item[0]).toHaveProperty("id_product")
    })

    test("Conseguir un producto por ID", async () => {
        const item = await cart_itemModel.findOne({
            where: {
                id: id
            }
        })
        expect(item).not.toBeUndefined();
        expect(item).not.toBeNull();
        expect(item.quantity).toEqual(quantity);
        expect(item.id_cart).toEqual(id_cart);
        expect(item.id_product).toEqual(id_product);
    })

    test("Editar un producto por ID", async () => {
        const item = await cart_itemModel.findOne({
            where: {
                id: id
            }
        })
        item.quantity=10
        item.id_cart=3
        item.id_product=1
        await item.save();
        const newItem = await cart_itemModel.findOne({
            where: {
                id: id
            }
        })
        expect(newItem).not.toBeUndefined();
        expect(newItem).not.toBeNull();
        expect(newItem.quantity).toEqual(10);
        expect(newItem.id_cart).toEqual(3);
        expect(newItem.id_product).toEqual(1);

    })
    
    test("Borrar producto por iD", async() => {
        await cart_itemModel.destroy({
            where: {
                id: id
            }
        });
        const oldItem = await cart_itemModel.findOne({
            where: {
                id: id
            }
        });
        expect(oldItem).toBeNull()
    }) 
})