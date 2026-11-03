import React from 'react'
import CarritoProductos from '@/app/Components/CarritoProductos';

export default function Page() {
    return (
        <div className='container mt-4'>
            <h3>Mi Carrito</h3>
            <div className='row'>
                <CarritoProductos />
            </div>
        </div>
    )
}