document.addEventListener("DOMContentLoaded", function () {
    // Array que contiene la lista de posts (en producción podrías generar este array dinámicamente)
    const posts = [
        { file: "blog/post1.md", img: "blog/img/post1.jpg" },
        { file: "blog/post2.md", img: "blog/img/post2.jpg" },
        { file: "blog/post3.md", img: "blog/img/post3.jpg" },
        { file: "blog/post4.md", img: "blog/img/post4.jpg" },
        { file: "blog/post5.md", img: "blog/img/post5.jpg" },
        { file: "blog/post6.md", img: "blog/img/post6.jpg" },
        // Agrega más posts aquí si lo necesitas
    ];

    const blogContainer = document.getElementById('blog-posts');

    // Función para procesar y renderizar cada post
    function renderPost(post) {
        const postElement = document.createElement('div');
        postElement.className = 'post-card';

        // Verificar si la imagen existe, si no, usar una genérica
        const imgElement = document.createElement('img');
        fetch(post.img)
            .then(response => {
                if (!response.ok) throw new Error('Image not found');
                imgElement.src = post.img;
            })
            .catch(() => {
                imgElement.src = 'blog/img/default.jpg'; // Imagen genérica si no existe la imagen
            });

        const postTitle = document.createElement('h3'); // Será reemplazado por el título real del Markdown
        const postExcerpt = document.createElement('p');
        const postLink = document.createElement('a');
        postLink.textContent = "Ver Más >";
        postLink.href = `post.html?file=${post.file}`;  // Enlace a la página del post

        // Obtener el contenido del archivo Markdown
        fetch(post.file)
            .then(response => response.text())
            .then(mdContent => {
                const htmlContent = marked.parse(mdContent);

                // Obtener el título (primer h1) del Markdown
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = htmlContent;
                const h1Title = tempDiv.querySelector('h1');
                postTitle.textContent = h1Title ? h1Title.textContent : 'Sin título'; // Título del post

                // Obtener el primer párrafo después del título
                const firstParagraph = tempDiv.querySelector('p');
                postExcerpt.textContent = firstParagraph ? firstParagraph.textContent : 'Sin descripción disponible';
            });

        postElement.appendChild(imgElement);
        postElement.appendChild(postTitle);
        postElement.appendChild(postExcerpt);
        postElement.appendChild(postLink);

        blogContainer.appendChild(postElement);
    }

    // Iterar sobre los posts existentes
    posts.forEach(post => {
        renderPost(post);
    });
});
