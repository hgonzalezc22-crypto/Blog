const mongoose = require("mongoose");

const conexion = async () => {
    try {
        // Conexión usando el puerto estándar de MongoDB (27017)
        await mongoose.connect("mongodb://localhost:27017/mi_blog");

        console.log("Conectado correctamente a la base de datos mi_blog");
    } catch (error) {
        console.error("Error de conexión:", error.message);
        throw new Error("No se ha podido conectar a la base de datos");
    }
}

module.exports = {
    conexion
}
