import Asteroid from "./Asteroid.js";
export default class AsteroidController {

    asteroidMap = [
        [1,1,1,1],
        [2,2,2,2],
        [3,3,3,3],
        [4,4,4,4],
    ];
    asteroidRows = [];

    constructor(canvas) {
        this.canvas = canvas;
        this.createAsteroids();
    }

    draw(ctx) {
        this.drawAsteroids(ctx);
    }

    drawAsteroids() {
        this.asteroidRows.flat().forEach((asteroid) => {
            asteroid.draw(ctx);
        });
    }

    createAsteroids() {
        this.asteroidMap.forEach((row, rowIndex) => {
            this.asteroidRows[rowIndex] = [];
            row.forEach((asteroidNumber, asteroidIndex) => {
                if ( asteroidNumber > 0 ) {
                    this.asteroidRows[rowIndex].push(
                        new Asteroid(asteroidIndex * 50, rowIndex * 35, asteroidNumber)
                    );
                }
            });
        });
    }
}