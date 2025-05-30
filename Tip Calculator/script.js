function calculateTip() {
  const bill = parseFloat(document.getElementById("bill").value);
  const people = parseInt(document.getElementById("people").value);
  const tipPercent = parseFloat(document.getElementById("tip").value);
  const resultDiv = document.getElementById("result");

  if (isNaN(bill) || isNaN(people) || people <= 0) {
    resultDiv.innerText = "Please enter valid inputs!";
    return;
  }

  const tipAmount = bill * tipPercent;
  const totalAmount = bill + tipAmount;
  const perPerson = totalAmount / people;

  resultDiv.innerHTML = `
    Total Tip: $${tipAmount.toFixed(2)}<br>
    Total Bill: $${totalAmount.toFixed(2)}<br>
    Per Person: $${perPerson.toFixed(2)}
  `;
}

// Theme toggle
const toggle = document.getElementById("toggleTheme");
const modeLabel = document.getElementById("modeLabel");

toggle.addEventListener("change", () => {
  document.body.classList.toggle("dark");
  document.body.classList.toggle("light");
  modeLabel.textContent = document.body.classList.contains("dark")
    ? "Dark Mode"
    : "Light Mode";
});
