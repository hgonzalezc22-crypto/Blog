// Importamos el modelo de datos
const Articulo = require("../modelos/articulo");

// Controlador para crear un nuevo artículo
const crear = async (req, res) => {
    try {
        // 1. Extraer los datos enviados por el cliente en el cuerpo de la petición (req.body)
        const { titulo, contenido, cuerpo } = req.body;

        // Soporte flexible para recibir 'contenido' o 'cuerpo'
        const textoCuerpo = contenido || cuerpo;

        // 2. Instanciar el objeto del artículo con la fecha autogenerada en el servidor
        const nuevoArticulo = new Articulo({
            titulo: titulo,
            cuerpo: textoCuerpo,
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

// Exportamos los controladores disponibles
module.exports = {
    crear
};