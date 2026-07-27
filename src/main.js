/* COCA-COLA 360° SCROLL ANIMATION ENGINE WITH RELATIVE ASSET RESOLUTION */

// 0. PROTOCOL & ENVIRONMENT DIAGNOSTICS
if (window.location.protocol === 'file:') {
  document.addEventListener('DOMContentLoaded', () => {
    const warningDiv = document.createElement('div');
    warningDiv.style.position = 'fixed';
    warningDiv.style.inset = '0';
    warningDiv.style.backgroundColor = '#bc0005';
    warningDiv.style.color = '#ffffff';
    warningDiv.style.zIndex = '100000';
    warningDiv.style.display = 'flex';
    warningDiv.style.flexDirection = 'column';
    warningDiv.style.alignItems = 'center';
    warningDiv.style.justifyContent = 'center';
    warningDiv.style.fontFamily = 'sans-serif';
    warningDiv.style.padding = '40px';
    warningDiv.style.textAlign = 'center';
    
    warningDiv.innerHTML = `
      <h1 style="font-size: 2.5rem; margin-bottom: 20px; font-weight: bold;">Local File Protocol Detected</h1>
      <p style="font-size: 1.2rem; max-width: 600px; margin-bottom: 30px; line-height: 1.6;">
        You opened this page directly from your file system. Modern browsers block module loading and canvas drawing over the <strong>file://</strong> protocol for security reasons.
      </p>
      <div style="background-color: rgba(0,0,0,0.2); padding: 20px; border-radius: 10px; font-family: monospace; text-align: left; max-width: 500px; width: 100%;">
        <strong>To view this page locally:</strong><br>
        1. Open your terminal in this project directory.<br>
        2. Run: <span style="background: #000; color: #fff; padding: 2px 6px; border-radius: 4px;">npm run dev</span><br>
        3. Open the URL shown in your terminal (usually <span style="background: #000; color: #fff; padding: 2px 6px; border-radius: 4px;">http://localhost:3000/</span>).
      </div>
    `;
    document.body.appendChild(warningDiv);
  });
}

const TOTAL_FRAMES = 150;
const frameImages = [];

let loadedCount = 0;
let currentFrame = 0;
let targetFrame = 0;
let baseFramePath = './frames/';
let failedLoads = 0;

// DOM Elements
const canvas = document.getElementById('hero-canvas');
const ctx = canvas.getContext('2d');
const preloader = document.getElementById('preloader');
const progressText = document.getElementById('progress-text');

// 1. FRAME PATH RESOLVER & DYNAMIC DETECTOR
function getFramePath(index) {
  const numStr = String(index + 1).padStart(3, '0');
  return `${baseFramePath}ezgif-frame-${numStr}.jpg`;
}

function detectBaseFramePath() {
  return new Promise((resolve) => {
    // Try primary path first
    const testImg = new Image();
    testImg.onload = () => {
      baseFramePath = './frames/';
      resolve();
    };
    testImg.onerror = () => {
      // Try fallback to public/frames/
      const fallbackImg = new Image();
      fallbackImg.onload = () => {
        baseFramePath = './public/frames/';
        resolve();
      };
      fallbackImg.onerror = () => {
        // Default to standard
        baseFramePath = './frames/';
        resolve();
      };
      fallbackImg.src = './public/frames/ezgif-frame-001.jpg';
    };
    testImg.src = './frames/ezgif-frame-001.jpg';
  });
}

function preloadFrames() {
  for (let i = 0; i < TOTAL_FRAMES; i++) {
    const img = new Image();
    frameImages.push(img); // Push first to avoid race condition where frameImages[0] is undefined

    img.onload = () => {
      loadedCount++;
      const percent = Math.floor((loadedCount / TOTAL_FRAMES) * 100);
      updateLoadingProgress(percent);

      if (loadedCount === 1) {
        resizeCanvas();
        renderFrame(0);
      }

      if (loadedCount === TOTAL_FRAMES) {
        onPreloadComplete();
      }
    };

    img.onerror = (err) => {
      failedLoads++;
      console.error(`Failed to load frame ${i + 1} from path: ${getFramePath(i)}`, err);
      loadedCount++;
      
      const percent = Math.floor((loadedCount / TOTAL_FRAMES) * 100);
      updateLoadingProgress(percent);

      if (loadedCount === TOTAL_FRAMES) {
        onPreloadComplete();
      }
    };

    img.src = getFramePath(i); // Assign src last to trigger download safely
  }
}

function updateLoadingProgress(percent) {
  if (progressText) {
    if (failedLoads > 0) {
      progressText.innerHTML = `Loading 360° Animation... ${percent}%<br><span style="color:#ff8b8b; font-size:11px;">(${failedLoads} frames failed to load)</span>`;
    } else {
      progressText.textContent = `Loading 360° Animation... ${percent}%`;
    }
  }
}

function onPreloadComplete() {
  setTimeout(() => {
    preloader.classList.add('fade-out');
    
    if (failedLoads === TOTAL_FRAMES) {
      showLoadErrorOverlay();
    } else {
      resizeCanvas();
      updateTargetFromScroll();
      renderFrame(Math.round(currentFrame));
      startAnimationLoop();
    }
  }, 200);
}

function showLoadErrorOverlay() {
  const errorCard = document.createElement('div');
  errorCard.style.position = 'absolute';
  errorCard.style.top = '50%';
  errorCard.style.left = '50%';
  errorCard.style.transform = 'translate(-50%, -50%)';
  errorCard.style.backgroundColor = 'rgba(26, 26, 26, 0.95)';
  errorCard.style.color = '#ffffff';
  errorCard.style.padding = '30px';
  errorCard.style.borderRadius = '16px';
  errorCard.style.border = '1px solid #bc0005';
  errorCard.style.textAlign = 'center';
  errorCard.style.zIndex = '50';
  errorCard.style.maxWidth = '400px';
  errorCard.style.boxShadow = '0 20px 40px rgba(0,0,0,0.5)';
  errorCard.style.fontFamily = 'sans-serif';
  
  errorCard.innerHTML = `
    <span class="material-symbols-outlined" style="font-size: 3rem; color: #bc0005; display: block; margin-bottom: 15px;">warning</span>
    <h3 style="font-size: 1.3rem; font-weight: bold; margin-bottom: 10px;">Failed to Load Frames</h3>
    <p style="font-size: 0.9rem; color: rgba(255,255,255,0.7); line-height: 1.5; margin-bottom: 15px;">
      The 360° scroll animation frames could not be resolved from <code>${baseFramePath}</code>.
    </p>
    <div style="font-size: 0.8rem; background: #000; padding: 10px; border-radius: 6px; font-family: monospace; text-align: left; overflow-x: auto;">
      Checked paths:<br>
      - ./frames/<br>
      - ./public/frames/
    </div>
  `;
  document.querySelector('.canvas-fixed-viewport').appendChild(errorCard);
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
  if (!img || !img.complete || img.naturalWidth === 0) return;

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
  detectBaseFramePath().then(() => {
    preloadFrames();
  });
});
