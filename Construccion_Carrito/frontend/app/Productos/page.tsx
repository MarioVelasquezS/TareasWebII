'use client'
import React, { useEffect } from 'react'
import { Producto } from '../../modelos/Carrito'
import { useCarrito } from '../../provider/ProviderCarrito'

const LISTA_PRODUCTOS: Producto[] = [
  { idproducto: 1, nombre: 'Laptop Gamer', precio: 15000, isvProducto: 2250 },
  { idproducto: 2, nombre: 'Mouse Inalámbrico', precio: 500, isvProducto: 75 },
  { idproducto: 3, nombre: 'Teclado Mecánico RGB', precio: 1200, isvProducto: 180 },
  { idproducto: 4, nombre: 'Monitor 27" IPS 144Hz', precio: 4500, isvProducto: 675 },
]

export default function PaginaProductos() {
  const { ordenCompra, agregarAlCarrito, obtenerCarrito } = useCarrito()

  useEffect(() => {
    obtenerCarrito()
  }, [])

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Catálogo de Productos</h2>
        <span className="text-muted">Orden de Compra Actual: #{ordenCompra}</span>
      </div>

      <div className="row g-4">
        {LISTA_PRODUCTOS.map((prod) => (
          <div key={prod.idproducto} className="col-12 col-md-6 col-lg-3">
            <div className="card h-100 shadow-sm">
              <div className="card-body d-flex flex-column justify-content-between">
                <div>
                  <h5 className="card-title">{prod.nombre}</h5>
                  <p className="card-text mb-1">
                    <strong>Precio:</strong> L. {prod.precio.toFixed(2)}
                  </p>
                  <p className="card-text text-muted">
                    <strong>ISV (15%):</strong> L. {prod.isvProducto.toFixed(2)}
                  </p>
                </div>

                <button
                  className="btn btn-primary w-100 mt-3"
                  onClick={() => agregarAlCarrito(prod.idproducto, prod.isvProducto, ordenCompra)}
                >
                  Agregar al Carrito
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

