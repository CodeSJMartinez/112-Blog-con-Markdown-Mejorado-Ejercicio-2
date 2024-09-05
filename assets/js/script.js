document.addEventListener("DOMContentLoaded", function () {
    const posts = [
        { title: "Primer Post", file: "blog/post1.md", img: "blog/img/post1.jpg" },
        { title: "Segundo Post", file: "blog/post2.md", img: "blog/img/post2.jpg" },
        { title: "Tercer Post", file: "blog/post3.md", img: "blog/img/post3.jpg" },
        { title: "Cuarto Post", file: "blog/post4.md", img: "blog/img/post4.jpg" },
        { title: "Quinto Post", file: "blog/post5.md", img: "blog/img/post5.jpg" },
        { title: "Sexto Post", file: "blog/post6.md", img: "blog/img/post6.jpg" }
    ];

    const blogContainer = document.getElementById('blog-posts');

    posts.slice(0, 6).forEach(post => {
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
                imgElement.src = 'blog/img/default.jpg'; // Imagen genérica
            });

        const postTitle = document.createElement('h3');
        postTitle.textContent = post.title;

        const postExcerpt = document.createElement('p');
        const postLink = document.createElement('a');
        postLink.textContent = "Ver Más >";
        postLink.href = `post.html?file=${post.file}`;  // Enlace a la página del post

        // Obtener el contenido del archivo Markdown
        fetch(post.file)
            .then(response => response.text())
            .then(mdContent => {
                const htmlContent = marked.parse(mdContent);

                // Obtener el primer párrafo después del título
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = htmlContent;
                const firstParagraph = tempDiv.querySelector('p');
                postExcerpt.textContent = firstParagraph ? firstParagraph.textContent : '';
            });

        postElement.appendChild(imgElement);
        postElement.appendChild(postTitle);
        postElement.appendChild(postExcerpt);
        postElement.appendChild(postLink);

        blogContainer.appendChild(postElement);
    });
});
