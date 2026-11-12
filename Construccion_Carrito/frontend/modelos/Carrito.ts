export interface Producto {
  idproducto: number;
  nombre: string;
  precio: number;
  isvProducto: number;
}

export interface ItemCarrito {
  idcarrito: number;
  idproducto: number;
  nombre: string;
  precio: number;
  isvProducto: number;
  ordenCompra: number;
}

