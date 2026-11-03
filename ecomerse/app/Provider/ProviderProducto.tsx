'use client'
import React, { useContext, useState } from 'react'
import { Plantilla } from '../modelos/Plantilla'
import { Producto } from '../modelos/Producto'
import { ContexrProducto } from '../Context/ContextProducto';

export default function ProviderProducto({ children }: Plantilla) {

    const [producto, setProducto] = useState<Producto[]>([
        { idProducto: 1, 
        nombreProducto: 'papas', 
        precioProducto: 10, 
        isvProducto: 2, 
        imgProducto: '' },
        { idProducto: 2, 
        nombreProducto: 'arroz', 
        precioProducto: 80, 
        isvProducto: 20, 
        imgProducto: '' },
        { idProducto: 3, 
        nombreProducto: 'Manzanas', 
        precioProducto: 15, 
        isvProducto: 4, 
        imgProducto: '' },
        { idProducto: 4, 
        nombreProducto: 'uvas', 
        precioProducto: 90, 
        isvProducto: 7, 
        imgProducto: '' },
        { idProducto: 5, 
        nombreProducto: 'zanahorias', 
        precioProducto: 67, 
        isvProducto: 6, 
        imgProducto: '' }
    ]);

    const [carritoProducto, setCarritoProducto] = useState<Producto[]>([]);

    function agregarCarrito(producto: Producto) {
        alert('Producto Agregado al carrito')
        setCarritoProducto([...carritoProducto, producto])
    }

    function eliminarCarrito(idProducto: number) {
        const nuevoCarrito = carritoProducto.filter(p => p.idProducto !== idProducto);
        setCarritoProducto(nuevoCarrito);
    }

    return (
        <ContexrProducto.Provider value={{ producto, carritoProducto, agregarCarrito, eliminarCarrito }}>
            {children}
        </ContexrProducto.Provider>
    )
}

export function useContextProducto() {
    return useContext(ContexrProducto)
}