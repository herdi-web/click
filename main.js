// ===== EXTRA STARS =====
const emojis = ["⭐", "✨", "🌟", "💫"];
for (let i = 0; i < 8; i++) {
  const s = document.createElement("div");
  s.className = "star";
  s.textContent = emojis[Math.floor(Math.random() * emojis.length)];
  s.style.top = Math.random() * 90 + "%";
  s.style.left = Math.random() * 90 + "%";
  s.style.animationDelay = Math.random() * 2 + "s";
  s.style.fontSize = 0.8 + Math.random() * 0.8 + "rem";
  document.body.appendChild(s);
}

// ===== MUSIC TOGGLE =====
const music = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");
let musicOn = false;

function toggleMusic() {
  if (musicOn) {
    music.pause();
    musicBtn.textContent = "🔇";
    musicBtn.classList.remove("playing");
  } else {
    music.play().catch(() => {});
    musicBtn.textContent = "🔊";
    musicBtn.classList.add("playing");
  }
  musicOn = !musicOn;
}

// ===== ENVELOPE OPEN =====
let opened = false;
function openEnvelope() {
  if (opened) return;
  opened = true;
  const wrapper = document.getElementById("envelopeWrapper");
  wrapper.classList.add("opening");
  setTimeout(() => {
    document.getElementById("envelopeScreen").classList.add("hide");
    document.getElementById("cardScreen").classList.add("show");
    startBalloons();
    fireConfetti();
    // Auto-play music when card opens
    if (!musicOn) {
      music
        .play()
        .then(() => {
          musicOn = true;
          musicBtn.textContent = "🔊";
          musicBtn.classList.add("playing");
        })
        .catch(() => {});
    }
  }, 800);
}

// ===== BALLOONS =====
const balloonColors = [
  "#ff4b6e",
  "#ffcc00",
  "#00d2ff",
  "#92ff48",
  "#a18cd1",
  "#fbc2eb",
  "#ff7675",
  "#74b9ff",
];
function createBalloon() {
  const b = document.createElement("div");
  b.className = "balloon";
  b.style.left = Math.random() * 100 + "vw";
  const scale = 0.8 + Math.random() * 0.5;
  b.style.transform = `scale(${scale})`;
  b.style.background =
    balloonColors[Math.floor(Math.random() * balloonColors.length)];
  const dur = 8 + Math.random() * 10;
  b.style.animationDuration = dur + "s";
  document.body.appendChild(b);
  setTimeout(() => b.remove(), dur * 1000);
}
function startBalloons() {
  setInterval(createBalloon, 300);
}

// ===== CONFETTI =====
function fireConfetti() {
  const duration = 4000,
    end = Date.now() + duration;
  const defaults = {
    startVelocity: 30,
    spread: 360,
    ticks: 60,
    zIndex: 999,
  };
  function rnd(min, max) {
    return Math.random() * (max - min) + min;
  }
  const interval = setInterval(() => {
    const tl = end - Date.now();
    if (tl <= 0) return clearInterval(interval);
    const pc = 50 * (tl / duration);
    confetti(
      Object.assign({}, defaults, {
        particleCount: pc,
        origin: { x: rnd(0.1, 0.3), y: Math.random() - 0.2 },
      }),
    );
    confetti(
      Object.assign({}, defaults, {
        particleCount: pc,
        origin: { x: rnd(0.7, 0.9), y: Math.random() - 0.2 },
      }),
    );
  }, 250);
}

// ===== GIFT PAGE =====
const petalEmojis = ["🌸", "🌺", "🌹", "🌷", "🏵️", "💐", "🌼", "✿", "❀"];
let petalInterval = null;

function createPetal() {
  const p = document.createElement("div");
  p.className = "petal";
  p.textContent = petalEmojis[Math.floor(Math.random() * petalEmojis.length)];
  p.style.left = Math.random() * 100 + "vw";
  p.style.setProperty("--drift", Math.random() * 120 - 60 + "px");
  const dur = 4 + Math.random() * 5;
  p.style.animationDuration = dur + "s";
  p.style.animationDelay = Math.random() * 2 + "s";
  p.style.fontSize = clamp(1, Math.random() * 1.5 + 0.8, 2.2) + "rem";
  document.getElementById("giftPage").appendChild(p);
  setTimeout(() => p.remove(), (dur + 2) * 1000);
}
function clamp(min, v, max) {
  return Math.max(min, Math.min(max, v));
}

function showGiftPage() {
  const gp = document.getElementById("giftPage");
  gp.classList.add("show");
  // reset bouquet animation
  const bc = document.getElementById("bouquetContainer");
  bc.style.animation = "none";
  bc.offsetHeight; // reflow
  bc.style.animation = "";
  // start petals
  if (petalInterval) clearInterval(petalInterval);
  petalInterval = setInterval(createPetal, 300);
  // burst confetti
  setTimeout(() => {
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors: ["#ff4b6e", "#ffcc00", "#ff80ab", "#ab47bc", "#f06292"],
    });
  }, 800);
}

function hideGiftPage() {
  document.getElementById("giftPage").classList.remove("show");
  if (petalInterval) {
    clearInterval(petalInterval);
    petalInterval = null;
  }
}
