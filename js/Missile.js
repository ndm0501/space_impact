class Missile {
    constructor(context, x, y, radius, color, velocity) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
        this.context = context;
    }
    create() {
        this.context.beginPath();
        this.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        this.context.fillStyle = this.color;
        this.context.fill();
    }
    fire() {
        this.create()
        this.x += this.velocity.x;
        this.y += this.velocity.y;
    }
}
export default Missile;