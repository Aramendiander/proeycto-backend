INSERT INTO "user" (name, password, role)
VALUES
('admin', '$2a$10$//w7rNsMdlLSuy8r6yU7ueiahYqvab2hpP6JJHYnqRwVKMEqEiApS', 'admin'), ('victor', '$2a$10$gsQfsS93Iu6tqgrZ0K2vlO3CsZR.HJyRPGzwbMURcTuQ.2a185BkW
', 'user'), ('ander', '$2a$10$kMi27vUOPVEPz8EFAj5WwOcT.wfgUmgQBFBw.mBsUblTPydYAxM4q', 'user'), ('jon', '$2a$10$kMi27vUOPVEPz8EFAj5WwOcT.wfgUmgQBFBw.mBsUblTPydYAxM4q', 'user');


INSERT INTO "category" (name)
VALUES ('microondas'),('patinetes');

INSERT INTO "product" (title, description, picture, price, id_category)
VALUES
('Microondas Bosch', 'Calienta de locos', 'https://electromanchon.com/wp-content/uploads/2020/12/principal-188.jpg', 50, 1), ('Microondas Fagor', 'Caliente muy bien', 'https://www.outletelectrodomesticos.com/media/catalog/product/cache/1/image/650x/040ec09b1e35df139433887a97daa66f/f/o/foto_microondas_integrable_fagor_mwb-17aex_02.jpg', 40, 1), ('Micronodas Cecotec','Este es un mierda', 'https://static.carrefour.es/hd_510x_/crs/cdn_static/catalog/hd/285660_00_1.jpg', 20, 1), ('Patinete Xiaomi','vas volando','https://i01.appmifile.com/webfile/globalweb/chenyang/ess03.png', 150, 2), ('Patinete Cecotec','No tira ni patras' ,'https://img.pccomponentes.com/articles/17/178597/outsider-phoenix-cecotec-front.jpg', 100, 2), ('Microondas Orbegozo','Para calentar el tupper','https://m.media-amazon.com/images/I/61onzCymiFL.jpg',60, 1);


INSERT INTO "cart" (id_user)
VALUES
(1),(2),(3),(4);

INSERT INTO "cart_item" (quantity,id_cart,id_product)
VALUES
(1,2,1),(2,3,2),(1,2,4),(1,4,5),(1,3,3);
