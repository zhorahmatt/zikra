/**
 * Lightweight sound synthesis using Web Audio API.
 * No audio files needed — fully offline-friendly.
 */

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  try {
    return new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
  } catch {
    return null;
  }
}

/**
 * Soft single chime — for Tandai / single-read completion.
 * A decaying sine wave at ~880 Hz (A5), like a small bell tap.
 */
export function playSingleDone() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.type = "sine";
  osc.frequency.setValueAtTime(880, ctx.currentTime);
  // Slight pitch drop adds warmth
  osc.frequency.exponentialRampToValueAtTime(660, ctx.currentTime + 0.3);

  gain.gain.setValueAtTime(0.18, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);

  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.6);
  osc.onended = () => ctx.close();
}

/**
 * Two-note chime — for tasbih completion (more notes = more satisfying).
 * Plays a minor third interval: A5 + C6 staggered.
 */
export function playTasbihDone() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const playNote = (freq: number, delay: number, duration: number, vol: number) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, ctx.currentTime + delay);
    osc.frequency.exponentialRampToValueAtTime(freq * 0.75, ctx.currentTime + delay + duration);

    gain.gain.setValueAtTime(vol, ctx.currentTime + delay);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + duration);

    osc.start(ctx.currentTime + delay);
    osc.stop(ctx.currentTime + delay + duration);
  };

  // A5 → C6 → E6: ascending arpeggio
  playNote(880, 0, 0.7, 0.18);
  playNote(1047, 0.12, 0.7, 0.15);
  playNote(1319, 0.24, 0.9, 0.12);

  // Close context after all notes finish
  setTimeout(() => ctx.close(), 1500);
}

/**
 * Grand three-note ascending chord — for full session completion.
 */
export function playCompleteDone() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const playNote = (freq: number, delay: number, duration: number, vol: number) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, ctx.currentTime + delay);
    osc.frequency.exponentialRampToValueAtTime(freq * 0.8, ctx.currentTime + delay + duration);

    gain.gain.setValueAtTime(vol, ctx.currentTime + delay);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + duration);

    osc.start(ctx.currentTime + delay);
    osc.stop(ctx.currentTime + delay + duration);
  };

  // C5 → E5 → G5 → C6: major chord arpeggio
  playNote(523, 0, 1.2, 0.2);
  playNote(659, 0.15, 1.1, 0.16);
  playNote(784, 0.3, 1.0, 0.14);
  playNote(1047, 0.45, 1.2, 0.12);

  setTimeout(() => ctx.close(), 2000);
}
