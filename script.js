// img url https://imageio.forbes.com/specials-images/imageserve/64a98d6cca67efc5164c321a/0x0.jpg?format=jpg&width=1200
const options = ["general", "technology", "business", "health", "science"];
const country = "us";
const apiKey = "aadf05920b4747dda79eecd8010a46d9";
const altImg =
  "https://imageio.forbes.com/specials-images/imageserve/64a98d6cca67efc5164c321a/0x0.jpg?format=jpg&width=1200";
const optionsDiv = document.querySelector(".main-nav");
const optionsDivSmall = document.querySelector(".mini-menu");
const articlesContainer = document.querySelector(".art-container");
const searcher = document.getElementById("search-text");
const pagesDiv = document.querySelector(".pages");
const next = document.getElementById("next");
const prev = document.getElementById("prev");
const sortBtns = document.querySelectorAll(".sort-btn");

let activeTab;
let activeCategory;
let requestURL;
let numPages = 0;
let data;
let activeSort;

next.addEventListener("click", nextClick);
prev.addEventListener("click", prevClick);
searcher.addEventListener("input", updateValue);

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

function generateUI(articles) {
  articlesContainer.innerHTML = "";

  for (let article of articles) {
    let box = document.createElement("div");
    let author = article.author ? article.author : "Unknown Author";
    box.classList.add("box");
    box.innerHTML = `<img src="${
      article.urlToImage || altImg
    }" alt="img-of-article" onerror="this.src='${altImg}'"/>
          <div class="content">
            <h3>${article.title}</h3>
            <p>${article.description}</p>
            <div><span>${author}</span></div>
          </div>
          <div class="info">
            <a href="${article.url}">Read More</a>
            <i class="fas fa-long-arrow-alt-right"></i>
          </div>`;

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
  activeTab = e.target;
  activeCategory = category;
  // console.log(activeCategory)
  // console.log(activeTab)
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
  activeTab = document.querySelectorAll(".main-nav li button")[0];
  activeCategory = "general";
}

function generateOptionsSmall() {
  for (let option of options) {
    let listItem = document.createElement("li");
    listItem.innerHTML = `
    <button class="sOption ${
      option == "general" ? "active" : ""
    }" onclick="selectCategorySmall(event, '${option}')">${option}</button>
    `;
    optionsDivSmall.append(listItem);
  }
  // activeTab = document.querySelectorAll(".mini-menu li button")[0];
  // activeTab = document.querySelectorAll(".main-nav li button")[0];
  activeCategory = "general";
}
function selectCategorySmall(e, category) {
  let options = document.querySelectorAll(".sOption");
  options.forEach((option) => option.classList.remove("active"));
  requestURL = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}`;
  e.target.classList.add("active");
  activeTab = e.target;
  activeCategory = category;
  console.log("bitch");
  // console.log(activeCategory)
  // console.log(activeTab)
  getNews();
}
function init() {
  getNews();
  generateOptions();
  generateOptionsSmall();
}
window.onload = () => {
  requestURL = `https://newsapi.org/v2/top-headlines?country=${country}&category=general&apiKey=${apiKey}`;
  init();
};

//////////
/////////
// SEARCH

console.log(searcher);

function updateValue(e) {
  let searchedText = e.target.value;
  searchedText = searchedText.toLowerCase();
  let removeactive = document.querySelectorAll(".option");

  if (
    searchedText == "in" ||
    searchedText == "eg" ||
    searchedText == "us" ||
    searchedText == "br"
  ) {
    requestURL = `https://newsapi.org/v2/top-headlines?country=${searchedText}&category=general&apiKey=${apiKey}`;
    getNews();
    removeactive.forEach((option) => option.classList.remove("active"));
    console.log("API CALLED");
    return;
  } else if (
    searchedText == "business" ||
    searchedText == "entertainment" ||
    searchedText == "general" ||
    searchedText == "health" ||
    searchedText == "science" ||
    searchedText == "sports" ||
    searchedText == "technology"
  ) {
    requestURL = `https://newsapi.org/v2/top-headlines?country=${country}&category=${searchedText}&apiKey=${apiKey}`;
    getNews();
    removeactive.forEach((option) => option.classList.remove("active"));
    console.log("API CALLED");
    return;
  } else if (searchedText == "") {
    activeTab.classList.add("active");
    requestURL = `https://newsapi.org/v2/top-headlines?country=${country}&category=${activeCategory}&apiKey=${apiKey}`;
    getNews();
    console.log("Back to default");
    return;
  } else {
    requestURL = `https://newsapi.org/v2/top-headlines?q=${searchedText}&country=${country}&category=general&apiKey=${apiKey}`;
    getNews();
    removeactive.forEach((option) => option.classList.remove("active"));
    console.log("API CALLED");
  }
}
//business entertainment general health science sports technology

////////////////
///////////////
///// SORT
function sortClick(e, sort) {
  const activeSort = document.querySelector(".sorting .active");
  const clickedButton = e.target;

  if (activeSort === clickedButton) {
    clickedButton.classList.remove("active");
    requestURL = `https://newsapi.org/v2/top-headlines?country=${country}&category=${activeCategory}&apiKey=${apiKey}`;
  } else {
    sortBtns.forEach((btn) => btn.classList.remove("active"));
    clickedButton.classList.add("active");
    requestURL = `https://newsapi.org/v2/top-headlines?country=${country}&category=${activeCategory}&sortBy=${sort}&apiKey=${apiKey}`;
  }
  getNews();
}
