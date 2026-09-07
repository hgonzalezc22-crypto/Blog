const { Schema, model } = require("mongoose");

// Definición del esquema flexible (acepta cualquier campo sin restricciones)
const ArticuloSchema = Schema(
  {}, 
  { 
    strict: false // Permite guardar campos no declarados explícitamente
  }
);

// Exportamos el modelo vinculándolo a la colección 'articles'
// Parámetros: Nombre del modelo, Esquema, Nombre exacto de la colección en MongoDB
module.exports = model("Articulo", ArticuloSchema, "articulos"); //cambiar el nombre de la coleccion destino en la 3ra coma