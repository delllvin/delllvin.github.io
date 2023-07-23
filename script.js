// script.js

// Function to fetch data from the API
async function fetchData() {
    try {
      const response = await fetch("http://127.0.0.1:5000/get_posts");
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  }
  
  // Function to display posts
  async function displayPosts() {
    const postListElement = document.getElementById("post-list");
  
    try {
      const posts = await fetchData();
  
      // Clear the previous content of the post list
      postListElement.innerHTML = "";
  
      // Loop through each post and create the post elements
      posts.forEach(post => {
        const postElement = document.createElement("div");
        postElement.classList.add("post");
  
        const imageElement = document.createElement("img");
        imageElement.src = post.preview;
        imageElement.alt = post.title;
  
        const contentElement = document.createElement("div");
        contentElement.classList.add("post-content");
  
        const titleElement = document.createElement("h2");
        titleElement.innerHTML = `<a href="#">${post.title}</a>`;
  
        const userElement = document.createElement("p");
        userElement.classList.add("post-user");
        userElement.textContent = "Posted by: " + post.author;
  
        titleElement.appendChild(userElement);
        contentElement.appendChild(titleElement);
  
        postElement.appendChild(imageElement);
        postElement.appendChild(contentElement);
  
        postListElement.appendChild(postElement);
      });
    } catch (error) {
      console.error("Error displaying posts:", error);
    }
  }
  
  // Call the displayPosts function when the page loads
  window.addEventListener("load", displayPosts);
  