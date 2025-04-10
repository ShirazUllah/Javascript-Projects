const questionEl = document.getElementById("question");
const formEl = document.getElementById("form");
const inputEl = document.getElementById("input");
const scoreEl = document.getElementById("score");
const resetBtn = document.getElementById("resetBtn");
const feedbackEl = document.getElementById("feedback");

let score = JSON.parse(localStorage.getItem("score")) || 0;
scoreEl.innerHTML = `Score : ${score}`;

let correctAns;

generateNewQuestion();

formEl.addEventListener("submit", (e) => {
  e.preventDefault();

  const userAns = +inputEl.value;

  if (userAns === correctAns) {
    score++;
    showFeedback("✅ Correct!", true);
  } else {
    if (score > 0) score--;
    showFeedback(`❌ Incorrect! The correct answer was ${correctAns}`, false);
  }

  updateLocalStorage();
  scoreEl.innerHTML = `Score : ${score}`;
  generateNewQuestion();
});

function generateNewQuestion() {
  const num1 = Math.floor(Math.random() * 10);
  const num2 = Math.floor(Math.random() * 10);
  correctAns = num1 * num2;

  questionEl.innerHTML = `What is ${num1} multiply by ${num2} ?`;
  inputEl.value = "";
  inputEl.focus();
}

function updateLocalStorage() {
  localStorage.setItem("score", JSON.stringify(score));
}

function showFeedback(message, isCorrect) {
  feedbackEl.textContent = message;
  feedbackEl.className = isCorrect ? "feedback" : "feedback feedback incorrect";

  // Auto-hide after 2 seconds
  setTimeout(() => {
    feedbackEl.textContent = "";
    feedbackEl.className = "feedback";
  }, 2000);
}

resetBtn.addEventListener("click", () => {
  score = 0; // Set to default value
  updateLocalStorage();
  scoreEl.innerHTML = `Score : ${score}`;
  showFeedback("🔁 Score reset to 0", true);
});
