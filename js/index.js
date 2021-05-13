
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
  moveHorizontal(val) {
    this.create();
    this.x = this.x + val
  }
  getXPosition() {
    return this.x
  }
  setXPosition(position) {
    this.x = position
  }

}

//creating missile blueprint
class Missile {
  constructor(x, y, radius, color, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
  }
  create() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill()
  }
  fire() {
    this.create()
    this.x = this.x + this.velocity.x;
    this.y = this.y + this.velocity.y;
  }

}

//creating Alien
class Alien {
  constructor(x, y, radius, color, velocity) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.velocity = velocity;
  }
  create() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill()
  }
  move() {
    this.create()
    this.x = this.x + this.velocity.x;
    this.y = this.y + this.velocity.y;
  }
}

//positionaing the aircraft
const x = canvas.width / 2;
const y = canvas.height * 0.9;

//creating soacecraft
const spaceCraft = new SpaceCraft(x, y, 20, 'blue');

//storing all the missiles 
const missiles = [];

const aliens = [];
//spawning aliens
const spawnAliens = () => {
  setInterval(() => {
    const x = Math.random() * canvas.width;
    const y = 10;
    const radius = Math.random() * (30 - 5) + 5;
    const color = 'black';
    const velocity = {
      x: 0, y: 1
    }
    aliens.push(new Alien(x, y, radius, color, velocity))
    console.log(aliens)
  }, 1000)
}

/*
for each animation frame:
  1. clear the canvas
  2. create the spacecraft
  3. fire the missiles
*/
const animate = () => {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  spaceCraft.create()
  missiles.forEach((missile) => {
    missile.fire();
  })
  aliens.forEach((alien) => {
    alien.move();
  })
}

//firing the missiles continuously
const fireMissileAtInterval = setInterval(() => {
  missiles.push(new Missile(spaceCraft.getXPosition(), y - 10, 5, 'green', { x: 0, y: -2 }));
}, 250)

/*
moving spacecraft horizontally :
  1. Left Arrow Key --> Spacecraft moves 15 pixels left
  2. Right Arrow Key --> Spacecraft moves 15 pixels right
*/
addEventListener('keydown', event => {

  if (event.code === 'ArrowLeft') {
    //moving the spacecraft left
    spaceCraft.moveHorizontal(-15);

    //if spacecarft hits leftmost side, respawn the spacecraft from right side
    if (spaceCraft.getXPosition() < 1) {
      spaceCraft.setXPosition(canvas.width + 15)
    }
  } else if (event.code === 'ArrowRight') {
    //moving the spacecraft right
    spaceCraft.moveHorizontal(15);

    //if spacecarft hits rightmost side, respawn the spacecraft from left side
    if (spaceCraft.getXPosition() > canvas.width) {
      spaceCraft.setXPosition(-15)
    }
  }

})

animate()
spawnAliens();
