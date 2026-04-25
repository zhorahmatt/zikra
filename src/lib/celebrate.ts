import confetti from "canvas-confetti";

// Sage green palette for confetti
const COLORS = ["#4a6741", "#c2e4b4", "#334f2b", "#8fb889", "#e8f5e2", "#f4c842"];

/**
 * Light burst — for single dzikir "Selesai" click
 */
export function celebrateSingle(originEl?: HTMLElement | null) {
  const origin = originEl
    ? getOrigin(originEl)
    : { x: 0.5, y: 0.6 };

  confetti({
    particleCount: 60,
    spread: 70,
    origin,
    colors: COLORS,
    startVelocity: 28,
    gravity: 0.9,
    scalar: 0.9,
    ticks: 160,
  });

  // Haptic
  navigator.vibrate?.([10, 30, 10]);
}

/**
 * Big shower — for tasbih counter reaching target
 */
export function celebrateTasbih(originEl?: HTMLElement | null) {
  const origin = originEl
    ? getOrigin(originEl)
    : { x: 0.5, y: 0.7 };

  // First burst
  confetti({
    particleCount: 80,
    spread: 90,
    origin,
    colors: COLORS,
    startVelocity: 35,
    gravity: 0.85,
    scalar: 1.0,
    ticks: 200,
  });

  // Delayed second burst from sides
  setTimeout(() => {
    confetti({
      particleCount: 40,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.7 },
      colors: COLORS,
      startVelocity: 30,
      ticks: 180,
    });
    confetti({
      particleCount: 40,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.7 },
      colors: COLORS,
      startVelocity: 30,
      ticks: 180,
    });
  }, 150);

  // Haptic pattern
  navigator.vibrate?.([15, 40, 15, 40, 30]);
}

/**
 * Grand finale — all dzikir in the session completed
 */
export function celebrateComplete() {
  const duration = 2000;
  const end = Date.now() + duration;

  const frame = () => {
    confetti({
      particleCount: 5,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: COLORS,
    });
    confetti({
      particleCount: 5,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: COLORS,
    });
    if (Date.now() < end) requestAnimationFrame(frame);
  };

  frame();
  navigator.vibrate?.([20, 60, 20, 60, 20, 60, 50]);
}

function getOrigin(el: HTMLElement): { x: number; y: number } {
  const rect = el.getBoundingClientRect();
  return {
    x: (rect.left + rect.width / 2) / window.innerWidth,
    y: (rect.top + rect.height / 2) / window.innerHeight,
  };
}
