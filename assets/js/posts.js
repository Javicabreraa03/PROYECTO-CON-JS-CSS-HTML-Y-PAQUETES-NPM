// En el archivo JavaScript
import { urls } from './constant.js';

document.addEventListener("DOMContentLoaded", () => {
    const postsSection = document.querySelector(".posts");
    const detailPostSection = document.querySelector(".detail-post.hidden");
    const backButton = document.querySelector(".back-button");
    
    // Función para mostrar el detalle del post
    const displayPostDetail = (post) => {
        const detailPostHeader = detailPostSection.querySelector(".detail-post-header");
        const detailPostTitle = detailPostHeader.querySelector("h2");
        const detailPostContent = detailPostSection.querySelector(".detail-post-content");
        const detailPostAuthor = detailPostSection.querySelector(".detail-post-author");

        detailPostTitle.textContent = post.title;
        detailPostContent.textContent = post.content;
        detailPostAuthor.textContent = post.author;

        detailPostSection.classList.remove("hidden"); // Mostrar la sección de detalle
    };

 // Función para mostrar el detalle del post seleccionado
 const showPostDetail = async (postId) => {
    try {
        const response = await fetch(urls[postId]);
        const post = await response.json();
        displayPostDetail(post);
        postsSection.classList.add("hidden"); // Ocultar la sección de posts
    } catch (error) {
        console.error("Error fetching post detail:", error);
    }
};

    // Función para mostrar los posts en la sección de posts
    const displayPost = (post) => {
        const article = document.createElement("article");
        article.classList.add("post");
        if (post.title && post.content && post.author) {
            const truncatedContent = post.content.length > 100 ? post.content.slice(0, 100) + "..." : post.content;
            article.innerHTML = `
                <a class="post-link" data-id="${post.id}">
                    <header class="post-header">
                        <h3 class="post-title">${post.title}</h3>
                    </header>
                    <footer class="post-footer">
                        <p class="post-content">${truncatedContent}</p>
                        <p class="post-date">${post.date}</p>
                    </footer>
                </a>
            `;
            postsSection.appendChild(article);
        }
    };

      // Event listener para los enlaces de los posts
      postsSection.addEventListener("click", async (event) => {
        if (event.target.closest(".post-link")) {
            const postId = event.target.closest(".post-link").dataset.id;
            await showPostDetail(postId);
        }
    });

    // Event listener para el botón de regreso
    backButton.addEventListener("click", () => {
        detailPostSection.classList.add("hidden"); // Ocultar la sección de detalle
        postsSection.classList.remove("hidden"); // Mostrar la sección de posts
    });

    // Cargar los posts al cargar la página
    const fetchPosts = async () => {
        try {
            for (const postId in urls) {
                if (postId !== "post" && postId !== "550e8400-e29b-41d4-a716-446655440000") {
                    const response = await fetch(urls[postId]);
                    const post = await response.json();
                    displayPost(post);
                }
            }
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };

    // Cargar los posts al cargar la página
    fetchPosts();
});
