// 1. Importar dependencias principales
const { conexion } = require("./basededatos/conexion");
const express = require("express");
const cors = require("cors");

// 2. Mensaje inicial de arranque
console.log("Iniciando API Node.js...");

// 3. Ejecutar la conexión a la base de datos MongoDB
conexion();

// 4. Crear la aplicación de Express
const app = express();
const puerto = 3900;

// 5. Configurar CORS (Permite peticiones desde aplicaciones cliente como React, Angular, etc.)
app.use(cors());

// 6. Convertir los cuerpos de las peticiones HTTP a objetos JSON procesables
app.use(express.json()); // Soporta contenido application/json
app.use(express.urlencoded({ extended: true })); // Soporta datos enviados en formularios (form-urlencoded)

// 7. Cargar las rutas de la API
const rutas_articulo = require("./rutas/articulo");

// Registrar las rutas bajo el prefijo '/api'
app.use("/api", rutas_articulo);

// 8. Servidor HTTP a la escucha de peticiones
app.listen(puerto, () => {
    console.log(`Servidor corriendo en el puerto http://localhost:${puerto}`);
});