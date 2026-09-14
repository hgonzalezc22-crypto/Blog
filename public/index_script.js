async function cargarBlogs() {
            try {
                const respuesta = await fetch("/api/articulo-ver-todos");
                const blogs = await respuesta.json();

                const contenedor = document.getElementById("blogs");

                blogs.forEach(blog => {
                    const articulo = document.createElement("article");

                    // Elemento para mostrar el ID de Mongo
                    const idArticulo = document.createElement("small");
                    idArticulo.style.display = "block";
                    idArticulo.style.color = "#555";
                    idArticulo.textContent = "ID: " + (blog._id || blog.id);
                    articulo.appendChild(idArticulo); //lo agrega de una vez para que esté antes de la img

                    // Si existe URL de imagen, renderizamos la etiqueta <img>
                    if (blog.imgUrl) {
                        const img = document.createElement("img");
                        img.src = blog.imgUrl;
                        img.alt = blog.titulo;
                        img.style.maxWidth = "400px"; // Ajuste visual básico
                        img.style.maxHeight = "300px"; // Ajuste visual básico
                        articulo.appendChild(img); 
                    }

                    const titulo = document.createElement("h2");
                    titulo.textContent = blog.titulo;

                    const contenido = document.createElement("p");
                    contenido.style.whiteSpace = "pre-wrap"; // Hace que el navegador dibuje los \n
                    //La forma más limpia y segura (evita inyecciones de código XSS) al usar la propiedad white-space
                    contenido.textContent = blog.contenido;

                    const fecha = document.createElement("small");

                    const fechaFormateada = new Date(blog.fecha).toLocaleString('es-ES', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                        hour12: false //Para AM/PM
                    });
                    //fecha.textContent = "Creado en: "+ new Date(blog.fecha).toLocaleDateString();
                    fecha.textContent = "Creado en "+ fechaFormateada;

                    articulo.appendChild(titulo);
                    articulo.appendChild(contenido);
                    articulo.appendChild(fecha);

                    contenedor.appendChild(articulo);
                });

            } catch (error) {
                console.error("Error:", error);
            }
        }

        cargarBlogs();