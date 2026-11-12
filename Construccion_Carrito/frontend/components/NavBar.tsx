'use client'
import React from 'react'
import Link from 'next/link'
import { useCarrito } from '../provider/ProviderCarrito'

export const NavBar = () => {
  const { carrito, ordenCompra } = useCarrito()

  return (
    <nav className="navbar navbar-expand-lg bg-light border-bottom">
      <div className="container">
        <Link className="navbar-brand fw-bold text-dark" href="/Productos">
          Tienda Web II
        </Link>
        <div className="d-flex align-items-center gap-3">
          <Link className="btn btn-outline-dark btn-sm" href="/Productos">
            Productos
          </Link>
          <Link className="btn btn-dark btn-sm" href="/Carrito">
            Ir al Carrito ({carrito.length})
          </Link>
          <span className="badge text-bg-secondary">Orden #{ordenCompra}</span>
        </div>
      </div>
    </nav>
  )
}

