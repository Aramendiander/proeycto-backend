import cartModel from "../../src/models/cartModel.js";

describe("Tests de modelo de producto",() =>{
    let id = 2;
    const buy_date = '2023-01-01';
    const active = false;
    const id_user = 2;
    /* test("Crear un carrito nuevo",async ()=>{
        try {
        const cart = await cartModel.create({buy_date,active,id_user});
        expect(cart).not.toBeUndefined();
        expect(cart).not.toBeNull();
        expect(cart.buy_date).toEqual(buy_date);
        expect(cart.active).toEqual(active);
        expect(cart.id_user).toEqual(id_user);
        id = cart.id;
        } catch (error) {
            console.log(error);
        }
    })  */

    test("Conseguir todos los productos",async() =>{
        const cart = await cartModel.findAll();
        expect(cart.length).toBeGreaterThan(0);
        expect(cart[0]).toHaveProperty("active")
        expect(cart[0]).toHaveProperty("id_user")
    })

    /* test("Conseguir un producto por ID", async () => {
        const cart = await cartModel.findOne({
            where: {
                id: id
            }
        })
        expect(cart).not.toBeUndefined();
        expect(cart).not.toBeNull();
        expect(cart.buy_date).toEqual(buy_date);
        expect(cart.active).toEqual(active);
        expect(cart.id_user).toEqual(id_user);

    }) */

   /*  test("Editar un producto por ID", async () => {
        const cart = await cartModel.findOne({
            where: {
                id: id
            }
        })
        cart.buy_date='1980-01-01'
        cart.active=true
        cart.id_user=35
        await cart.save();
        const newCart = await cartModel.findOne({
            where: {
                id: id
            }
        })
        expect(newCart).not.toBeUndefined();
        expect(newCart).not.toBeNull();
        expect(newCart.buy_date).toEqual('1980-01-01');
        expect(newCart.active).toEqual(true);
        expect(newCart.id_user).toEqual(35);
    }) */
    
    /* test("Borrar producto por iD", async() => {
        await cartModel.destroy({
            where: {
                id: id
            }
        });
        const oldCart = await cartModel.findOne({
            where: {
                id: id
            }
        });
        expect(oldCart).toBeNull()
    })  */
})