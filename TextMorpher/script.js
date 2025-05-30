function transform(type) {
  const text = document.getElementById("textInput").value;
  let result = "";

  switch (type) {
    case "upper":
      result = text.toUpperCase();
      break;
    case "lower":
      result = text.toLowerCase();
      break;
    case "capitalize":
      result = text.replace(/\b\w/g, (char) => char.toUpperCase());
      break;
    case "reverse":
      result = text.split("").reverse().join("");
      break;
    case "words":
      const count = text.trim().split(/\s+/).length;
      result = `Total words: ${count}`;
      break;
  }

  animateOutput(result);
}

function animateOutput(content) {
  const output = document.getElementById("output");
  output.classList.remove("animate");
  void output.offsetWidth; // Force reflow
  output.textContent = content;
  output.classList.add("animate");
}

function toggleTheme() {
  const body = document.body;
  const icon = document.getElementById("theme-icon");
  body.classList.toggle("dark");
  body.classList.toggle("light");
  icon.textContent = body.classList.contains("dark") ? "🌙" : "🌞";
}

function speakText() {
  const text = document.getElementById("output").textContent;
  if ("speechSynthesis" in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
  } else {
    alert("Text-to-Speech is not supported.");
  }
}

function copyText() {
  const output = document.getElementById("output").textContent;
  navigator.clipboard.writeText(output).then(() => {
    alert("Copied to clipboard!");
  });
}

function clearFields() {
  document.getElementById("textInput").value = "";
  animateOutput("");
  updateCharCount();
}

function downloadText() {
  const output = document.getElementById("output").textContent;
  const blob = new Blob([output], { type: "text/plain" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "output.txt";
  link.click();
}

function updateCharCount() {
  const text = document.getElementById("textInput").value;
  document.getElementById(
    "charCount"
  ).textContent = `Characters: ${text.length}`;
}

document.getElementById("textInput").addEventListener("input", () => {
  const text = document.getElementById("textInput").value;
  animateOutput(text);
  updateCharCount();
});
