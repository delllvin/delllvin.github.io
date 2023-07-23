// script.js

// Function to fetch data from the API
async function fetchData() {
    try {
      const response = await fetch("https://test-reddit-posts-api.onrender.com/get_posts");
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

        if (post.preview.endsWith('.mp4') || post.preview.endsWith('.ogg') || post.preview.endsWith('.webm')) {
            // If the preview is a video
            const videoElement = document.createElement('video');
            videoElement.src = post.preview;
            videoElement.controls = true;
            postElement.appendChild(videoElement);
          } else {
            // If the preview is an image
            const previewImage = document.createElement('img');
            previewImage.src = post.preview;
            previewImage.alt = post.title;
            postElement.appendChild(previewImage);
          }
  
        const contentElement = document.createElement("div");
        contentElement.classList.add("post-content");
  
        const titleElement = document.createElement("h2");
        titleElement.innerHTML = `<a href="#">${post.title}</a>`;
  
        const userElement = document.createElement("p");
        userElement.classList.add("post-user");
        userElement.textContent = "Posted by: " + post.author;
  
        titleElement.appendChild(userElement);
        contentElement.appendChild(titleElement);
  
        postElement.appendChild(contentElement);
  
        postListElement.appendChild(postElement);
      });
    } catch (error) {
      console.error("Error displaying posts:", error);
    }
  }
  
  // Call the displayPosts function when the page loads
  window.addEventListener("load", displayPosts);
  