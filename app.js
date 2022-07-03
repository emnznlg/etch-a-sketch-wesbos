const canvas = document.querySelector("#etch-a-sketch");
const ctx = canvas.getContext("2d");
const shakeBtn = document.querySelector(".shakeBtn");
let MOVE_AMOUNT = 10;

//Setup the canvas for drawing

const { width, height } = canvas;

//Creating random x and y
let randomX = Math.floor(Math.random() * width);
let randomY = Math.floor(Math.random() * height);

ctx.lineJoin = "round";
ctx.lineCap = "round";
ctx.lineWidth = 15;

let hue = 0;
ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;

ctx.beginPath();
ctx.moveTo(randomX, randomY);
ctx.lineTo(randomX, randomY);
ctx.stroke();

//write a draw function
function draw({ key }) {
  ctx.beginPath();
  ctx.moveTo(randomX, randomY);
  hue += 5;
  ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;

  switch (key) {
    case "ArrowUp":
      randomY = randomY - MOVE_AMOUNT;

      break;
    case "ArrowDown":
      randomY = randomY + MOVE_AMOUNT;
      break;
    case "ArrowRight":
      randomX = randomX + MOVE_AMOUNT;
      break;
    case "ArrowLeft":
      randomX = randomX - MOVE_AMOUNT;
      break;
  }

  ctx.lineTo(randomX, randomY);
  ctx.stroke();
}

//write a handler for the keys

function handleKey(e) {
  if (e.key.includes("Arrow")) {
    e.preventDefault();
    draw({ key: e.key });
  }
}

// Clear/shake canvas
function clearCanvas() {
  canvas.classList.add("shake");
  canvas.addEventListener(
    "animationend",
    function () {
      canvas.classList.remove("shake");
    },
    { once: true }
  );

  ctx.clearRect(0, 0, width, height);

  randomX = Math.floor(Math.random() * width);
  randomY = Math.floor(Math.random() * height);

  ctx.beginPath();
  ctx.moveTo(randomX, randomY);
  ctx.lineTo(randomX, randomY);
  ctx.stroke();
}

//listen the function
window.addEventListener("keydown", handleKey);
shakeBtn.addEventListener("click", clearCanvas);
