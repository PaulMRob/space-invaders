import AsteroidController from "./AsteroidController.js"

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 900;

const background = new Image()
background.src = "images/space.png";

const asteroidController = new AsteroidController(canvas);

function game() {
    ctx.drawImage(background,0,0,canvas.width, canvas.height);
    asteroidController.draw(ctx);
}

setInterval(game, 1000/60);