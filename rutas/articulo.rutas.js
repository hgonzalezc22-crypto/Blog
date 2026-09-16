const express = require("express");
const router = express.Router();

//CREAR ARTICULO-----------------------------------------------------

// Importamos el controlador
const ArticuloController = require("../controladores/articulos.controlador");

//Rutas
router.post("/articulo-crear", ArticuloController.crear);
router.get("/articulo-ver-todos", ArticuloController.obtenerBlogs);
router.put("/articulo-editar/:id", ArticuloController.editar);   //Ruta para editar por ID
router.delete("/articulo-borrar/:id", ArticuloController.borrar); //Ruta para borrar por ID
router.post("/subir-imagen/:id", ArticuloController.subidas.single("file0"),ArticuloController.subir);


//Exportamos el enrutador para registrarlo en index.js
module.exports = router;