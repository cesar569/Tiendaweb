import { useState, useEffect } from "react"
import "./App.css"
import axios from "axios"


 function App() {
  const [carrito, setCarrito] = useState([])
  const [productos, setProductos] = useState([])
  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const [nombre, setNombre] = useState("")
  const [direccion, setDireccion] = useState("")
  const [telefono, setTelefono] = useState("")
  const [numeroPedido, setNumeroPedido] = useState(null)

  useEffect(() => {
  

      axios.get("https://tiendaweb-et4b.onrender.com/api/productos")      .then((respuesta) => {
        setProductos(respuesta.data)
      })
      .catch((error) => {
        console.error("Error al obtener los productos:", error)
      })
  }, [])

  return (
    <div>
      <header>
        <h1>🛒 TiendaWeb</h1>
        <p>Tu tienda en línea</p>
      </header>

      <main>
        <h2>Bienvenido a nuestra tienda</h2>
        <p>Encuentra los productos que necesitas.</p>

        <button>Ver productos</button>
        <p>🛒 Productos en el carrito: {carrito.length}</p>
        <div className="carrito">
  <h2>🛒 Mi carrito</h2>

  {carrito.length === 0 ? (
    <p>El carrito está vacío.</p>
  ) : (
    <>
      {Object.values(
  carrito.reduce((grupos, producto) => {
    if (!grupos[producto.id]) {
      grupos[producto.id] = {
        ...producto,
        cantidad: 0,
      }
    }

    grupos[producto.id].cantidad += 1

    return grupos
  }, {})
).map((producto) => (
  <div key={producto.id}>
    <p>
      {producto.nombre} - Q {producto.precio.toFixed(2)} × {producto.cantidad}
    </p>

    <button
      onClick={() => {
        const indice = carrito.findIndex(
          (item) => item.id === producto.id
        )

        if (indice !== -1) {
          const nuevoCarrito = [...carrito]
          nuevoCarrito.splice(indice, 1)
          setCarrito(nuevoCarrito)
        }
      }}
    >
      −
    </button>

    <span> {producto.cantidad} </span>

    <button
      onClick={() => {
        if (producto.cantidad < producto.stock) {
          setCarrito([...carrito, producto])
        } else {
          alert("No puedes agregar más unidades de este producto.")
        }
      }}
    >
      +
    </button>

    <button
      onClick={() => {
        setCarrito(
          carrito.filter((item) => item.id !== producto.id)
        )
      }}
    >
      Eliminar
    </button>
  </div>
))}



      <h3>
        Total: Q{" "}
        {carrito
          .reduce((total, producto) => total + producto.precio, 0)
          .toFixed(2)}
      </h3>
      <button onClick={() => setMostrarFormulario(true)}>
  Realizar pedido
</button>

{mostrarFormulario && (
  <div>
    <h2>Datos del pedido</h2>

   <input
  type="text"
  placeholder="Nombre"
  value={nombre}
  onChange={(e) => setNombre(e.target.value)}
/>

    <input
  type="text"
  placeholder="Dirección"
  value={direccion}
  onChange={(e) => setDireccion(e.target.value)}
/>

    <input
      type="text"
      placeholder="Teléfono"
      value={telefono}
      onChange={(e) => setTelefono(e.target.value)}
    />

    <button
    
  onClick={async () => {
    if (!nombre || !direccion || !telefono) {
      alert("Por favor, completa todos los campos.")
      return
    }

    const totalPedido = carrito
      .reduce((total, producto) => total + producto.precio, 0)

    try {
      const respuesta = await axios.post("https://tiendaweb-et4b.onrender.com/api/pedidos", {
        
          nombre,
          direccion,
          telefono,
          productos: carrito,
          total: totalPedido
        }
      )

      const pedido = respuesta.data

      setNumeroPedido(pedido.numeroPedido)

      alert(
        `Pedido confirmado.\n\n` +
        `Pedido #${pedido.numeroPedido}\n` +
        `Cliente: ${pedido.cliente}\n` +
        `Dirección: ${pedido.direccion}\n` +
        `Teléfono: ${pedido.telefono}`
      )

      setCarrito([])
      setMostrarFormulario(false)

    } catch (error) {
      console.error("Error al confirmar el pedido:", error)

      alert(
        error.response?.data?.mensaje ||
        "Ocurrió un error al confirmar el pedido."
      )
    }
  }}
>
  Confirmar pedido
</button>

    <button onClick={() => setMostrarFormulario(false)}>
      Cancelar
    </button>
  </div>
)}

    </>
  )}
</div>
      </main>
      <h2>Productos disponibles</h2>

<div className="productos">
  {productos.map((producto) => (
    <div className="producto" key={producto.id}>
      <h3>{producto.nombre}</h3>
      <p>Categoría: {producto.categoria}</p>
      <p>Q {producto.precio.toFixed(2)}</p>
      <p>Stock disponible: {producto.stock}</p>

      <button
  onClick={() => {
    const cantidadEnCarrito = carrito.filter(
      (item) => item.id === producto.id
    ).length

    if (cantidadEnCarrito < producto.stock) {
      setCarrito([...carrito, producto])
    } else {
      alert("No hay más unidades disponibles de este producto.")
    }
  }}
>
  Agregar al carrito
</button>
    </div>
  ))}
</div>
    </div>
  )
}

export default App
