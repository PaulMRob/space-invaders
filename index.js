import AsteroidController from "./AsteroidController.js";
import Player from "./Player.js";
import BulletController from "./BulletController.js";

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 900;

const background = new Image()
background.src = "images/space.png";

const playerBulletController = new BulletController(canvas, 10, "red", true);
const asteroidBulletController = new BulletController(canvas, 4, "white", false);
const asteroidController = new AsteroidController(canvas, asteroidBulletController, playerBulletController);
const player = new Player(canvas, 3, playerBulletController);

function game() {
    ctx.drawImage(background,0,0,canvas.width, canvas.height);
    asteroidController.draw(ctx);
    player.draw(ctx);
    playerBulletController.draw(ctx);
    asteroidBulletController.draw(ctx);
}

setInterval(game, 1000/60);