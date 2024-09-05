document.addEventListener("DOMContentLoaded", async function () {
    const posts = [
        { file: "blog/post1.md", img: "blog/img/post1.jpg" },
        { file: "blog/post2.md", img: "blog/img/post2.jpg" },
        { file: "blog/post3.md", img: "blog/img/post3.jpg" },
        { file: "blog/post4.md", img: "blog/img/post4.jpg" },
        { file: "blog/post5.md", img: "blog/img/post5.jpg" },
        { file: "blog/post6.md", img: "blog/img/post6.jpg" },
        { file: "blog/post7.md", img: "blog/img/post7.jpg" },
        { file: "blog/post8.md", img: "blog/img/post8.jpg" },
    ];

    const blogContainer = document.getElementById('blog-posts');

    async function renderPost(post) {
        const postElement = document.createElement('div');
        postElement.className = 'post-card';

        // Crear el elemento de imagen
        const imgElement = document.createElement('img');
        imgElement.src = post.img;
        imgElement.onerror = () => {
            imgElement.src = 'blog/img/default.jpg'; // Imagen genérica si falla la carga
        };

        const postTitle = document.createElement('h3');
        const postExcerpt = document.createElement('p');
        const postLink = document.createElement('a');
        postLink.textContent = "Ver Más >";
        postLink.href = `post.html?file=${post.file}`;  // Enlace a la página del post

        try {
            const response = await fetch(post.file);
            if (!response.ok) throw new Error('Error al cargar el post');
            const mdContent = await response.text();
            const htmlContent = marked.parse(mdContent);

            // Extraer el título y el primer párrafo
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = htmlContent;
            const h1Title = tempDiv.querySelector('h1');
            const firstParagraph = tempDiv.querySelector('p');
            
            postTitle.textContent = h1Title ? h1Title.textContent : 'Título no disponible';
            postExcerpt.textContent = firstParagraph ? firstParagraph.textContent : 'Descripción no proporcionada';
        } catch (error) {
            postTitle.textContent = 'Error al cargar el post';
            postExcerpt.textContent = 'No se pudo cargar el contenido de este post.';
        }

        // Agregar el evento para que toda la tarjeta sea clicable
        postElement.addEventListener('click', function (event) {
            // Si el clic es en el enlace, no se redirige automáticamente
            if (event.target.tagName !== 'A') {
                window.location.href = postLink.href;
            }
        });

        postElement.appendChild(imgElement);
        postElement.appendChild(postTitle);
        postElement.appendChild(postExcerpt);
        postElement.appendChild(postLink);
        blogContainer.appendChild(postElement);
    }

    // Procesar los posts de forma asíncrona
    await Promise.all(posts.map(renderPost));
});
