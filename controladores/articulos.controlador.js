// Importamos el modelo de datos
const Articulo = require("../modelos/articulo.modelo");
const { validarArticulo } = require("../helpers/validator");

// Controlador para crear un nuevo artículo
const crear = async (req, res) => {
     const { titulo, contenido, imgUrl} = req.body;

    try {
        validarArticulo({ titulo, contenido });
    } catch (error) {
        return res.status(400).json({
            status: "error",
            mensaje: error.message
        });
    }

    try {
        // 2. Instanciar el objeto del artículo con la fecha autogenerada en el servidor
        const nuevoArticulo = new Articulo({
            titulo: titulo,
            contenido: contenido,
            imgUrl: imgUrl,
            fecha: new Date() // Inyección de la fecha actual del sistema
        });

        // 3. Guardar el documento en MongoDB de forma asíncrona
        const articuloGuardado = await nuevoArticulo.save();

        // 4. Retornar respuesta de éxito (Código HTTP 201: Creado)
        return res.status(201).json({
            status: "success",
            mensaje: "Artículo insertado correctamente",
            articulo: articuloGuardado
        });

    } catch (error) {
        // Manejo de errores internos del servidor (Código HTTP 500)
        return res.status(500).json({
            status: "error",
            mensaje: "Error al insertar el artículo",
            error: error.message
        });
    }
};

// Controlador para obtener los artículos
const obtenerBlogs = async (req, res) => {
    try {
        const blogs = await Articulo.find().sort({ fecha: -1 });
        res.json(blogs);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensaje: "Error al obtener los blogs"
        });
    }
};

// Controlador para editar/actualizar un artículo por ID
const editar = async (req, res) => {
    const {titulo, contenido, imgUrl} = req.body;

    try {
        validarArticulo({ titulo, contenido });
    } catch (error) {
        return res.status(400).json({
            status: "error",
            mensaje: error.message
        });
    }

    try {
        // 1. Obtener el ID desde los parámetros de la URL (ej. /articulo/:id)
        const { id } = req.params;

        // 2. Extraer los campos enviados en el body

        // 3. Armar objeto con los datos a actualizar
        const datosActualizar = {};
        if (titulo) datosActualizar.titulo = titulo;
        if (contenido) datosActualizar.contenido = contenido;
        if (imgUrl) datosActualizar.imgUrl = imgUrl

        // 4. Actualizar el documento en la base de datos
        // { new: true } retorna el documento ya modificado en lugar del original
        const articuloActualizado = await Articulo.findByIdAndUpdate(
            id,
            datosActualizar,
            { new: true, runValidators: true }
        );

        // 5. Verificar si el artículo existía
        if (!articuloActualizado) {
            return res.status(404).json({
                status: "error",
                mensaje: "No se encontró el artículo a editar"
            });
        }

        // 6. Retornar respuesta exitosa
        return res.status(200).json({
            status: "success",
            mensaje: "Artículo actualizado correctamente",
            articulo: articuloActualizado
        });

    } catch (error) {
        return res.status(500).json({
            status: "error",
            mensaje: "Error al editar el artículo",
            error: error.message
        });
    }
};

// Controlador para borrar/eliminar un artículo por ID
const borrar = async (req, res) => {
    try {
        // 1. Obtener el ID desde los parámetros de la URL (ej. /articulo/:id)
        const { id } = req.params;

        // 2. Buscar y eliminar de MongoDB
        const articuloEliminado = await Articulo.findByIdAndDelete(id);

        // 3. Verificar si el artículo existía
        if (!articuloEliminado) {
            return res.status(404).json({
                status: "error",
                mensaje: "No se encontró el artículo a borrar"
            });
        }

        // 4. Retornar respuesta de éxito
        return res.status(200).json({
            status: "success",
            mensaje: "Artículo eliminado correctamente",
            articulo: articuloEliminado
        });

    } catch (error) {
        return res.status(500).json({
            status: "error",
            mensaje: "Error al borrar el artículo",
            error: error.message
        });
    }
};


//PARA SUBIR IMAGENES-----------------------------------------------------------------------
const multer = require('multer');
const fs = require('fs');
const path = require('path');

// ==========================================
// 1. Configuración de Multer (Se declara fuera de la función)
// ==========================================
// Configuración de Multer
const almacenamiento = multer.diskStorage({
    destination: (req, file, cb) => {
        const rutaUploads = './uploads/';

        // Si la carpeta no existe, Node.js la crea automáticamente
        if (!fs.existsSync(rutaUploads)) {
            fs.mkdirSync(rutaUploads, { recursive: true });
        }

        cb(null, rutaUploads);
    },
    filename: (req, file, cb) => {
        cb(null, "articulo_" + Date.now() + path.extname(file.originalname));
    }
});

// Inicializamos multer con la configuración anterior, esperando un campo llamado 'imagen' (form-data)
const subidas = multer({ storage: almacenamiento });

// ==========================================
// 2. Controlador principal
// ==========================================
const subir = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(404).json({
                status: "error",
                mensaje: "Petición inválida, no se ha enviado ninguna imagen"
            });
        }

        const extension = req.file.originalname.split(".").pop().toLowerCase();

        if (!["png", "jpg", "jpeg", "gif"].includes(extension)) {
            await fs.promises.unlink(req.file.path);
            return res.status(400).json({
                status: "error",
                mensaje: "Imagen inválida"
            });
        }

        const articuloId = req.params.id;
        const articuloActualizado = await Articulo.findByIdAndUpdate(
            articuloId,
            { imgUrl: req.file.filename },
            { new: true }
        );

        if (!articuloActualizado) {
            await fs.promises.unlink(req.file.path);
            return res.status(404).json({
                status: "error",
                mensaje: "El artículo no existe"
            });
        }

        return res.status(200).json({
            status: "success",
            articulo: articuloActualizado
        });

    } catch (error) {
        return res.status(500).json({
            status: "error",
            mensaje: "Error en el servidor",
            error: error.message
        });
    }
};

// Exportamos los controladores disponibles
module.exports = {
    crear,
    obtenerBlogs,
    editar,
    borrar,
    subir,
    subidas
};