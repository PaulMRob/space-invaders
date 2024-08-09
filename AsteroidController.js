import Asteroid from "./Asteroid.js";
import MovingDirection from "./MovingDirection.js";

export default class AsteroidController {

    asteroidMap = [
        [1,1,1,1,1,1],
        [2,2,2,2,2,2],
        [3,3,3,3,3,3],
        [4,4,4,4,4,4],
    ];
    asteroidRows = [];

    currentDirection = MovingDirection.right;
    xVelocity = 0;
    yVelocity = 0;
    defaultXVelocity = 1;
    defaultYVelocity = 1;
    moveDownTimerDefault = 30;
    moveDownTimer = this.moveDownTimerDefault; 
    fireBulletTimerDefault = 100;
    fireBulletTimer = this.fireBulletTimerDefault;

    constructor(canvas, asteroidBulletController, playerBulletController) {
        this.canvas = canvas;
        this.asteroidBulletController = asteroidBulletController;
        this.playerBulletController = playerBulletController;
        this.createAsteroids();
    }

    draw(ctx) {
        this.decrementMoveDownTimer();
        this.updateVelocityAndDirection();
        this.collisionDetection();
        this.drawAsteroids(ctx);
        this.resetMoveDownTimer();
        this.fireBullet();
    }

    collisionDetection() {
        this.asteroidRows.forEach(asteroidRow => {
            asteroidRow.forEach((asteroid, asteroidIndex) =>{
                if(this.playerBulletController.collideWith(asteroid)) {
                    //play a sound
                    asteroidRow.splice(asteroidIndex, 1);
                }
            })
        }) 

        this.asteroidRows = this.asteroidRows.filter((asteroidRow) => asteroidRow.length > 0)
    }

    fireBullet() {
        this.fireBulletTimer --;
        if (this.fireBulletTimer <= 0) {
            this.fireBulletTimer = this.fireBulletTimerDefault;
            const allAsteroids = this.asteroidRows.flat();
            const asteroidIndex = Math.floor(Math.random() * allAsteroids.length);
            const asteroid = allAsteroids[asteroidIndex];
            this.asteroidBulletController.shoot(asteroid.x, asteroid.y, -3);
        }
    }

    resetMoveDownTimer() {
        if (this.moveDownTimer <= 0) {
            this.moveDownTimer = this .moveDownTimerDefault;
        }
    }

    decrementMoveDownTimer() {
        if (
            this.currentDirection === MovingDirection.downLeft ||
            this.currentDirection === MovingDirection.downRight
        ) {
            this.moveDownTimer--;
        }
    }

    updateVelocityAndDirection() {
        for ( const asteroidRow of this.asteroidRows ) {
            if ( this.currentDirection == MovingDirection.right ) {
                this.xVelocity = this.defaultXVelocity;
                this.yVelocity = 0;
                const rightMostAsteroid = asteroidRow[asteroidRow.length -1];
                if (rightMostAsteroid.x + rightMostAsteroid.width >= this.canvas.width) {
                    this.currentDirection = MovingDirection.downLeft;
                    break;
                }
            } else if (this.currentDirection === MovingDirection.downLeft) {
                if (this.moveDown(MovingDirection.left)) {
                    break;
                }
            } else if (this.currentDirection === MovingDirection.left) {
                this.xVelocity = -this.defaultXVelocity;
                this.yVelocity = 0;
                const leftMostAsteroid = asteroidRow[0];
                if (leftMostAsteroid.x <= 0) {
                    this.currentDirection = MovingDirection.downRight;
                    break;
                }
            } else if (this.currentDirection === MovingDirection.downRight) {
                if (this.moveDown(MovingDirection.right)) {
                    break;
                }
            }
        }
    }

    moveDown(newDirection) {
        this.xVelocity = 0;
        this.yVelocity = this.defaultYVelocity;
        if (this.moveDownTimer <= 0) {
            this.currentDirection = newDirection;
            return true;
        }
        return false;
    }

    drawAsteroids(ctx) {
        this.asteroidRows.flat().forEach((asteroid) => {
            asteroid.move(this.xVelocity, this.yVelocity);
            asteroid.draw(ctx);
        });
    }

    createAsteroids() {
        this.asteroidMap.forEach((row, rowIndex) => {
            this.asteroidRows[rowIndex] = [];
            row.forEach((asteroidNumber, asteroidIndex) => {
                if ( asteroidNumber > 0 ) {
                    this.asteroidRows[rowIndex].push(
                        new Asteroid(asteroidIndex * 100, rowIndex * 100, asteroidNumber)
                    );
                }
            });
        });
    }
}