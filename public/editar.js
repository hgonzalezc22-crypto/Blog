document.getElementById('formEditar').addEventListener('submit', async (e) => {
    e.preventDefault();

    const id = document.getElementById('id').value;
    const titulo = document.getElementById('titulo').value.trim();
    const cuerpo = document.getElementById('cuerpo').value.trim();
    const imglink = document.getElementById('imgcampo').value;

    const payload = {};

    // Solo se insertan en el JSON final si no están vacíos
    if (titulo !== '') {
        payload.titulo = titulo;
    }
    if (cuerpo !== '') {
        payload.contenido = cuerpo;
    }
    if(imglink !== '') {
        payload.imgUrl = imglink;
    }

    // Si el usuario presionó enviar sin llenar ningún campo opcional, volvemos sin hacer petición
    if (Object.keys(payload).length === 0) {
        window.location.href = 'index.html';
        return;
    }

    try {
        const response = await fetch(`/api/articulo-editar/${id}`, {
            method: 'PUT', // Usado convencionalmente para edición parcial de datos
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            window.location.href = 'index.html';
        } else {
            alert('Hubo un error al editar');
        }
    } catch (error) {
        console.error('Error:', error);
    }
});