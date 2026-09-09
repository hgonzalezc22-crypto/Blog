async function cargarBlogs() {
            try {
                const respuesta = await fetch("/api/blog");
                const blogs = await respuesta.json();

                const contenedor = document.getElementById("blogs");

                blogs.forEach(blog => {
                    const articulo = document.createElement("article");

                    const titulo = document.createElement("h2");
                    titulo.textContent = blog.titulo;

                    const cuerpo = document.createElement("p");
                    cuerpo.textContent = blog.cuerpo;

                    const fecha = document.createElement("small");
                    fecha.textContent = new Date(blog.fecha).toLocaleDateString();

                    articulo.appendChild(titulo);
                    articulo.appendChild(cuerpo);
                    articulo.appendChild(fecha);

                    contenedor.appendChild(articulo);
                });

            } catch (error) {
                console.error("Error:", error);
            }
        }

        cargarBlogs();