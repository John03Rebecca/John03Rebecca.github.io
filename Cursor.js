const canvas = document.getElementById('cursorCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

let particlesArray = [];

const mouse = {
  x: undefined,
  y: undefined
};

window.addEventListener('mousemove', e => {
  mouse.x = e.x;
  mouse.y = e.y;

  for (let i = 0; i < 5; i++) {
    particlesArray.push(new Particle());
  }
});

window.addEventListener('click', e => {
  mouse.x = e.x;
  mouse.y = e.y;

  for (let i = 0; i < 20; i++) {
    particlesArray.push(new Particle(true));
  }
});

class Particle {
  constructor(isBurst = false) {
    this.x = mouse.x;
    this.y = mouse.y;
    this.size = Math.random() * 5 + 1;
    this.speedX = (Math.random() - 0.5) * (isBurst ? 10 : 2);
    this.speedY = (Math.random() - 0.5) * (isBurst ? 10 : 2);
    this.color = `hsl(${Math.random() * 360}, 100%, 70%)`;
    this.life = 100;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.size *= 0.95;
    this.life--;
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.globalAlpha = this.life / 100;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particlesArray.forEach((particle, index) => {
    particle.update();
    particle.draw();
    if (particle.size < 0.5 || particle.life <= 0) {
      particlesArray.splice(index, 1);
    }
  });

  requestAnimationFrame(animate);
}

animate();
