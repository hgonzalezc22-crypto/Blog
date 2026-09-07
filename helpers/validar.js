//Es el punto de entrada principal del servidor Express. Carga los middlewares, 
// inicializa la conexión a MongoDB y habilita las rutas.
const validator = require("validator");

// Helper preparado para validar datos de entrada cuando sea requerido
const validarArticulo = (parametros) => {
    // Ejemplo de validación básica comentada para referencia futura:
    // let validar_titulo = !validator.isEmpty(parametros.titulo);
    // return validar_titulo;
    
    return true; // Por ahora retorna verdadero sin bloquear la petición
};

module.exports = {
    validarArticulo
};