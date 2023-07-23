// script.js

// Sample array of posts (you can replace this with data from the server)
const posts = [
    {
        title: "Os franceses sem entender nada",
        tags: ["u/MaykaLynn"],
        image: "https://b.thumbs.redditmedia.com/Co-Q4IGslz_bPN5qZXf_bnar58bktguqngwVzkjx4zw.jpg"
    },
    {
        title: "sai do fake Barnabé",
        tags: ["u/lunetainvisivel"],
        image: "https://a.thumbs.redditmedia.com/molP8TGZIlseCz1zvGBWWEnm1OVYj-DEzPeUGLmTQr8.jpg"
    },
    // Add more posts as needed
];

// Function to display posts
function displayPosts() {
    const postListElement = document.getElementById("post-list");

    // Clear the previous content of the post list
    postListElement.innerHTML = "";

    // Loop through each post and create the post elements
    posts.forEach(post => {
        const postElement = document.createElement("div");
        postElement.classList.add("post");

        const imageElement = document.createElement("img");
        imageElement.src = post.image;
        imageElement.alt = post.title;

        const contentElement = document.createElement("div");
        contentElement.classList.add("post-content");

        const titleElement = document.createElement("h2");
        titleElement.innerHTML = `<a href="#">${post.title}</a>`;

        const tagsElement = document.createElement("p");
        tagsElement.classList.add("post-tags");
        tagsElement.textContent = "Usuario: " + post.tags.join(", ");

        titleElement.appendChild(tagsElement);
        contentElement.appendChild(titleElement);

        postElement.appendChild(imageElement);
        postElement.appendChild(contentElement);

        postListElement.appendChild(postElement);
    });
}

// Call the displayPosts function when the page loads
window.addEventListener("load", displayPosts);
