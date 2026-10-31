
export function agregarProducto(carrito, producto) {
  const cantidad = carrito.filter(
    item => item.id === producto.id
  ).length;

  if (cantidad >= producto.stock) {
    return carrito;
  }

  return [...carrito, producto];
}

export function quitarUnaUnidad(carrito, id) {
  const indice = carrito.findIndex(item => item.id === id);

  if (indice === -1) return carrito;

  const nuevoCarrito = [...carrito];
  nuevoCarrito.splice(indice, 1);

  return nuevoCarrito;
}

export function eliminarProducto(carrito, id) {
  return carrito.filter(item => item.id !== id);
}

export function calcularTotal(carrito) {
  return carrito.reduce(
    (total, producto) => total + producto.precio,
    0
  );
}

export function contarProductos(carrito) {
  return carrito.length;
}

export function validarPedido({ nombre, direccion, telefono, productos }) {
  if (!nombre?.trim() || !direccion?.trim() || !telefono?.trim()) {
    return false;
  }

  if (!Array.isArray(productos) || productos.length === 0) {
    return false;
  }

  return true;
}

