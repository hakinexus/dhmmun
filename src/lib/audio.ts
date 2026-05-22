/**
 * Highly polished client-side Web Audio API Sound Synthesizer
 * Provides flawless, instant, and latency-free dynamic audio feedback.
 * No static file loads, preventing asset-loading or CORS failures.
 */

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  
  // Try to resume if it was suspended (due to browser autoplay restrictions)
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  
  return audioCtx;
}

export const feedbackSounds = {
  /**
   * Tactile low-frequency button click feedback
   * 35Hz – 120Hz frequency range, 35ms - 50ms duration sweep
   */
  click: () => {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();

      osc.connect(gainNode);
      gainNode.connect(ctx.destination);

      const now = ctx.currentTime;

      // Pure low frequency tactile sweep
      osc.type = 'sine';
      osc.frequency.setValueAtTime(115, now);
      // Sweep down to 38Hz over 40 milliseconds for heavy physical weight
      osc.frequency.exponentialRampToValueAtTime(38, now + 0.04);

      // Volume envelope to prevent click clicks or popping noise
      gainNode.gain.setValueAtTime(0, now);
      gainNode.gain.linearRampToValueAtTime(0.45, now + 0.004);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);

      osc.start(now);
      osc.stop(now + 0.04);
    } catch (e) {
      // Graceful degradation for browsers blocking audio
    }
  },

  /**
   * Highly polished diplomatic validation / milestone sound
   * Uses low-frequency warm slide + subtle high harmonic chime to indicate clearance
   */
  success: () => {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;

      // 1. Primary warm low glide
      const lowOsc = ctx.createOscillator();
      const lowGain = ctx.createGain();
      lowOsc.connect(lowGain);
      lowGain.connect(ctx.destination);

      lowOsc.type = 'sine';
      lowOsc.frequency.setValueAtTime(130, now);
      lowOsc.frequency.exponentialRampToValueAtTime(45, now + 0.15);

      lowGain.gain.setValueAtTime(0, now);
      lowGain.gain.linearRampToValueAtTime(0.5, now + 0.012);
      lowGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.15);

      lowOsc.start(now);
      lowOsc.stop(now + 0.15);

      // 2. High validation chime (perfect fifth/octave harmony)
      const highOsc = ctx.createOscillator();
      const highGain = ctx.createGain();
      highOsc.connect(highGain);
      highGain.connect(ctx.destination);

      highOsc.type = 'sine';
      highOsc.frequency.setValueAtTime(440, now + 0.015);
      highOsc.frequency.setValueAtTime(659.25, now + 0.05); // E5 perfect fifth chime

      highGain.gain.setValueAtTime(0, now);
      highGain.gain.linearRampToValueAtTime(0.08, now + 0.03);
      highGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.22);

      highOsc.start(now);
      highOsc.stop(now + 0.22);
    } catch (e) {
      // Graceful degradation
    }
  },

  /**
   * Validation warning sound - subtle, low-frequency dull buzz
   */
  error: () => {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const filter = ctx.createBiquadFilter();
      const gainNode = ctx.createGain();

      osc.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(ctx.destination);

      // Soft filtered low-frequency triangle buzz
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(80, now);
      osc.frequency.linearRampToValueAtTime(55, now + 0.14);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(110, now);

      gainNode.gain.setValueAtTime(0, now);
      gainNode.gain.linearRampToValueAtTime(0.25, now + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.14);

      osc.start(now);
      osc.stop(now + 0.14);
    } catch (e) {
      // Graceful degradation
    }
  }
};
