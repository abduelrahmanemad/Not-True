// Image URL
const imgUrl =
  "https://imageio.forbes.com/specials-images/imageserve/64a98d6cca67efc5164c321a/0x0.jpg?format=jpg&width=1200";

// News categories
const options = ["general", "technology", "business", "health", "science"];

// API configuration
const country = "us";
const apiKey = "aadf05920b4747dda79eecd8010a46d9";

// Alternative image URL
const altImg =
  "https://imageio.forbes.com/specials-images/imageserve/64a98d6cca67efc5164c321a/0x0.jpg?format=jpg&width=1200";

// DOM elements
const optionsDiv = document.querySelector(".main-nav");
const optionsDivSmall = document.querySelector(".mini-menu");
const articlesContainer = document.querySelector(".art-container");
const searcher = document.getElementById("search-text");
const pagesDiv = document.querySelector(".pages");
const next = document.getElementById("next");
const prev = document.getElementById("prev");
const sortBtns = document.querySelectorAll(".sort-btn");
const searchbtn_sm = document.querySelector(".search-button");

// Media queries
const optionsMinWinSize = window.matchMedia("(max-width: 995px)");
const searchButtonWin = window.matchMedia("(min-width: 620px)");
const minOptionWinSize = window.matchMedia("(min-width: 995px)");
const maxwidthMenu = window.matchMedia("(max-width: 620px)");

// Variables
let activeTab;
let activeCategory;
let requestURL;
let numPages = 0;
let data;
let activeSort;

// Event listeners
next.addEventListener("click", nextClick);
prev.addEventListener("click", prevClick);
searcher.addEventListener("input", updateValue);
searchbtn_sm.addEventListener("click", searchButtonClicked);
window.addEventListener("resize", menuVisibilization);

// Fetch news articles from the API
async function getNews() {
  articlesContainer.innerHTML = "";
  pagesDiv.innerHTML = "";
  console.log(requestURL);
  let response = await fetch(requestURL);
  if (!response.ok) {
    alert("Data unavailable");
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

// Event handler for next button click
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

// Event handler for previous button click
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

// Generate the UI for the articles
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

// Event handler for selecting a page
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

// Generate the pagination pages
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

// Event handler for selecting a category
function selectCategory(e, category) {
  let options = document.querySelectorAll(".option");
  options.forEach((option) => option.classList.remove("active"));
  requestURL = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}`;
  e.target.classList.add("active");
  activeTab = e.target;
  activeCategory = category;
  getNews();
}

// Generate the category options in the navigation menu
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

// Generate the category options in the small menu
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
  activeCategory = "general";
}

// Event handler for selecting a category in the small menu
function selectCategorySmall(e, category) {
  let options = document.querySelectorAll(".sOption");
  options.forEach((option) => option.classList.remove("active"));
  requestURL = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}`;
  e.target.classList.add("active");
  activeTab = e.target;
  activeCategory = category;
  getNews();
}

// Initialize the app
function init() {
  getNews();
  generateOptions();
  generateOptionsSmall();
}

// Initial setup when the window loads
window.onload = () => {
  requestURL = `https://newsapi.org/v2/top-headlines?country=${country}&category=general&apiKey=${apiKey}`;
  init();
};

// Event handler for updating the search value
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

// Event handler for the search button click in small screens
function searchButtonClicked() {
  if (searcher.style.display == "block") {
    searcher.style.display = "none";
  } else {
    searcher.style.display = "block";
  }

  if (optionsMinWinSize.matches && searchButtonWin.matches) {
    if (optionsDiv.style.display == "none") {
      optionsDiv.style.display = "flex";
    } else {
      optionsDiv.style.display = "none";
    }
  }
}

// Event handler for sorting options
function sortClick(e, sort) {
  const activeSort = document.querySelector(".sorting .active");
  const clickedButton = e.target;
  console.log(activeSort);
  console.log(clickedButton);

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

// Event handler for selecting sorting options
const selectElement = document.getElementById("ahmed");
selectElement.addEventListener("change", function () {
  const selectedValue = this.value;
  const activeSort = document.querySelector(".sorting .active");

  if (activeSort) {
    activeSort.classList.remove("active");
  }

  requestURL = `https://newsapi.org/v2/top-headlines?country=${country}&category=${activeCategory}&sortBy=${selectedValue}&apiKey=${apiKey}`;
  getNews();
});

// Function to handle menu visibility based on window size
function menuVisibilization() {
  if (minOptionWinSize.matches) {
    optionsDiv.style.display = "flex";
    searcher.style.display = "block";
  }
  if (optionsMinWinSize.matches) {
    optionsDiv.style.display = "flex";
    searcher.style.display = "none";
  }
  if (maxwidthMenu.matches) {
    optionsDiv.style.display = "none";
  }
}
