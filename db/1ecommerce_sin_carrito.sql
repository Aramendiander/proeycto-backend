-- Database generated with pgModeler (PostgreSQL Database Modeler).
-- pgModeler version: 1.0.6
-- PostgreSQL version: 16.0
-- Project Site: pgmodeler.io
-- Model Author: ---

-- Database creation must be performed outside a multi lined SQL file. 
-- These commands were put in this file only as a convenience.
-- 
-- object: new_database | type: DATABASE --
-- DROP DATABASE IF EXISTS new_database;
--CREATE DATABASE new_database;
-- ddl-end --


-- object: public.product | type: TABLE --
-- DROP TABLE IF EXISTS public.product CASCADE;
CREATE TABLE public.product (
	id smallserial NOT NULL,
	title text,
	description text,
	picture text,
	price float,
	id_category smallint,
	CONSTRAINT product_pk PRIMARY KEY (id)
);
-- ddl-end --
-- ddl-end --

-- object: public.category | type: TABLE --
-- DROP TABLE IF EXISTS public.category CASCADE;
CREATE TABLE public.category (
	id smallserial NOT NULL,
	name text,
	CONSTRAINT category_pk PRIMARY KEY (id)
);
-- ddl-end --

-- ddl-end --

-- object: public.cart_item | type: TABLE --
-- DROP TABLE IF EXISTS public.cart_item CASCADE;
CREATE TABLE public.cart_item (
	id smallserial NOT NULL,
	quantity smallint,
	id_product smallint,
	id_user smallint,
	CONSTRAINT cart_item_pk PRIMARY KEY (id)
);
-- ddl-end --
-- ddl-end --

-- object: public."user" | type: TABLE --
-- DROP TABLE IF EXISTS public."user" CASCADE;
CREATE TABLE public."user" (
	id smallserial NOT NULL,
	name varchar(30),
	password varchar(100),
	role varchar(10),
	CONSTRAINT user_pk PRIMARY KEY (id)
);
-- ddl-end --
-- ddl-end --

-- object: product_fk | type: CONSTRAINT --
-- ALTER TABLE public.cart_item DROP CONSTRAINT IF EXISTS product_fk CASCADE;
ALTER TABLE public.cart_item ADD CONSTRAINT product_fk FOREIGN KEY (id_product)
REFERENCES public.product (id) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

-- object: category_fk | type: CONSTRAINT --
-- ALTER TABLE public.product DROP CONSTRAINT IF EXISTS category_fk CASCADE;
ALTER TABLE public.product ADD CONSTRAINT category_fk FOREIGN KEY (id_category)
REFERENCES public.category (id) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --

-- object: user_fk | type: CONSTRAINT --
-- ALTER TABLE public.cart_item DROP CONSTRAINT IF EXISTS user_fk CASCADE;
ALTER TABLE public.cart_item ADD CONSTRAINT user_fk FOREIGN KEY (id_user)
REFERENCES public."user" (id) MATCH FULL
ON DELETE SET NULL ON UPDATE CASCADE;
-- ddl-end --


