let startTime,
  updatedTime,
  difference = 0,
  timerInterval;
let running = false;

const display = document.getElementById("display");
const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");
const resetBtn = document.getElementById("reset");
const themeToggle = document.getElementById("theme-toggle");

startBtn.addEventListener("click", startTimer);
stopBtn.addEventListener("click", stopTimer);
resetBtn.addEventListener("click", resetTimer);
themeToggle.addEventListener("click", toggleTheme);

// Set default light theme
if (!document.documentElement.hasAttribute("data-theme")) {
  document.documentElement.setAttribute("data-theme", "light");
}

function startTimer() {
  if (!running) {
    startTime = new Date().getTime() - difference;
    timerInterval = setInterval(updateTimer, 1000);
    running = true;
  }
}

function stopTimer() {
  if (running) {
    clearInterval(timerInterval);
    running = false;
  }
}

function resetTimer() {
  clearInterval(timerInterval);
  running = false;
  difference = 0;
  display.textContent = "00:00:00";
}

function updateTimer() {
  updatedTime = new Date().getTime();
  difference = updatedTime - startTime;

  let hours = Math.floor(difference / (1000 * 60 * 60));
  let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((difference % (1000 * 60)) / 1000);

  display.textContent =
    (hours < 10 ? "0" + hours : hours) +
    ":" +
    (minutes < 10 ? "0" + minutes : minutes) +
    ":" +
    (seconds < 10 ? "0" + seconds : seconds);
}

function toggleTheme() {
  if (document.documentElement.getAttribute("data-theme") === "dark") {
    document.documentElement.setAttribute("data-theme", "light");
  } else {
    document.documentElement.setAttribute("data-theme", "dark");
  }
}
