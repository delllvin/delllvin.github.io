// script.js

// Sample array of posts (you can replace this with data from the server)
const posts = [
    {
        title: "Post 1",
        tags: ["tag1", "tag2"],
        image: "https://via.placeholder.com/300",
        content: "Content of Post 1"
    },
    {
        title: "Post 2",
        tags: ["tag1", "tag3"],
        image: "https://via.placeholder.com/300",
        content: "Content of Post 2"
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

        const titleElement = document.createElement("h2");
        titleElement.innerHTML = `<a href="#">${post.title}</a>`;

        const tagsElement = document.createElement("p");
        tagsElement.classList.add("post-tags");
        tagsElement.textContent = "Tags: " + post.tags.join(", ");

        const imageElement = document.createElement("img");
        imageElement.src = post.image;
        imageElement.alt = post.title;

        const contentElement = document.createElement("p");
        contentElement.classList.add("post-content");
        contentElement.textContent = post.content;

        postElement.appendChild(titleElement);
        postElement.appendChild(tagsElement);
        postElement.appendChild(imageElement);
        postElement.appendChild(contentElement);

        postListElement.appendChild(postElement);
    });
}

// Call the displayPosts function when the page loads
window.addEventListener("load", displayPosts);
