-- Database generated with pgModeler (PostgreSQL Database Modeler).
-- pgModeler version: 1.0.6
-- PostgreSQL version: 16.0
-- Project Site: pgmodeler.io
-- Model Author: ---

-- Database creation must be performed outside a multi lined SQL file. 
-- These commands were put in this file only as a convenience.
-- 
-- object: proyecto_backend | type: DATABASE --
-- DROP DATABASE IF EXISTS proyecto_backend;
CREATE DATABASE proyecto_backend;
-- ddl-end --


-- object: public."user" | type: TABLE --
-- DROP TABLE IF EXISTS public."user" CASCADE;
CREATE TABLE public."user" (
	user_id smallserial NOT NULL,
	name varchar(30),
	password varchar(100),
	role varchar(10),
	CONSTRAINT user_pk PRIMARY KEY (user_id)
);
-- ddl-end --

-- ddl-end --

-- object: public.cart | type: TABLE --
-- DROP TABLE IF EXISTS public.cart CASCADE;
CREATE TABLE public.cart (
	cart_id smallserial NOT NULL,
	user_id_user smallint NOT NULL,
	CONSTRAINT cart_pk PRIMARY KEY (cart_id)
);
-- ddl-end --

-- ddl-end --

-- object: public.cart_item | type: TABLE --
-- DROP TABLE IF EXISTS public.cart_item CASCADE;
CREATE TABLE public.cart_item (
	items_id smallserial NOT NULL,
	cart_id_cart smallint NOT NULL,
	CONSTRAINT cart_items_pk PRIMARY KEY (items_id)
);
-- ddl-end --

-- ddl-end --

-- object: public.product | type: TABLE --
-- DROP TABLE IF EXISTS public.product CASCADE;
CREATE TABLE public.product (
	product_id smallserial NOT NULL,
	title text,
	description text,
	picture text,
	price float,
	items_id_cart_item smallint,
	category_id_category smallint,
	CONSTRAINT product_pk PRIMARY KEY (product_id)
);
-- ddl-end --

-- ddl-end --

-- object: public.category | type: TABLE --
-- DROP TABLE IF EXISTS public.category CASCADE;
CREATE TABLE public.category (
	category_id smallserial NOT NULL,
	name text,
	CONSTRAINT categories_pk PRIMARY KEY (category_id)
);
-- ddl-end --

-- ddl-end --

-- object: user_fk | type: CONSTRAINT --
-- ALTER TABLE public.cart DROP CONSTRAINT IF EXISTS user_fk CASCADE;
ALTER TABLE public.cart ADD CONSTRAINT user_fk FOREIGN KEY (user_id_user)
REFERENCES public."user" (user_id) MATCH FULL
ON DELETE RESTRICT ON UPDATE CASCADE;
-- ddl-end --

-- object: cart_uq | type: CONSTRAINT --
-- ALTER TABLE public.cart DROP CONSTRAINT IF EXISTS cart_uq CASCADE;
ALTER TABLE public.cart ADD CONSTRAINT cart_uq UNIQUE (user_id_user);
-- ddl-end --

-- object: cart_fk | type: CONSTRAINT --
-- ALTER TABLE public.cart_item DROP CONSTRAINT IF EXISTS cart_fk CASCADE;
ALTER TABLE public.cart_item ADD CONSTRAINT cart_fk FOREIGN KEY (cart_id_cart)
REFERENCES public.cart (cart_id) MATCH FULL
ON DELETE RESTRICT ON UPDATE CASCADE;
-- ddl-end --

-- object: cart_item_fk | type: CONSTRAINT --
-- ALTER TABLE public.product DROP CONSTRAINT IF EXISTS cart_item_fk CASCADE;
ALTER TABLE public.product ADD CONSTRAINT cart_item_fk FOREIGN KEY (items_id_cart_item)
REFERENCES public.cart_item (items_id) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

-- object: category_fk | type: CONSTRAINT --
-- ALTER TABLE public.product DROP CONSTRAINT IF EXISTS category_fk CASCADE;
ALTER TABLE public.product ADD CONSTRAINT category_fk FOREIGN KEY (category_id_category)
REFERENCES public.category (category_id) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --


