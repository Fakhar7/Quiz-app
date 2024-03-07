async function fetchCategories() {
  const pathOfJsonFile = await fetch("../data/categories.json");
  const jsonFormatData = await pathOfJsonFile.json();

  let generatedHTML = "";
  jsonFormatData.forEach((eachCategory) => {
    generatedHTML += `
    <div id="categories" data-category-id="${eachCategory.id}" class="container-fluid">
      <div class="container-fluid">
        <div class="categories-inner text-white ">
          <div id="category-image">
            <img src="${eachCategory.image}" alt="programming">
          </div>
          <h3>${eachCategory.name}</h3>
        </div>
      </div>
    </div>
    `;
  });
  document.querySelector(".all-categories").innerHTML = generatedHTML;

  document.querySelectorAll("#categories").forEach((selectedCategory) => {
    selectedCategory.addEventListener("click", () => {
      let id = selectedCategory.dataset.categoryId;
      localStorage.setItem("categoryId", JSON.stringify(id));
      window.location.href = "start.html";
    });
  });
}

fetchCategories();
