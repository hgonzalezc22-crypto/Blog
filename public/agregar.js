document.getElementById('formAgregar').addEventListener('submit', async (e) => {
    e.preventDefault();

    const titulo = document.getElementById('titulo').value;
    const cuerpo = document.getElementById('cuerpo').value;
    const inputImagen = document.getElementById('archivoImagen'); // Llamamos al nuevo input file
    
    // El payload inicial solo lleva texto. 
    // La imagen se manejará en el paso 2 con Multer.
    const payloadTexto = {
        titulo: titulo,
        contenido: cuerpo 
    };

    try {
        // ==========================================
        // PASO 1: Crear el artículo en MongoDB
        // ==========================================
        const responseCrear = await fetch('/api/articulo-crear', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payloadTexto) 
        });

        const dataCrear = await responseCrear.json();

        if (!responseCrear.ok) {
            alert(dataCrear.mensaje || 'Hubo un error al agregar el artículo');
            return; // Cortamos la ejecución si falló la validación o inserción
        }

        // ==========================================
        // PASO 2: Subir la imagen (Si seleccionaron una)
        // ==========================================
        // Extraemos el ID que nos devolvió MongoDB tras crear el artículo exitosamente
        const idGenerado = dataCrear.articulo._id;

        if (inputImagen.files.length > 0) {
            // FormData es nativo de JS y es obligatorio para enviar archivos al servidor
            const formData = new FormData();
            
            // IMPORTANTE: 'file0' debe llamarse EXACTAMENTE IGUAL que en tu middleware: subidas.single("file0")
            formData.append('file0', inputImagen.files[0]);

            const responseSubir = await fetch(`/api/subir-imagen/${idGenerado}`, {
                method: 'POST',
                // ¡OJO! Al usar FormData NO debes poner 'Content-Type': 'application/json'.
                // El navegador automáticamente configura los headers correctos para archivos (multipart/form-data).
                body: formData
            });

            const dataSubir = await responseSubir.json();

            if (!responseSubir.ok) {
                alert('El artículo se creó, pero la imagen falló: ' + dataSubir.mensaje);
                window.location.href = 'index.html';
                return;
            }
        }

        // Si todo el proceso termina bien, regresamos al menú principal
        window.location.href = 'index.html'; 

    } catch (error) {
        console.error('Error:', error);
        alert('Error de conexión con el servidor');
    }
});