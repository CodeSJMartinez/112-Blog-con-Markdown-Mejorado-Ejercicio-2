document.addEventListener("DOMContentLoaded", function () {
    const posts = [
        { title: "Primer Post", file: "blog/post1.md" },
        { title: "Segundo Post", file: "blog/post2.md" },
        { title: "Tercer Post", file: "blog/post3.md" }
    ];

    const blogContainer = document.getElementById('blog-posts');
    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'post';

        const postTitle = document.createElement('h2');
        postTitle.textContent = post.title;

        const postContent = document.createElement('div');
        postContent.className = 'post-content';

        fetch(post.file)
            .then(response => response.text())
            .then(mdContent => {
                postContent.innerHTML = marked.parse(mdContent);
            });

        postElement.appendChild(postTitle);
        postElement.appendChild(postContent);
        blogContainer.appendChild(postElement);
    });
});
