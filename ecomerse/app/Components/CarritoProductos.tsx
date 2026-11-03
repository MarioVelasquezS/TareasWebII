'use client'
import React from 'react'
import { useContextProducto } from '../Provider/ProviderProducto'

export default function CarritoProductos() {
    const { carritoProducto, eliminarCarrito } = useContextProducto();

    return (
        <>
            {carritoProducto.map((prod) => (
                <div className='col-md-4 mb-3' key={prod.idProducto}>
                    <div className='card border-danger'>
                        <div className='card-header text-danger'>{prod.nombreProducto}</div>
                        <div className='card-body'>
                            <p>Precio - Lps {prod.precioProducto}</p>
                            <p>Isv - Lps {prod.isvProducto}</p>
                        </div>
                        <div className='card-footer'>
                            <button className='btn btn-danger btn-sm' onClick={() => eliminarCarrito(prod.idProducto)}>
                                Eliminar del Carrito
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
}