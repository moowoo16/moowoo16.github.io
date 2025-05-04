const inputGroups = [document.getElementById("group0"), document.getElementById("group1"), document.getElementById("group2")];
const finalPrompt = document.getElementById("finalPrompt");
const progressMessage = document.getElementById("progressMessage");

let inputs = [];

let currentIndex = null;
let inputTimer = null;

function createInputBlock(i) {
  const block = document.createElement("div");
  block.classList.add("input-block");

  const input = document.createElement("input");
  input.type = "text";
  input.maxLength = 1;
  input.disabled = true;

  const button = document.createElement("button");
  button.textContent = "Unlock";
  button.disabled = true;

  button.addEventListener("click", () => {
    input.disabled = false;
    input.focus();
    button.disabled = true;
    button.classList.remove("active");

    if (inputTimer) clearTimeout(inputTimer);
    inputTimer = setTimeout(() => {
      input.disabled = true;
      progressMessage.textContent = "TOO SLOW!";
      pickNextDigit();
    }, 2000);
  });

  input.addEventListener("input", () => {
    input.disabled = true;
    clearTimeout(inputTimer);
    progressMessage.textContent = "KEEP GOING!";
    checkAllFilled();
    pickNextDigit();
  });

  block.appendChild(input);
  block.appendChild(button);


  if (i < 3) inputGroups[0].appendChild(block);
  else if (i < 6) inputGroups[1].appendChild(block);
  else inputGroups[2].appendChild(block);

  inputs.push({ input, button });
}

for (let i = 0; i < 10; i++) {
  createInputBlock(i);
}

function pickNextDigit() {
  const remaining = inputs
    .map((el, i) => (el.input.disabled && el.input.value === "") ? i : null)
    .filter(i => i !== null);

  if (remaining.length === 0) return;

  const next = remaining[Math.floor(Math.random() * remaining.length)];
  inputs[next].button.disabled = false;
  inputs[next].button.classList.add("active");
  currentIndex = next;
}

function checkAllFilled() {
  const filled = inputs.every(obj => obj.input.value !== "");
  if (filled) {
    progressMessage.textContent = "ALL DONE!";
    finalPrompt.classList.remove("hidden");
  }
}

function submitYes() {
  confetti({
    particleCount: 150,
    spread: 100,
    origin: { y: 0.6 }
  });
  finalPrompt.innerHTML = "<p>🎉 Thanks! Nice phone number. 🎉</p>";
}

function submitNo() {
  finalPrompt.classList.add("hidden");
  inputs.forEach(obj => {
    obj.input.value = "";
    obj.input.disabled = true;
    obj.button.disabled = true;
    obj.button.classList.remove("active");
  });
  progressMessage.textContent = "TRY AGAIN!";
  pickNextDigit();
}

pickNextDigit();
