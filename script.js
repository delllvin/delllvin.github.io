const apiURL = 'https://test-reddit-posts-api.onrender.com/get_posts';
const versionURL = 'https://test-reddit-posts-api.onrender.com/version';
const postsContainer = document.getElementById('posts-container');
const footer = document.querySelector('footer');

async function fetchPosts() {
  try {
    const response = await fetch(apiURL);
    const data = await response.json();
    displayPosts(data);
    fetchAppVersion(); // Fetch app version after fetching posts
  } catch (error) {
    console.error('Error fetching posts:', error);
  }
}

async function fetchAppVersion() {
  try {
    const response = await fetch(versionURL);
    const data = await response.json();
    displayAppVersion(data);
  } catch (error) {
    console.error('Error fetching app version:', error);
  }
}

function displayPosts(posts) {
  posts.forEach(post => {
    const postElement = createPostElement(post);
    postsContainer.appendChild(postElement);
  });
}

function createPostElement(post) {
  const postElement = document.createElement('div');
  postElement.classList.add('post');

  const previewElement = document.createElement('div');
  previewElement.classList.add('preview');
  previewElement.innerHTML = `<img src="${post.preview}" alt="Preview">`;
  postElement.appendChild(previewElement);

  const postContentElement = document.createElement('div');
  postContentElement.classList.add('post-content');
  const titleElement = document.createElement('h2');
  titleElement.classList.add('post-title');
  titleElement.textContent = post.title;
  postContentElement.appendChild(titleElement);

  const bodyElement = document.createElement('p');
  bodyElement.classList.add('post-body');
  bodyElement.textContent = post.body;
  postContentElement.appendChild(bodyElement);

  const detailsElement = document.createElement('p');
  detailsElement.classList.add('post-details');
  if (post.days > 0) {
    detailsElement.textContent = `Posted by ${post.author} | há ${post.days} dias`;
  }else{
    detailsElement.textContent = `Posted by ${post.author} | hoje`;
  }
  postContentElement.appendChild(detailsElement);

  postElement.appendChild(postContentElement);
  return postElement;
}

function displayAppVersion(version) {
  const versionElement = document.createElement('p');
  versionElement.textContent = 'Feito por phozir - 2023 | ' + `Version: ${version}`;
  footer.appendChild(versionElement);
}

fetchPosts();
