import { createContext } from "react";
import { Producto } from "../modelos/Producto";

export const ContexrProducto = createContext({
    producto: [] as Producto[],
    carritoProducto: [] as Producto[],
    agregarCarrito: (producto: Producto) => { },
    eliminarCarrito: (idProducto: number) => { }
})

