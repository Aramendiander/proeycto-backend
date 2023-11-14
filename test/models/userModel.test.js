import userModel from "../../src/models/userModel.js";

describe("Tests de modelo de producto",() =>{
    let id = null;
    const name = "Alfredo";
    const password = "1234";
    const role = "user";
    test("Crear un usuario nuevo",async ()=>{
        const usuario = await userModel.create({name,password,role})
        expect(usuario).not.toBeUndefined();
        expect(usuario).not.toBeNull();
        expect(usuario.name).toEqual(name);
        expect(usuario.password).toEqual(password);
        expect(usuario.role).toEqual(role);
        id = usuario.id;
    }) 

    test("Conseguir todos los usuarios",async() =>{
        const usuario = await userModel.findAll();
        expect(usuario.length).toBeGreaterThan(0);
        expect(usuario[0]).toHaveProperty("name")
        expect(usuario[0]).toHaveProperty("password")
        expect(usuario[0]).toHaveProperty("role")
    })

    test("Conseguir un producto por ID", async () => {
        const usuario = await userModel.findOne({
            where: {
                id: id
            }
        })
        expect(usuario).not.toBeUndefined();
        expect(usuario).not.toBeNull();
        expect(usuario.name).toEqual(name);
        expect(usuario.password).toEqual(password);
        expect(usuario.role).toEqual(role);

    })

    test("Editar un producto por ID", async () => {
        const user = await userModel.findOne({
            where: {
                id: id
            }
        })
        user.name="Alfrasco"
        user.password="9999"
        await user.save();
        const userNuevo = await userModel.findOne({
            where: {
                id: id
            }
        })
        expect(userNuevo).not.toBeUndefined();
        expect(userNuevo).not.toBeNull();
        expect(userNuevo.name).toEqual("Alfrasco");
        expect(userNuevo.password).toEqual("9999");

    })

    test("Borrar producto por iD", async() => {
        await userModel.destroy({
            where: {
                id: id
            }
        });
        const oldUser = await userModel.findOne({
            where: {
                id: id
            }
        });
        expect(oldUser).toBeNull()
    }) 

})