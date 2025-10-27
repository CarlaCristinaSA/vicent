/* ---------------------------
   🎵 Music Player
----------------------------*/
const audio = document.getElementById('audio');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const progress = document.getElementById('progress');
const progressBar = document.getElementById('progress-bar');

let isPlaying = false;

playBtn.addEventListener('click', () => {
  if (isPlaying) {
    audio.pause();
  } else {
    audio.play();
  }
});

audio.addEventListener('play', () => {
  isPlaying = true;
  playBtn.classList.remove('fa-play');
  playBtn.classList.add('fa-pause');
});

audio.addEventListener('pause', () => {
  isPlaying = false;
  playBtn.classList.remove('fa-pause');
  playBtn.classList.add('fa-play');
});

audio.addEventListener('timeupdate', () => {
  const percent = (audio.currentTime / audio.duration) * 100;
  progressBar.style.width = percent + '%';
});

progress.addEventListener('click', (e) => {
  const rect = progress.getBoundingClientRect();
  const clickX = e.clientX - rect.left;
  const newTime = (clickX / rect.width) * audio.duration;
  audio.currentTime = newTime;
});


/* ---------------------------
   ✨ Estrelas e Meteoros
----------------------------*/
const canvas = document.getElementById('stars');
const ctx = canvas.getContext('2d');

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
});

// Estrelas pequenas
const stars = [];
const STAR_COUNT = 120;

for (let i = 0; i < STAR_COUNT; i++) {
  stars.push({
    x: Math.random() * width,
    y: Math.random() * height,
    radius: Math.random() * 1.2 + 0.3,
    speed: Math.random() * 0.2 + 0.1,
    opacity: Math.random(),
    delta: Math.random() * 0.02
  });
}

// Meteoros
const meteors = [];
const METEOR_COUNT = 5;

for (let i = 0; i < METEOR_COUNT; i++) {
  meteors.push({
    x: Math.random() * width,
    y: Math.random() * height / 2,
    length: Math.random() * 80 + 50,
    speed: Math.random() * 4 + 2,
    angle: Math.PI / 4, // diagonal
    opacity: Math.random() * 0.5 + 0.5
  });
}

function animateStars() {
  ctx.clearRect(0, 0, width, height);

  // Estrelas pequenas piscando
  stars.forEach(star => {
    star.opacity += star.delta;
    if (star.opacity > 1 || star.opacity < 0.2) star.delta *= -1;

    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
    ctx.shadowColor = 'white';
    ctx.shadowBlur = 2;
    ctx.fill();

    star.y += star.speed;
    if (star.y > height) {
      star.y = 0;
      star.x = Math.random() * width;
    }
  });

  // Meteoros
  meteors.forEach(meteor => {
    ctx.beginPath();
    ctx.moveTo(meteor.x, meteor.y);
    ctx.lineTo(
      meteor.x - meteor.length * Math.cos(meteor.angle),
      meteor.y - meteor.length * Math.sin(meteor.angle)
    );
    ctx.strokeStyle = `rgba(255,255,255,${meteor.opacity})`;
    ctx.lineWidth = 2;
    ctx.shadowColor = 'white';
    ctx.shadowBlur = 4;
    ctx.stroke();

    meteor.x += meteor.speed;
    meteor.y += meteor.speed;

    if (meteor.x - meteor.length * Math.cos(meteor.angle) > width || meteor.y - meteor.length * Math.sin(meteor.angle) > height) {
      meteor.x = Math.random() * width;
      meteor.y = -50;
      meteor.length = Math.random() * 80 + 50;
      meteor.speed = Math.random() * 4 + 2;
      meteor.opacity = Math.random() * 0.5 + 0.5;
    }
  });

  requestAnimationFrame(animateStars);
}

animateStars();
// 🎨 Canvas de pinceladas animadas (Noite Estrelada)
const canvasBrush = document.getElementById('brushstrokes');
const ctxBrush = canvasBrush.getContext('2d');

let wBrush, hBrush, strokes = [];

function resizeBrush() {
  wBrush = canvasBrush.width = window.innerWidth;
  hBrush = canvasBrush.height = window.innerHeight;
  createStrokes();
}

window.addEventListener('resize', resizeBrush);
resizeBrush();

function createStrokes() {
  strokes = [];
  const colors = [
    '#1c3a64', '#224b87', '#2e5ba8', '#3e7bc6', '#7ea7e0', '#f3c64a'
  ];
  const total = Math.floor(wBrush / 25);
  for (let i = 0; i < total; i++) {
    strokes.push({
      x: Math.random() * wBrush,
      y: Math.random() * hBrush,
      r: 20 + Math.random() * 40,
      a: Math.random() * Math.PI * 2,
      speed: 0.002 + Math.random() * 0.004,
      color: colors[Math.floor(Math.random() * colors.length)],
      offset: Math.random() * 1000
    });
  }
}

function animateBrush(time) {
  ctxBrush.clearRect(0, 0, wBrush, hBrush);
  ctxBrush.globalCompositeOperation = 'lighter';
  
  for (const s of strokes) {
    const t = (time * s.speed + s.offset) / 1000;
    const px = s.x + Math.cos(t) * 30;
    const py = s.y + Math.sin(t * 1.5) * 20;

    const grad = ctxBrush.createLinearGradient(px - s.r, py - s.r, px + s.r, py + s.r);
    grad.addColorStop(0, 'transparent');
    grad.addColorStop(0.3, s.color + '55');
    grad.addColorStop(0.7, s.color + '88');
    grad.addColorStop(1, 'transparent');

    ctxBrush.beginPath();
    ctxBrush.strokeStyle = grad;
    ctxBrush.lineWidth = 2 + Math.sin(t * 2) * 1.5;
    ctxBrush.moveTo(px - s.r, py - s.r / 2);
    ctxBrush.bezierCurveTo(px, py + s.r / 2, px + s.r / 2, py - s.r / 2, px + s.r, py + s.r / 2);
    ctxBrush.stroke();
  }

  requestAnimationFrame(animateBrush);
}

requestAnimationFrame(animateBrush);
/* ✨ Aparecimento suave da galeria */
const galleryItems = document.querySelectorAll('.gallery figure');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.2 });

galleryItems.forEach(item => observer.observe(item));
playBtn.addEventListener('click', () => {
  console.log('Play button clicked!');
  if (isPlaying) {
    audio.pause();
  } else {
    audio.play().catch(err => console.error('Erro ao tocar áudio:', err));
  }
});
