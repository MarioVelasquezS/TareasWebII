-- Crear y seleccionar la base de datos (puedes usar la existente 'ecommerce')
CREATE DATABASE IF NOT EXISTS ecommerce;
USE ecommerce;

-- Tabla de productos (para hacer el JOIN en GET /api/carrito/:ordenCompra)
CREATE TABLE IF NOT EXISTS Producto (
  idProducto INT PRIMARY KEY AUTO_INCREMENT,
  nombreProducto VARCHAR(100) NOT NULL,
  precioProducto DOUBLE NOT NULL,
  isvProducto DOUBLE NOT NULL
);

-- Datos semilla de productos
INSERT INTO Producto (idProducto, nombreProducto, precioProducto, isvProducto) VALUES
  (1, 'Laptop Gamer', 15000, 2250),
  (2, 'Mouse Inalámbrico', 500, 75),
  (3, 'Teclado Mecánico RGB', 1200, 180),
  (4, 'Monitor 27" IPS 144Hz', 4500, 675)
ON DUPLICATE KEY UPDATE nombreProducto = VALUES(nombreProducto);

-- Tabla requerida exacta para el carrito
CREATE TABLE IF NOT EXISTS carrito (
  idcarrito INT PRIMARY KEY AUTO_INCREMENT,
  idproducto INT,
  isvProducto DOUBLE,
  ordenCompra INTEGER
);

