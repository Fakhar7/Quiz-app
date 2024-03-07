import { renderTime, TransitionEffect, errorGenerate } from "./import.js";

let sectionTransition = new TransitionEffect(
  ".btn-close",
  "click",
  "section",
  "goBack",
  true
);

let isError;

const totalTime = 10;

sectionTransition.makeTransition();
renderTime("#renderTime", totalTime);
let start = 1;
let howManyOptions = -1;

async function fetchData() {
  let data = await fetch("./data/questions.json");
  let jsonQuestioObject = await data.json();
  const htmlQuestionBody = document.querySelector(".box");
  const questionNo = start;

  const JSON_FILE_QUESTION_NO = jsonQuestioObject[questionNo];
  let HTML_OPTIONS = "";
  for (let answer of JSON_FILE_QUESTION_NO.options) {
    howManyOptions++;
    HTML_OPTIONS += `
    <div class="choice">
      <input type="radio" class="radio d-none" id="radio-${howManyOptions}">
      <label data-options="${howManyOptions}" class="select-options" for="radio-${howManyOptions}">
      ${JSON_FILE_QUESTION_NO.options.indexOf(answer) + 1}. ${answer}</label>
    </div>
    `;
  }

  htmlQuestionBody.innerHTML = `
  <h5>${questionNo}. ${JSON_FILE_QUESTION_NO.question}</h5>
  <div class="answers">
    ${HTML_OPTIONS}
  </div>
  
  `;

  let htmlOptions = document.querySelectorAll(".select-options");
  htmlOptions.forEach((selectedOption) => {
    selectedOption.addEventListener("click", () => {
      htmlOptions.forEach((check) => {
        if (check.classList.contains("js-selected-option"))
          check.classList.remove("js-selected-option");
      });
      selectedOption.classList.add("js-selected-option");
      if (
        Number(selectedOption.dataset.options) === JSON_FILE_QUESTION_NO.answer
      )
        isError = false;
      else isError = true;
    });
  });
}

fetchData();

document.getElementById("button-submit").addEventListener("click", () => {
  errorGenerate("#error", isError);
  if (!isError) {
    start++;
    howManyOptions = -1;
    setTimeout(() => fetchData(), 1000);
  }
});
