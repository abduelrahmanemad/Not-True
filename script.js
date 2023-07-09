// img url https://imageio.forbes.com/specials-images/imageserve/64a98d6cca67efc5164c321a/0x0.jpg?format=jpg&width=1200
const options = ["general", "tech", "business", "health", "science"];
const country = "us";
const apiKey = "aadf05920b4747dda79eecd8010a46d9";
const altImg =
  "https://imageio.forbes.com/specials-images/imageserve/64a98d6cca67efc5164c321a/0x0.jpg?format=jpg&width=1200";
const optionsDiv = document.querySelector(".main-nav");
const articlesContainer = document.querySelector(".art-container");
let requestURL;

async function getNews() {
  articlesContainer.innerHTML = "";
  let respose = await fetch(requestURL);
  if (!respose.ok) {
    alert("Data unavailabel");
    return false;
  }
  let data = await respose.json();
  generateUI(data.articles);
}
function generateUI(articles) {
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
function selectCategory(e, category) {
  let options = document.querySelectorAll(".option");
  options.forEach((option) => option.classList.remove("active"));
  requestURL = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}`;
  e.target.classList.add(".active");
  getNews();
}
function generateOptions() {
  for (let option of options) {
    let listItem = document.createElement("li");
    listItem.innerHTML = `
    <button class="option ${
      option == "general" ? "active" : ""
    }" onclick="selectCategory(event, ${option})">${option}</button>
    `;
    optionsDiv.append(listItem);
  }
}

function init() {
  getNews();
  createOptions();
}
window.onload = () => {
  requestURL = `https://newsapi.org/v2/top-headlines?country=${country}&category=general&apiKey=${apiKey}`;
  init();
  console.log("hi");
};
generateOptions();
