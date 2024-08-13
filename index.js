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

let isGameOver = false;
let didWin = false;

function game() {
    checkGameOver();
    ctx.drawImage(background,0,0,canvas.width, canvas.height);
    displayGameOver();
    if (!isGameOver) {
        asteroidController.draw(ctx);
        player.draw(ctx);
        playerBulletController.draw(ctx);
        asteroidBulletController.draw(ctx);
    }
}

function displayGameOver(){
    if (isGameOver) {
        let text = didWin ? "You Win" : "Game Over";
        let textOffset = didWin ? 3.5 : 4;

        ctx.fillStyle = "white";
        ctx.font = "70px Arial";
        ctx.fillText(text, canvas.width / textOffset, canvas.height / 2);
    }
}

function checkGameOver() {
    if (isGameOver) {
        return;
    }

    if (asteroidBulletController.collideWith(player)) {
        isGameOver = true;
    }

    if (asteroidController.collideWith(player)) {
        isGameOver = true;
    }

    if (asteroidController.asteroidRows.length === 0) {
        didWin = true;
        isGameOver = true;
    }
}

setInterval(game, 1000/60);