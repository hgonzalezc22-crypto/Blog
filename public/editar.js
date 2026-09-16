document.getElementById('formEditar').addEventListener('submit', async (e) => {
    e.preventDefault();

    const id = document.getElementById('id').value;
    const titulo = document.getElementById('titulo').value.trim();
    const cuerpo = document.getElementById('cuerpo').value.trim();
    const inputImagen = document.getElementById('archivoImagen');

    // Construimos el objeto de texto solo con los campos que el usuario llenó
    const payloadTexto = {};
    if (titulo !== '') payloadTexto.titulo = titulo;
    if (cuerpo !== '') payloadTexto.contenido = cuerpo;

    const tieneTexto = Object.keys(payloadTexto).length > 0;
    const tieneImagen = inputImagen.files.length > 0;

    // Si el usuario no modificó nada, regresamos al index
    if (!tieneTexto && !tieneImagen) {
        window.location.href = 'index.html';
        return;
    }

    try {
        // ==========================================
        // PASO 1: Editar texto (Si hay cambios de texto)
        // ==========================================
        if (tieneTexto) {
            const responseTexto = await fetch(`/api/articulo-editar/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payloadTexto)
            });

            if (!responseTexto.ok) {
                const dataTexto = await responseTexto.json();
                alert(dataTexto.mensaje || 'Hubo un error al actualizar el texto');
                return;
            }
        }

        // ==========================================
        // PASO 2: Subir o reemplazar imagen (Si seleccionaron una nueva)
        // ==========================================
        if (tieneImagen) {
            const formData = new FormData();
            // Usamos 'file0' para coincidir con tu middleware: subidas.single("file0")
            formData.append('file0', inputImagen.files[0]);

            const responseImagen = await fetch(`/api/subir-imagen/${id}`, {
                method: 'POST',
                body: formData
            });

            if (!responseImagen.ok) {
                const dataImagen = await responseImagen.json();
                alert('El texto se actualizó, pero la imagen falló: ' + dataImagen.mensaje);
                window.location.href = 'index.html';
                return;
            }
        }

        // Si todo sale bien, volvemos a la página principal
        window.location.href = 'index.html';

    } catch (error) {
        console.error('Error:', error);
        alert('Error de conexión con el servidor');
    }
});