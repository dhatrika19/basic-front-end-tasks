let blogs = [
  {
    title: "AI in Everyday Life",
    image: "pics1.jpg",
    content: "Artificial Intelligence (AI) has seamlessly integrated into our lives..."
  },
  {
    title: "Modern Web Development",
    image: "pics2.jpg",
    content: "Web development is evolving rapidly with new frameworks..."
  },
  {
    title: "Responsive Design Principles",
    image: "pics3.jpg",
    content:"Responsive design ensures websites work seamlessly across devices. Using flexible grids, media queries, and fluid layouts, designers create adaptable user interfaces that offer great readability and usability regardless of screen size."
  }
];

const blogList = document.getElementById("blogList");
const blogView = document.getElementById("blogView");
const addBlogSection = document.getElementById("addBlogSection");
const addBlogBtn = document.getElementById("addBlogBtn");

const blogImg = document.getElementById("blogImg");
const blogTitle = document.getElementById("blogTitle");
const blogContent = document.getElementById("blogContent");

const STORAGE_KEY = "blog_comments";
let currentBlogIndex = 0;

function renderBlogs() {
  blogList.innerHTML = "";
  blogs.forEach((blog, i) => {
    const card = document.createElement("div");
    card.className = "blog-card";
    card.innerHTML = `
      <img data-src="${blog.image}" alt="Blog Image">
      <div class="blog-card-content">
        <h2>${blog.title}</h2>
        <p>${blog.content.substring(0, 80)}...</p>
      </div>
      <button onclick="openBlog(${i})">Read More</button>
    `;
    blogList.appendChild(card);
  });
  lazyLoadImages();
}

function lazyLoadImages() {
  const lazyImages = document.querySelectorAll("img[data-src]");
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute("data-src");
        io.unobserve(img);
      }
    });
  });
  lazyImages.forEach((img) => io.observe(img));
}

function openBlog(index) {
  const blog = blogs[index];
  blogList.style.display = "none";
  addBlogSection.style.display = "none";
  blogView.style.display = "block";
  blogImg.src = blog.image;
  blogTitle.textContent = blog.title;
  blogContent.textContent = blog.content;
  currentBlogIndex = index;
  renderComments();
}

function goBack() {
  blogView.style.display = "none";
  addBlogSection.style.display = "none";
  blogList.style.display = "grid";
}


function loadComments() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
}

function saveComments(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function renderComments() {
  const commentList = document.getElementById("commentList");
  const comments = loadComments();
  const blogComments = comments[currentBlogIndex] || [];
  commentList.innerHTML = "";
  if (blogComments.length === 0) {
    commentList.innerHTML = "<li class='comment'>No comments yet.</li>";
    return;
  }
  blogComments.forEach((c) => {
    const li = document.createElement("li");
    li.className = "comment";
    li.innerHTML = `<strong>${c.name}</strong>: ${c.text}`;
    commentList.appendChild(li);
  });
}


document.getElementById("commentForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const text = document.getElementById("comment").value.trim();
  if (!name || !text) return alert("Please fill all fields.");
  const comments = loadComments();
  if (!comments[currentBlogIndex]) comments[currentBlogIndex] = [];
  comments[currentBlogIndex].unshift({ name, text });
  saveComments(comments);
  e.target.reset();
  renderComments();
});


addBlogBtn.addEventListener("click", () => {
  blogList.style.display = "none";
  blogView.style.display = "none";
  addBlogSection.style.display = "block";
});

document.getElementById("addBlogForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.getElementById("blogTitleInput").value.trim();
  const image = document.getElementById("blogImageInput").value.trim();
  const content = document.getElementById("blogContentInput").value.trim();
  if (!title || !image || !content) return alert("All fields are required.");
  blogs.push({ title, image, content });
  e.target.reset();
  addBlogSection.style.display = "none";
  blogList.style.display = "grid";
  renderBlogs();
});

renderBlogs();
