document.getElementById("start-button").addEventListener("click", () => {
  window.location.href = "quiz.html";
});

let categoriesId = Number(JSON.parse(localStorage.getItem("categoryId")));

async function fetchData() {
  const pathOfJsonFile = await fetch("./../data/categories.json");
  const jsonFormatData = await pathOfJsonFile.json();

  let selectedCategory = jsonFormatData.filter((category) => {
    if (category.id === categoriesId) return category;
  });
  document.querySelector(".category-title").innerHTML =
    selectedCategory[0].name;
  document.querySelector(".category-image").src = selectedCategory[0].image;
}

fetchData();

const totalMinutesInput = document.querySelectorAll("#select");
let totalMinutes = totalMinutesInput.value;

totalMinutesInput.forEach((selectedOption) => {
  selectedOption.addEventListener("click", (e) => {
    localStorage.setItem("totalTime", JSON.stringify(selectedOption.value));
    updateTime();
  });
});

updateTime();

function updateTime() {
  document.querySelector("#mins").innerHTML = JSON.parse(
    localStorage.getItem("totalTime")
  );
}
