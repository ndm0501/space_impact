
const canvas = document.querySelector("canvas");

//create canvas context
const ctx = canvas.getContext("2d");

//setting canvas width & height
canvas.width = innerWidth;
canvas.height = innerHeight;

//html elements
const scoreValue = document.querySelector('.score-value');
const playGameBtn = document.querySelector('#play-game');
const scoreCard = document.querySelector('#scoreCard');
const scoreCardValue = document.querySelector('.your-score-value');

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
    ctx.fill();
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
    ctx.fill();
  }
  fire() {
    this.create()
    this.x += this.velocity.x;
    this.y += this.velocity.y;
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
    ctx.fill();
  }
  move() {
    this.create()
    this.x += this.velocity.x;
    this.y += this.velocity.y;
  }
}


//Game Over Flag
let isGameOver = false;

//positionaing the aircraft
const spaceCraftX = canvas.width / 2;
const milkyWayEntry = canvas.height * 0.9;

//creating soacecraft
let spaceCraft = new SpaceCraft(spaceCraftX, milkyWayEntry, 20, 'white');

//storing all the missiles & aliens
let missiles = [];
let aliens = [];

//(re)initializing
const init = () => {
  spaceCraft = new SpaceCraft(spaceCraftX, milkyWayEntry, 20, 'white');
  missiles = [];
  aliens = [];
  isGameOver = false;
  score = 0;
  scoreCardValue.innerHTML = score;
  scoreValue.innerHTML = score;
}

//spawning aliens
const spawnAliens = () => {

  const alienSpawnInterval = setInterval(() => {
    if (!isGameOver) {
      const x = Math.random() * canvas.width;
      const y = 10;
      const radius = Math.random() * (30 - 20) + 20;
      const color = `hsl(${Math.random() * 360}, 50%, 50%)`;
      const velocity = {
        x: 0, y: 1
      };
      aliens.push(new Alien(x, y, radius, color, velocity));
    } else {
      clearInterval(alienSpawnInterval);
    }
  }, 1000);
}

/*
for each animation frame:
  1. clear the canvas
  2. create the spacecraft
  3. fire the missiles
*/
let animationFrame;
let score = 0;
const animate = () => {
  animationFrame = requestAnimationFrame(animate);
  ctx.fillStyle = 'rgba(3, 3, 3, 0.1)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  spaceCraft.create();
  missiles.forEach((missile, missileIndex) => {
    missile.fire();
    if (missile.y - missile.radius < 0) {
      setTimeout(() => {
        missiles.splice(missileIndex, 1)
      }, 0)
    }
  });
  aliens.forEach((alien, alienIndex) => {
    alien.move();

    const diffY = spaceCraft.y - alien.y;
    const diffX = spaceCraft.x - alien.x;
    const distAlientToSpaceCraft = Math.hypot(diffY, diffX);

    /*
    It's Game Over if:
      1. Alien collides with spacecraft
      2. Alien crosses the milky way entrance
    */
    if ((distAlientToSpaceCraft - spaceCraft.radius - alien.radius < 1) || (alien.y >= milkyWayEntry)) {
      cancelAnimationFrame(animationFrame);
      isGameOver = true;
      //show score card
      scoreCard.style.display = 'flex';
      scoreCardValue.innerHTML = score;
      playGameBtn.innerHTML = 'Restart Game';
    }

    //check for distance between each alien and each missile
    //update the score
    //remove the missile(s) and alien(s) colliding
    missiles.forEach((missile, missileIndex) => {
      const diffY = (missile.y - alien.y);
      const diffX = missile.x - alien.x;
      const distAlienToMissile = Math.hypot(diffY, diffX);
      if (distAlienToMissile - missile.radius - alien.radius < 1) {

        if (alien.radius > 20) {

          //increase score for hitting the alien
          score += 100;
          scoreValue.innerHTML = score;

          alien.radius -= 10;
          setTimeout(() => {
            missiles.splice(missileIndex, 1);
          }, 0);
        } else {

          //add bonus score for killing the alien
          score += 250;
          scoreValue.innerHTML = score;

          setTimeout(() => {
            aliens.splice(alienIndex, 1);
            missiles.splice(missileIndex, 1);
          }, 0);
        }
      }
    })
  })
}

//firing the missiles continuously
const fireMissileAtInterval = setInterval(() => {
  missiles.push(new Missile(spaceCraft.getXPosition(), milkyWayEntry - 10, 5, 'orangered', { x: 0, y: -5 }));
}, 250);

/*
moving spacecraft horizontally :
  1. Left Arrow Key --> Spacecraft moves 15 pixels left
  2. Right Arrow Key --> Spacecraft moves 15 pixels right
*/
addEventListener('keydown', event => {

  if (event.code === 'ArrowLeft' && !isGameOver) {
    //moving the spacecraft left
    spaceCraft.moveHorizontal(-20);

    //if spacecarft hits leftmost side, respawn the spacecraft from right side
    if (spaceCraft.getXPosition() < 1) {
      spaceCraft.setXPosition(canvas.width + 15);
    }
  } else if (event.code === 'ArrowRight' && !isGameOver) {
    //moving the spacecraft right
    spaceCraft.moveHorizontal(20);

    //if spacecarft hits rightmost side, respawn the spacecraft from left side
    if (spaceCraft.getXPosition() > canvas.width) {
      spaceCraft.setXPosition(-15);
    }
  }

})

playGameBtn.addEventListener('click', () => {
  init();
  scoreCard.style.display = 'none';
  animate();
  spawnAliens();
});
