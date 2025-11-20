const checkBoxList = document.querySelectorAll(".custom-checkbox");
const inputFields = document.querySelectorAll(".goal-input");
const errorMsg = document.querySelector(".error-label");
const progressBar = document.querySelector(".progress-bar");
const progressValue = document.querySelector(".progress-value");
const progressLable = document.querySelector(".progress-label")

const allQoutes = [
  'Raise the bar by completing your goals!',
  'well begun is half done!',
  'just a step away, keep going',
  'whoa! You just completed all the goals, time for chill',
  
]

const allGoals = JSON.parse(localStorage.getItem('allGoals')) || {};
let completedGoalsCount = Object.values(allGoals).filter((goal)=> goal.completed).length
progressValue.style.width = `${completedGoalsCount /3 * 100}%`;
progressValue.firstElementChild.innerText = `${completedGoalsCount}/3 completed`
progressLable.innerText = allQoutes[completedGoalsCount]

checkBoxList.forEach((checkbox) => {
  checkbox.addEventListener("click", (e) => {
    const allGoalsAdded = [...inputFields].every((input) => {
      return input.value;
    });
    if (allGoalsAdded) {
      checkbox.parentElement.classList.toggle("completed");
      const inputId = checkbox.nextElementSibling.id
      allGoals[inputId].completed = !allGoals[inputId].completed
      completedGoalsCount = Object.values(allGoals).filter((goal)=> goal.completed).length
      progressValue.style.width = `${completedGoalsCount /3 * 100}%`;
      progressValue.firstElementChild.innerText = `${completedGoalsCount}/3 completed`
      progressLable.innerText = allQoutes[completedGoalsCount]
      localStorage.setItem("allGoals", JSON.stringify(allGoals));
    } else {
      errorMsg.style.visibility = "visible";
    }
  });
});

inputFields.forEach((input) => {
  input.value = allGoals[input.id]?.name || "";

  if (allGoals[input.id]?.completed) {
    input.parentElement.classList.add("completed");
}

  input.addEventListener("focus", () => {
    errorMsg.style.visibility = "hidden";
  });

  input.addEventListener("input", (e) => {
    if (allGoals[input.id]?.completed) {
    e.target.value = allGoals[input.id].name
    return
}
    allGoals[input.id] = { name: input.value, completed: false };
    localStorage.setItem("allGoals", JSON.stringify(allGoals));
  });
});
