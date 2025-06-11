DROP DATABASE IF EXISTS tienda;

CREATE DATABASE tienda CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;

USE tienda;

CREATE TABLE categoria (
    id BIGINT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE producto (
    id BIGINT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    precio DOUBLE NOT NULL,
    categoria_id BIGINT,
    PRIMARY KEY (id),
    CONSTRAINT fk_producto_categoria FOREIGN KEY (categoria_id) REFERENCES categoria(id)
);

CREATE TABLE usuario (
    id BIGINT NOT NULL AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(100) NOT NULL,
    PRIMARY KEY (id)
);


INSERT INTO categoria (nombre) VALUES 
('Cocina'), 
('Dormitorio'), 
('Baño'), 
('Decoración');


INSERT INTO producto (nombre, precio, categoria_id) VALUES 
('Set de cuchillos', 45900, 1),
('Juego de sábanas', 79900, 2),
('Toalla de baño', 25500, 3),
('Cuadro decorativo', 60000, 4);


INSERT INTO usuario (username, password) VALUES 
('admin', 'admin');
