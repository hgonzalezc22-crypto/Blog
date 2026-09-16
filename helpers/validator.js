const validator = require("validator");

const validarArticulo = (parametros) => {
    // Asegurar que los campos existan y sean strings antes de validar
    let titulo = parametros.titulo ? parametros.titulo.trim() : "";
    let contenido = parametros.contenido ? parametros.contenido.trim() : "";

    // Mayor a 3 caracteres significa mínimo 4
    let validar_titulo = !validator.isEmpty(titulo) && 
        validator.isLength(titulo, { min: 4 });

    // Mayor a 1 carácter significa mínimo 2
    let validar_contenido = !validator.isEmpty(contenido) && 
        validator.isLength(contenido, { min: 2 });

    if (!validar_titulo || !validar_contenido) {
        throw new Error("No se ha validado la información. El título debe tener más de 3 caracteres y el contenido más de 1.");
    }
}

module.exports = {
    validarArticulo
};