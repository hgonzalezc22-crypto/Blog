document.getElementById('formEliminar').addEventListener('submit', async (e) => {
    e.preventDefault();

    const id = document.getElementById('id').value;

    try {
        const response = await fetch(`/api/articulo-borrar/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            window.location.href = 'index.html';
        } else {
            alert('Hubo un error al eliminar');
        }
    } catch (error) {
        console.error('Error:', error);
    }
});