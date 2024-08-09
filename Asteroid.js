export default class Asteroid {

    constructor(x, y, imageNumber) {
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 45;

        this.image = new Image()
        this.image.src = `images/asteroid-${imageNumber}.png`
    }

    draw(ctx) {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }

    move(xVelocity, yVelocity) {
        this.x += xVelocity;
        this.y += yVelocity;
    }
}