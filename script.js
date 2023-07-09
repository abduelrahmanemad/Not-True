// img url https://imageio.forbes.com/specials-images/imageserve/64a98d6cca67efc5164c321a/0x0.jpg?format=jpg&width=1200
const options = ["general", "technology", "business", "health", "science"];
const country = "us";
const apiKey = "7a344b4996f4461f99707dae0fc1a80a";
const altImg =
  "https://imageio.forbes.com/specials-images/imageserve/64a98d6cca67efc5164c321a/0x0.jpg?format=jpg&width=1200";
const optionsDiv = document.querySelector(".main-nav");
const articlesContainer = document.querySelector(".art-container");
const pagesDiv = document.querySelector(".pages");
const searcher = document.getElementById("search-text");
const next = document.getElementById("next");
const prev = document.getElementById("prev");

let requestURL;

let numPages = 0;

let data;

async function getNews() {
  articlesContainer.innerHTML = "";
  pagesDiv.innerHTML = "";
  let response = await fetch(requestURL);
  if (!response.ok) {
    alert("Data unavailabel");
    return false;
  }
  data = await response.json();
  generatePages(data.articles.length);
  let active = document.querySelector(".pages .active");
  if (parseInt(active.value) === numPages) {
    let article12 = data.articles.slice((parseInt(active.value) - 1) * 12);
    generateUI(article12);
  } else {
    let article12 = data.articles.slice(
      (parseInt(active.value) - 1) * 12,
      parseInt(active.value) * 12
    );
    generateUI(article12);
  }
}

function generateUI(articles) {
  articlesContainer.innerHTML = "";
  for (let article of articles) {
    let box = document.createElement("div");
    box.classList.add("box");
    box.innerHTML = `<img
            src="${article.urlToImage}||${altImg}"
            alt="img-of-article"
          />
          <div class="content">
            <h3>
              ${article.title}
            </h3>
            <p>
              ${article.description}
            </p>
            <p><span>
              ${article.author}
            </span></p>
          </div>
          <div class="info">
            <a href="${article.url}">Read More</a>
            <i class="fas fa-long-arrow-alt-right"></i>
          </div>
            `;
    articlesContainer.append(box);
  }
}

function selectPage(e, pg) {
  let pages = document.querySelectorAll(".page");
  pages.forEach((page) => page.classList.remove("active"));
  e.target.classList.add("active");
  let active = document.querySelector(".pages .active");
  if (parseInt(active.value) === numPages) {
    let article12 = data.articles.slice((parseInt(active.value) - 1) * 12);
    generateUI(article12);
  } else {
    let article12 = data.articles.slice(
      (parseInt(active.value) - 1) * 12,
      parseInt(active.value) * 12
    );
    generateUI(article12);
  }
}
function generatePages(articlesL) {
  for (let i = 0; i < Math.floor(articlesL) / 12; i++) {
    let listItem = document.createElement("li");
    listItem.innerHTML = `<button  class="page ${
      i == 0 ? "active" : ""
    }" onclick="selectPage(event, '${i}')" 
    }"  value="${i + 1}">${i + 1}</button>`;
    pagesDiv.append(listItem);
    numPages++;
  }
}

function selectCategory(e, category) {
  let options = document.querySelectorAll(".option");
  options.forEach((option) => option.classList.remove("active"));
  requestURL = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}`;
  e.target.classList.add("active");
  getNews();
}
function generateOptions() {
  for (let option of options) {
    let listItem = document.createElement("li");
    listItem.innerHTML = `
    <button class="option ${
      option == "general" ? "active" : ""
    }" onclick="selectCategory(event, '${option}')">${option}</button>
    `;
    optionsDiv.append(listItem);
  }
}

searcher.addEventListener("input", updateValue);

function updateValue(e) {
  let searchedText = e.target.value;
  searchedText = searchedText.toLowerCase();

  if (
    searchedText == "in" ||
    searchedText == "eg" ||
    searchedText == "us" ||
    searchedText == "br"
  ) {
    requestURL = `https://newsapi.org/v2/top-headlines?country=${searchedText}&category=general&apiKey=${apiKey}`;
    getNews();
    console.log("API CALLED");
    return;
  }
  if (searchedText.length >= 6) {
    requestURL = `https://newsapi.org/v2/top-headlines?country=${country}&category=${searchedText}&apiKey=${apiKey}`;
    getNews();
    console.log("API CALLED");
    return;
  }
}
next.addEventListener("click", nextClick);
function nextClick(e) {
  let pages = document.querySelectorAll(".page");
  let active = document.querySelector(".pages .active");
  let numPages = pages.length;
  if (parseInt(active.value) === numPages) {
    return;
  }

  pages.forEach((page) => page.classList.remove("active"));
  pages.forEach((page) => {
    if (parseInt(page.value) === parseInt(active.value) + 1) {
      page.classList.add("active");
    }
  });
  active = document.querySelector(".pages .active");
  if (parseInt(active.value) === numPages) {
    let article12 = data.articles.slice((parseInt(active.value) - 1) * 12);
    generateUI(article12);
  }
  let article12 = data.articles.slice(
    (parseInt(active.value) - 1) * 12,
    parseInt(active.value) * 12
  );
  generateUI(article12);
}
prev.addEventListener("click", prevClick);
function prevClick(e) {
  let pages = document.querySelectorAll(".page");
  let active = document.querySelector(".pages .active");
  let numPages = pages.length;
  if (parseInt(active.value) === 1) {
    return;
  }

  pages.forEach((page) => page.classList.remove("active"));
  pages.forEach((page) => {
    if (parseInt(page.value) === parseInt(active.value) - 1) {
      page.classList.add("active");
    }
  });
  active = document.querySelector(".pages .active");
  if (parseInt(active.value) === numPages) {
    let article12 = data.articles.slice((parseInt(active.value) - 1) * 12);
    generateUI(article12);
  }
  let article12 = data.articles.slice(
    (parseInt(active.value) - 1) * 12,
    parseInt(active.value) * 12
  );
  generateUI(article12);
}

function init() {
  getNews();
  generateOptions();
}
window.onload = () => {
  requestURL = `https://newsapi.org/v2/top-headlines?country=${country}&category=general&apiKey=${apiKey}`;
  init();
};
