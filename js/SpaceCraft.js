class SpaceCraft {
    constructor(context, x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.context = context;
    }
    create() {
        this.context.beginPath();
        this.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        this.context.fillStyle = this.color;
        this.context.fill();
    }
    moveHorizontal(val) {
        this.create();
        this.x += val;
    }
    getXPosition() {
        return this.x;
    }
    setXPosition(position) {
        this.x = position;
    }
}
export default SpaceCraft;