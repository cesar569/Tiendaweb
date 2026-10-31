
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    mensaje: "Backend de TiendaWeb funcionando correctamente"
  });
});

app.get("/api/productos", (req, res) => {
  res.json([
    {
      id: 1,
      nombre: "Smartphone",
      precio: 2499,
      stock: 8,
      categoria: "Celulares"
    },
    {
      id: 2,
      nombre: "Audífonos",
      precio: 349,
      stock: 15,
      categoria: "Audio"
    },
    {
      id: 3,
      nombre: "Teclado mecánico",
      precio: 450,
      stock: 10,
      categoria: "Computación"
    }
  ]);
});

app.post("/api/pedidos", (req, res) => {
  const { nombre, direccion, telefono, productos, total } = req.body;

  if (!nombre || !direccion || !telefono) {
    return res.status(400).json({
      mensaje: "Todos los datos del pedido son obligatorios."
    });
  }

  if (!productos || productos.length === 0) {
    return res.status(400).json({
      mensaje: "El pedido debe contener al menos un producto."
    });
  }

  const numeroPedido = Math.floor(1000 + Math.random() * 9000);

  res.status(201).json({
    mensaje: "Pedido confirmado correctamente.",
    numeroPedido,
    cliente: nombre,
    direccion,
    telefono,
    productos,
    total
  });
});

// Permite probar Express sin iniciar el servidor
if (require.main === module) {
  app.listen(PORT, "0.0.0.0", () => {
    console.log(
      `Backend de TiendaWeb ejecutándose en http://localhost:${PORT}`
    );
  });
}

module.exports = app;
