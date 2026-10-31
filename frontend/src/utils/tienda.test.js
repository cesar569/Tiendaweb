
import { describe, it, expect } from "vitest";

import {
  agregarProducto,
  quitarUnaUnidad,
  eliminarProducto,
  calcularTotal,
  contarProductos,
  validarPedido
} from "./tienda";

const producto = {
  id: 1,
  nombre: "Smartphone",
  precio: 2499,
  stock: 2
};

describe("Pruebas unitarias de TiendaWeb", () => {
  it("Agrega un producto al carrito", () => {
    expect(agregarProducto([], producto)).toHaveLength(1);
  });

  it("No permite superar el stock", () => {
    const carrito = [producto, producto];

    expect(agregarProducto(carrito, producto)).toHaveLength(2);
  });

  it("Quita una unidad del carrito", () => {
    expect(quitarUnaUnidad([producto, producto], 1)).toHaveLength(1);
  });

  it("Elimina todas las unidades de un producto", () => {
    expect(eliminarProducto([producto, producto], 1)).toHaveLength(0);
  });

  it("Calcula correctamente el total", () => {
    expect(calcularTotal([producto, producto])).toBe(4998);
  });

  it("Cuenta los productos del carrito", () => {
    expect(contarProductos([producto, producto])).toBe(2);
  });

  it("Acepta un pedido con datos completos", () => {
    expect(validarPedido({
      nombre: "Carlos",
      direccion: "Guatemala",
      telefono: "55555555",
      productos: [producto]
    })).toBe(true);
  });

  it("Rechaza un pedido sin nombre", () => {
    expect(validarPedido({
      nombre: "",
      direccion: "Guatemala",
      telefono: "55555555",
      productos: [producto]
    })).toBe(false);
  });
});
