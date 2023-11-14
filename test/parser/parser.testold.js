import Parser from '../../src/utils/parser.js';
import fs from 'fs';

describe ("Tests del parser de eroski", () => {
    let parser = null;
    beforeAll(() => {
        const html = fs.readFileSync("./test/parser/index.html");
        parser = new Parser(html);
    })
    test("Conseguir la seccion general de productos", ()=>{
        const result = parser.getListSection();
        expect(result.innerHTML).toContain("Fiambres y cocidos</h1>");
    })

    test("Conseguir el array de productos", ()=>{
        const section = parser.getListSection();
        const itemList = parser.getItems(section);
        expect(itemList.length).toEqual(20);

    })
})