function renderTime(element, mins) {
  let seconds = 1;
  let minutes = mins;

  setInterval(() => {
    if (!seconds) {
      seconds = 60;
      minutes--;
    }
    seconds--;
    document.querySelector(element).innerHTML = `${
      minutes < 10 ? "0" + minutes : minutes
    }: ${seconds < 10 ? "0" + seconds : seconds} s`;

    if (!minutes && !seconds) document.body.innerHTML = "Exercise Finished.";
  }, 1000);
}

class TransitionEffect {
  constructor(eventElement, event, target, className, timeout) {
    this.eventElement = eventElement;
    this.event = event;
    this.target = target;
    this.className = className;
    this.timeout = timeout;
  }

  makeTransition() {
    let goBack = false;
    document
      .querySelector(this.eventElement)
      .addEventListener(this.event, () => {
        goBack = true;
        if (goBack) {
          document.querySelector(this.target).classList.add(this.className);
          if (this.timeout) {
            setTimeout(() => {
              window.location.replace("index.html");
            }, 1000);
          }
        }
      });
  }
}

let id;
function errorGenerate(where, error) {
  let place = document.querySelector(where);
  if (id) clearTimeout(id);
  place.style.opacity = "1";
  if (error)
    place.innerHTML = '<p class="alert alert-danger ">Wrong answer</p>';
  else place.innerHTML = '<p class="alert alert-success">Correct answer</p>';

  id = setTimeout(() => {
    place.style.opacity = "0";
  }, 1500);
}

export { renderTime, TransitionEffect, errorGenerate };
