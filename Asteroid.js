export default class Asteroid {

    constructor(x, y, imageNumber) {
        this.x = x;
        this.y = y;
        this.width = 100;
        this.height = 95;

        this.image = new Image()
        this.image.src = `images/asteroid-${asteroidNumber}.png`
    }

    draw(ctx) {
        ctx.drawImage(this.image, this.x, this.y. this.width, this.height);
    }
}