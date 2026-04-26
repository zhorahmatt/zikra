/**
 * Sound playback using real audio clips served from /public.
 * Falls back silently if autoplay is blocked or audio is unsupported.
 */

function playAudio(src: string): void {
  if (typeof window === "undefined") return;
  try {
    const audio = new Audio(src);
    audio.volume = 0.85;
    audio.play().catch(() => {
      // Autoplay blocked — silent fail
    });
  } catch {
    // Audio not supported — silent fail
  }
}

/** Pool of clips to pick from randomly for each card completion. */
const CARD_DONE_SOUNDS = [
  "/masyaallah.mp3",
  "/alhamdulillah.mp3",
];

function playCardDone() {
  const src = CARD_DONE_SOUNDS[Math.floor(Math.random() * CARD_DONE_SOUNDS.length)];
  playAudio(src);
}

/**
 * Random sound from the pool — plays when a single-read card is marked done.
 */
export function playSingleDone() {
  playCardDone();
}

/**
 * Random sound from the pool — plays when a tasbih card reaches its repeat target.
 */
export function playTasbihDone() {
  playCardDone();
}

/**
 * Always "Alhamdulillah" — plays when all cards in the session are complete.
 */
export function playCompleteDone() {
  playAudio("/alhamdulillah.mp3");
}
