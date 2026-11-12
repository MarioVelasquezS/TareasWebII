const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'DELETE']
}));
app.use(express.json());

// Catálogo de respaldo por si la tabla Producto no existe o no tiene el registro en BD
const CATALOGO_PRODUCTOS = {
  1: { nombre: 'Laptop Gamer', precio: 15000 },
  2: { nombre: 'Mouse Inalámbrico', precio: 500 },
  3: { nombre: 'Teclado Mecánico RGB', precio: 1200 },
  4: { nombre: 'Monitor 27" IPS 144Hz', precio: 4500 },
};

// POST /api/carrito: Recibe { idproducto, isvProducto, ordenCompra } y lo inserta en la BD
app.post('/api/carrito', async (req, res) => {
  try {
    const { idproducto, isvProducto, ordenCompra } = req.body;

    if (idproducto === undefined || isvProducto === undefined || ordenCompra === undefined) {
      return res.status(400).json({ mensaje: 'Faltan campos requeridos (idproducto, isvProducto, ordenCompra)' });
    }

    const [result] = await pool.execute(
      'INSERT INTO carrito (idproducto, isvProducto, ordenCompra) VALUES (?, ?, ?)',
      [idproducto, isvProducto, ordenCompra]
    );

    res.status(201).json({
      idcarrito: result.insertId,
      idproducto,
      isvProducto,
      ordenCompra,
    });
  } catch (error) {
    console.error('Error en POST /api/carrito:', error);
    res.status(500).json({ error: 'Error al insertar en el carrito', detalle: error.message });
  }
});

// GET /api/carrito/:ordenCompra: Obtiene los productos filtrados por ordenCompra con su nombre y precio
app.get('/api/carrito/:ordenCompra', async (req, res) => {
  try {
    const { ordenCompra } = req.params;

    // Intenta hacer LEFT JOIN con la tabla Producto; si no existe, consulta solo carrito y cruza con el catálogo
    let rows;
    try {
      const [joinRows] = await pool.execute(
        `SELECT 
           c.idcarrito,
           c.idproducto,
           c.isvProducto,
           c.ordenCompra,
           p.nombreProducto AS nombre,
           p.precioProducto AS precio
         FROM carrito c
         LEFT JOIN Producto p ON c.idproducto = p.idProducto
         WHERE c.ordenCompra = ?`,
        [ordenCompra]
      );
      rows = joinRows;
    } catch {
      const [carritoRows] = await pool.execute(
        'SELECT idcarrito, idproducto, isvProducto, ordenCompra FROM carrito WHERE ordenCompra = ?',
        [ordenCompra]
      );
      rows = carritoRows;
    }

    const resultado = rows.map((item) => {
      const respaldo = CATALOGO_PRODUCTOS[item.idproducto] || {
        nombre: `Producto #${item.idproducto}`,
        precio: 1000,
      };
      return {
        idcarrito: item.idcarrito,
        idproducto: item.idproducto,
        isvProducto: Number(item.isvProducto),
        ordenCompra: Number(item.ordenCompra),
        nombre: item.nombre ?? respaldo.nombre,
        precio: item.precio !== undefined && item.precio !== null ? Number(item.precio) : respaldo.precio,
      };
    });

    res.status(200).json(resultado);
  } catch (error) {
    console.error('Error en GET /api/carrito/:ordenCompra:', error);
    res.status(500).json({ error: 'Error al obtener el carrito', detalle: error.message });
  }
});

// DELETE /api/carrito/:idcarrito: Elimina un producto específico del carrito usando su clave primaria
app.delete('/api/carrito/:idcarrito', async (req, res) => {
  try {
    const { idcarrito } = req.params;
    const [result] = await pool.execute('DELETE FROM carrito WHERE idcarrito = ?', [idcarrito]);

    if (result.affectedRows > 0) {
      res.status(200).json({ mensaje: 'Producto eliminado del carrito' });
    } else {
      res.status(404).json({ mensaje: 'No se encontró el registro con ese idcarrito' });
    }
  } catch (error) {
    console.error('Error en DELETE /api/carrito/:idcarrito:', error);
    res.status(500).json({ error: 'Error al eliminar del carrito', detalle: error.message });
  }
});

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Servidor backend ejecutándose en http://localhost:${PORT}`);
});

