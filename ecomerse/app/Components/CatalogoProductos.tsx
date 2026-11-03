'use client'
import React from 'react'
import { useContextProducto } from '../Provider/ProviderProducto'

export default function CatalogoProductos() {
    const { producto, agregarCarrito } = useContextProducto();

    return (
        <>
            {producto.map((prod) => (
                <div className='col-md-4 mb-3' key={prod.idProducto}>
                    <div className='card'>
                        <div className='card-header'>{prod.nombreProducto}</div>
                        <div className='card-body'>
                            <p>Precio - Lps {prod.precioProducto}</p>
                            <p>Isv - Lps {prod.isvProducto}</p>
                        </div>
                        <div className='card-footer'>
                            <button className='btn btn-info btn-sm' onClick={() => agregarCarrito(prod)}>
                                Agregar al Carrito
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
}