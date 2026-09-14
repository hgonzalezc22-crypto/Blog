async function cargarBlogs() {
            try {
                const respuesta = await fetch("/api/articulo-ver-todos");
                const blogs = await respuesta.json();

                const contenedor = document.getElementById("blogs");

                blogs.forEach(blog => {
                    const articulo = document.createElement("article");

                    const titulo = document.createElement("h2");
                    titulo.textContent = blog.titulo;

                    const contenido = document.createElement("p");
                    contenido.textContent = blog.contenido;

                    const fecha = document.createElement("small");
                    fecha.textContent = "Creado en: "+ new Date(blog.fecha).toLocaleDateString();

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