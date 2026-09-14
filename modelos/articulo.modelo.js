const { Schema, model } = require("mongoose");

// Definición del esquema flexible (acepta cualquier campo sin restricciones)
const ArticuloSchema = Schema({
    titulo: {
        type: String,
        required: true
    },
    contenido: {
        type: String,
        required: true
    },
    fecha: {
        type: Date,
        default: Date.now
    },
    imgUrl: {
        type: String,
        required: false
    },
})

// Exportamos el modelo vinculándolo a la colección 'articles'
// Parámetros: Nombre del modelo, Esquema, Nombre exacto de la colección en MongoDB
module.exports = model("Articulo", ArticuloSchema, "articulos"); //cambiar el nombre de la coleccion destino en la 3ra coma