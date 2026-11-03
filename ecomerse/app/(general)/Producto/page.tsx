import React from 'react'
import CatalogoProductos from '@/app/Components/CatalogoProductos';

export default function Page() {
    return (
        <div className='container mt-4'>
            <h3>Catálogo de Productos</h3>
            <div className='row'>
                <CatalogoProductos />
            </div>
        </div>
    )
}