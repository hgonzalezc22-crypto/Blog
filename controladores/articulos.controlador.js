// Importamos el modelo de datos
const Articulo = require("../modelos/articulo.modelo");

// Controlador para crear un nuevo artículo
const crear = async (req, res) => {
    try {
        const { titulo, contenido, imgUrl} = req.body;

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
    try {
        // 1. Obtener el ID desde los parámetros de la URL (ej. /articulo/:id)
        const { id } = req.params;

        // 2. Extraer los campos enviados en el body
        const {titulo, contenido, imgUrl} = req.body;

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

// Exportamos los controladores disponibles
module.exports = {
    crear,
    obtenerBlogs,
    editar,
    borrar
};