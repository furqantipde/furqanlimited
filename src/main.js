/* COCA-COLA 360° SCROLL ANIMATION ENGINE WITH RELATIVE ASSET RESOLUTION */

const TOTAL_FRAMES = 150;
const frameImages = [];

let loadedCount = 0;
let currentFrame = 0;
let targetFrame = 0;

// DOM Elements
const canvas = document.getElementById('hero-canvas');
const ctx = canvas.getContext('2d');
const preloader = document.getElementById('preloader');
const progressText = document.getElementById('progress-text');

// 1. FRAME PRELOADER WITH RELATIVE PATH SUPPORT FOR GITHUB PAGES
function getFramePath(index) {
  const numStr = String(index + 1).padStart(3, '0');
  // Use relative path ./frames/... so subpaths on GitHub Pages resolve frames correctly
  return `./frames/ezgif-frame-${numStr}.jpg`;
}

function preloadFrames() {
  for (let i = 0; i < TOTAL_FRAMES; i++) {
    const img = new Image();
    frameImages.push(img); // Push first to avoid race condition where frameImages[0] is undefined

    img.onload = () => {
      loadedCount++;
      const percent = Math.floor((loadedCount / TOTAL_FRAMES) * 100);
      if (progressText) {
        progressText.textContent = `Loading 360° Animation... ${percent}%`;
      }

      if (loadedCount === 1) {
        resizeCanvas();
        renderFrame(0);
      }

      if (loadedCount === TOTAL_FRAMES) {
        onPreloadComplete();
      }
    };
    img.onerror = (err) => {
      console.error(`Failed to load frame ${i + 1} from path: ${getFramePath(i)}`, err);
      loadedCount++;
      if (loadedCount === TOTAL_FRAMES) onPreloadComplete();
    };
    img.src = getFramePath(i); // Assign src last to trigger download safely
  }
}

function onPreloadComplete() {
  setTimeout(() => {
    preloader.classList.add('fade-out');
    resizeCanvas();
    updateTargetFromScroll();
    renderFrame(Math.round(currentFrame));
    startAnimationLoop();
  }, 200);
}

// 2. CANVAS RESPONSIVE & DRAWING ENGINE
function resizeCanvas() {
  const dpr = window.devicePixelRatio || 1;
  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;
  ctx.scale(dpr, dpr);
  renderFrame(Math.round(currentFrame));
}

function renderFrame(index) {
  const frameIdx = Math.max(0, Math.min(TOTAL_FRAMES - 1, Math.round(index)));
  const img = frameImages[frameIdx];
  if (!img || !img.complete) return;

  const canvasWidth = window.innerWidth;
  const canvasHeight = window.innerHeight;

  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  // Scaled contain math to center bottle sharply
  const imgAspect = img.naturalWidth / img.naturalHeight;
  const canvasAspect = canvasWidth / canvasHeight;

  let drawW, drawH, drawX, drawY;

  if (canvasAspect > imgAspect) {
    drawH = canvasHeight;
    drawW = drawH * imgAspect;
  } else {
    drawW = canvasWidth;
    drawH = drawW / imgAspect;
  }

  drawX = (canvasWidth - drawW) / 2;
  drawY = (canvasHeight - drawH) / 2;

  ctx.drawImage(img, drawX, drawY, drawW, drawH);
}

// 3. INERTIA LERP ANIMATION LOOP
function startAnimationLoop() {
  let lastFrameDrawn = -1;

  function loop() {
    currentFrame += (targetFrame - currentFrame) * 0.2;
    const rounded = Math.round(currentFrame);

    if (rounded !== lastFrameDrawn) {
      renderFrame(rounded);
      lastFrameDrawn = rounded;
    }

    requestAnimationFrame(loop);
  }

  loop();
}

// 4. SCROLL ENGINE SPECIFIC TO ANIMATION SCRUB TRACK & FADE OVERLAY
function updateTargetFromScroll() {
  const scrollTop = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0;
  const track = document.getElementById('anim-scroll-track');
  const trackHeight = track ? track.offsetHeight : window.innerHeight * 3;

  // Smoothly fade out header overlay on scroll
  const overlay = document.getElementById('anim-overlay-header');
  if (overlay) {
    if (scrollTop > 30) {
      overlay.classList.add('fade-out');
    } else {
      overlay.classList.remove('fade-out');
    }
  }

  if (trackHeight > 0) {
    const progress = Math.max(0, Math.min(1, scrollTop / trackHeight));
    targetFrame = progress * (TOTAL_FRAMES - 1);
  }
}

// 5. INTERSECTION OBSERVER FOR REVEAL ANIMATIONS IN CONTENT SECTION
function initIntersectionObserver() {
  const observerOptions = {
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// Event Listeners
window.addEventListener('scroll', updateTargetFromScroll, { passive: true });
window.addEventListener('wheel', updateTargetFromScroll, { passive: true });
window.addEventListener('touchmove', updateTargetFromScroll, { passive: true });
window.addEventListener('resize', resizeCanvas);

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  initIntersectionObserver();
});
preloadFrames();
