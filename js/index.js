
const canvas = document.querySelector("canvas");

//create canvas context
const ctx = canvas.getContext("2d");

//setting canvas width & height
canvas.width = innerWidth;
canvas.height = innerHeight;

//creating spacecraft bluprint
class SpaceCraft {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
  }
  create() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill()
  }
}

//positionaing the aircraft
const x = canvas.width / 2;
const y = canvas.height * 0.9;

//creating soacecraft
const spaceCraft = new SpaceCraft(x, y, 20, 'blue');
spaceCraft.create()


