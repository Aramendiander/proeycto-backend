import productController from "../../src/controllers/productsController.js";
import db from "../../src/config/db.js";


describe("Test de productController", function () {

    let productId = 0;
    beforeAll(async () => {
        await db;
    });
    test("Create product", async () => {
        const nombre = "TestCreate";
        const descripcion = "TestCreate";
        const precio = 100;
        const product = await productController.createProduct(nombre, descripcion, precio);
        console.log(product);
        productId = product._id;
        expect(product).not.toBeNull();
        expect(product._id).not.toBeNull();
        expect(product.nombre).toEqual(nombre);
        expect(product.descripcion).toEqual(descripcion);
        expect(product.precio).toEqual(precio);
    });

    test("Get all products", async function () {
        const products = await productController.getAllProducts();
        expect(products.length).toBeGreaterThan(0);
        expect(products.find(p => p._id === productId)).not.toBeNull();
    });

    test("Get product by id", async function () {
        const id = productId;
        const product = await productController.getProductById(id);
        expect(product).not.toBeNull();
        expect(product._id).toEqual(id);
        expect(product.nombre).toEqual("TestCreate");
        expect(product.descripcion).toEqual("TestCreate");
        expect(product.precio).toEqual(100);
    });


    test("Update product", async function () {
        const id = productId;
        const nombre = "TestUpdate";
        const descripcion = "TestUpdate";
        const precio = 200;
        const product = await productController.updateProduct(id, nombre, descripcion, precio);
        expect(product).not.toBeNull();
        expect(product._id).toEqual(id);
        expect(product.nombre).toEqual(nombre);
        expect(product.descripcion).toEqual(descripcion);
        expect(product.precio).toEqual(precio);
    });

    test("Delete product", async function () {
        const id = productId;
        await productController.deleteProduct(id);
        const product = await productController.getProductById(id);
        expect(product).toBeNull();
    });

});