const express = require("express");
const router = express.Router();

// Importamos el controlador
const ArticuloController = require("../controladores/articulos");

// Ruta POST para crear artículos
// Endpoint final: /api/crear-articulo
router.post("/crear-articulo", ArticuloController.crear);

// Exportamos el enrutador para registrarlo en index.js
module.exports = router;