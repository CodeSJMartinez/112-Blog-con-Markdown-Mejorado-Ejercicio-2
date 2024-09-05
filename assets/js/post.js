document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const postFile = urlParams.get('file');

    if (postFile) {
        fetch(postFile)
            .then(response => response.text())
            .then(mdContent => {
                const postContent = marked.parse(mdContent);

                const titleElement = document.getElementById('post-title');
                const contentElement = document.getElementById('post-content');

                // Extraer el título y el contenido
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = postContent;

                const postTitle = tempDiv.querySelector('h1');
                titleElement.textContent = postTitle ? postTitle.textContent : 'Sin título';

                contentElement.innerHTML = postContent;
            });
    }
});
