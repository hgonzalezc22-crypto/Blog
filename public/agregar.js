document.getElementById('formAgregar').addEventListener('submit', async (e) => {
    e.preventDefault();

    const titulo = document.getElementById('titulo').value;
    const cuerpo = document.getElementById('cuerpo').value;
    const imglink = document.getElementById('imgcampo').value;
    
    // JSON.stringify se encarga de escapar los saltos de línea y ponerlo en una sola línea con '\n'
    const payload = {
        titulo: titulo,
        contenido: cuerpo, 
        imgUrl: imglink
    };

    try {
        // Recuerda ajustar '/api/articulos' por tu ruta real de la base de datos
        const response = await fetch('/api/articulo-crear', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload) 
        });

        if (response.ok) {
            window.location.href = 'index.html'; // Redirección al menú principal
        } else {
            //Convertir la respuesta del servidor a objeto JSON
            const data = await response.json();

            //Muestra el mensaje de error personalizado que viene del backend (ej: error.message)
            alert(data.mensaje || 'Hubo un error al agregar');
        }
    } catch (error) {
        console.error('Error:', error);
    }
});