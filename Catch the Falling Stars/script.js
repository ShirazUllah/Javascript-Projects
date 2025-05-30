const basket = document.getElementById("basket");
const gameContainer = document.getElementById("gameContainer");
const scoreText = document.getElementById("score");
const highScoreText = document.getElementById("highScore");
const timeText = document.getElementById("time");
const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");
const resetBtn = document.getElementById("resetBtn");
const stopBtn = document.getElementById("stopBtn");
const startOverlay = document.getElementById("startOverlay");
const endOverlay = document.getElementById("endOverlay");
const finalScoreText = document.getElementById("finalScoreText");
const themeToggle = document.getElementById("themeToggle");

let score = 0;
let highScore = 0;
let timer = 60;
let interval;
let spawnInterval;
let moveDirection = 0;
let gameRunning = false;

try {
  highScore = localStorage.getItem("highScore") || 0;
} catch (e) {
  highScore = 0;
}
highScoreText.textContent = `High Score: ${highScore}`;

startBtn.addEventListener("click", startGame);
restartBtn.addEventListener("click", startGame);
resetBtn.addEventListener("click", resetGame);
stopBtn.addEventListener("click", stopGame);
themeToggle.addEventListener("click", toggleTheme);

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") moveDirection = -1;
  if (e.key === "ArrowRight") moveDirection = 1;
});
document.addEventListener("keyup", () => (moveDirection = 0));

function toggleTheme() {
  document.body.classList.toggle("dark");
  themeToggle.textContent = document.body.classList.contains("dark")
    ? "☀️"
    : "🌙";
}

function startGame() {
  score = 0;
  timer = 60;
  gameRunning = true;
  scoreText.textContent = "Score: 0";
  timeText.textContent = "Time: 60s";
  startOverlay.classList.add("hidden");
  endOverlay.classList.add("hidden");

  basket.style.left =
    gameContainer.offsetWidth / 2 - basket.offsetWidth / 2 + "px";

  interval = setInterval(() => {
    timer--;
    timeText.textContent = `Time: ${timer}s`;
    if (timer <= 0) endGame();
  }, 1000);

  spawnInterval = setInterval(spawnStar, 800);
  requestAnimationFrame(moveBasket);
}

function moveBasket() {
  if (!gameRunning) return;
  const left = parseFloat(basket.style.left) || 0;
  const speed = 5;
  let newLeft = left + moveDirection * speed;
  newLeft = Math.max(
    0,
    Math.min(newLeft, gameContainer.offsetWidth - basket.offsetWidth)
  );
  basket.style.left = newLeft + "px";
  requestAnimationFrame(moveBasket);
}

function spawnStar() {
  if (!gameRunning) return;
  const star = document.createElement("img");
  star.src = "https://cdn-icons-png.flaticon.com/512/616/616490.png";
  star.className = `star type${Math.ceil(Math.random() * 3)}`;
  star.style.left = Math.random() * (gameContainer.offsetWidth - 30) + "px";

  gameContainer.appendChild(star);

  star.addEventListener("animationend", () => {
    star.remove();
  });

  const fallInterval = setInterval(() => {
    const starRect = star.getBoundingClientRect();
    const basketRect = basket.getBoundingClientRect();
    if (
      starRect.bottom >= basketRect.top &&
      starRect.left < basketRect.right &&
      starRect.right > basketRect.left
    ) {
      score++;
      scoreText.textContent = `Score: ${score}`;
      star.remove();
      clearInterval(fallInterval);
    }
  }, 50);
}

function endGame() {
  gameRunning = false;
  clearInterval(interval);
  clearInterval(spawnInterval);
  document.querySelectorAll(".star").forEach((star) => star.remove());

  try {
    if (score > parseInt(localStorage.getItem("highScore") || "0")) {
      localStorage.setItem("highScore", score);
      highScoreText.textContent = `High Score: ${score}`;
    }
  } catch (e) {}

  finalScoreText.textContent = `You scored ${score} points!`;
  endOverlay.classList.remove("hidden");
}

function resetGame() {
  stopGame();
  score = 0;
  scoreText.textContent = "Score: 0";
  timeText.textContent = "Time: 60s";
  finalScoreText.textContent = "";
  startOverlay.classList.remove("hidden");
  endOverlay.classList.add("hidden");
}

function stopGame() {
  gameRunning = false;
  clearInterval(interval);
  clearInterval(spawnInterval);
  document.querySelectorAll(".star").forEach((star) => star.remove());
}
