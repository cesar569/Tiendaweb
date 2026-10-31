
const request = require("supertest");
const app = require("./server");

describe("Pruebas del backend TiendaWeb", () => {

  // PRUEBA 1
  test("GET / responde correctamente", async () => {
    const respuesta = await request(app).get("/");

    expect(respuesta.status).toBe(200);
    expect(respuesta.body.mensaje).toBe(
      "Backend de TiendaWeb funcionando correctamente"
    );
  });

  // PRUEBA 2
  test("GET /api/productos responde con JSON", async () => {
    const respuesta = await request(app).get("/api/productos");

    expect(respuesta.status).toBe(200);
    expect(respuesta.headers["content-type"]).toMatch(/json/);
  });

  // PRUEBA 3
  test("Devuelve exactamente tres productos", async () => {
    const respuesta = await request(app).get("/api/productos");

    expect(respuesta.body).toHaveLength(3);
  });

  // PRUEBA 4
  test("Devuelve correctamente el Smartphone", async () => {
    const respuesta = await request(app).get("/api/productos");

    expect(respuesta.body[0]).toEqual({
      id: 1,
      nombre: "Smartphone",
      precio: 2499,
      stock: 8,
      categoria: "Celulares"
    });
  });

  // PRUEBA 5
  test("Devuelve correctamente los Audífonos", async () => {
    const respuesta = await request(app).get("/api/productos");

    expect(respuesta.body[1].nombre).toBe("Audífonos");
    expect(respuesta.body[1].precio).toBe(349);
    expect(respuesta.body[1].stock).toBe(15);
  });

  // PRUEBA 6
  test("Devuelve correctamente el Teclado mecánico", async () => {
    const respuesta = await request(app).get("/api/productos");

    expect(respuesta.body[2].nombre).toBe("Teclado mecánico");
    expect(respuesta.body[2].precio).toBe(450);
    expect(respuesta.body[2].stock).toBe(10);
  });

  const pedidoValido = {
    nombre: "Juan Pérez",
    direccion: "Guatemala",
    telefono: "55555555",
    productos: [
      {
        id: 1,
        nombre: "Smartphone",
        precio: 2499
      }
    ],
    total: 2499
  };

  // PRUEBA 7
  test("Confirma un pedido válido con código 201", async () => {
    const respuesta = await request(app)
      .post("/api/pedidos")
      .send(pedidoValido);

    expect(respuesta.status).toBe(201);
  });

  // PRUEBA 8
  test("Devuelve el mensaje de pedido confirmado", async () => {
    const respuesta = await request(app)
      .post("/api/pedidos")
      .send(pedidoValido);

    expect(respuesta.body.mensaje).toBe(
      "Pedido confirmado correctamente."
    );
  });

  
  // PRUEBA 9
test("Genera un número de pedido de cuatro dígitos", async () => {
  const respuesta = await request(app)
    .post("/api/pedidos")
    .send(pedidoValido);

  expect(respuesta.body.numeroPedido).toBeGreaterThanOrEqual(1000);
  expect(respuesta.body.numeroPedido).toBeLessThanOrEqual(9999);
});

  // PRUEBA 10
  test("Devuelve los datos correctos del cliente", async () => {
    const respuesta = await request(app)
      .post("/api/pedidos")
      .send(pedidoValido);

    expect(respuesta.body.cliente).toBe("Juan Pérez");
    expect(respuesta.body.direccion).toBe("Guatemala");
    expect(respuesta.body.telefono).toBe("55555555");
  });

  // PRUEBA 11
  test("Devuelve los productos y total del pedido", async () => {
    const respuesta = await request(app)
      .post("/api/pedidos")
      .send(pedidoValido);

    expect(respuesta.body.productos).toEqual(pedidoValido.productos);
    expect(respuesta.body.total).toBe(2499);
  });

  // PRUEBA 12
  test("Rechaza un pedido sin nombre", async () => {
    const respuesta = await request(app)
      .post("/api/pedidos")
      .send({ ...pedidoValido, nombre: "" });

    expect(respuesta.status).toBe(400);
  });

  // PRUEBA 13
  test("Rechaza un pedido sin dirección", async () => {
    const respuesta = await request(app)
      .post("/api/pedidos")
      .send({ ...pedidoValido, direccion: "" });

    expect(respuesta.status).toBe(400);
  });

  // PRUEBA 14
  test("Rechaza un pedido sin teléfono", async () => {
    const respuesta = await request(app)
      .post("/api/pedidos")
      .send({ ...pedidoValido, telefono: "" });

    expect(respuesta.status).toBe(400);
  });

  // PRUEBA 15
  test("Rechaza un pedido sin productos", async () => {
    const respuesta = await request(app)
      .post("/api/pedidos")
      .send({ ...pedidoValido, productos: [] });

    expect(respuesta.status).toBe(400);
    expect(respuesta.body.mensaje).toBe(
      "El pedido debe contener al menos un producto."
    );
  });

});
