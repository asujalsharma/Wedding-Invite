// Romantic Acoustic Piano / Harp Web Audio Synthesizer + Audio URL Player
class WeddingMusicManager {
  private audioCtx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private timerId: any = null;
  private customAudio: HTMLAudioElement | null = null;
  private customUrl: string = '';
  private onStateChange: ((playing: boolean) => void) | null = null;

  constructor() {
    // Lazy init on first user interaction
  }

  public setListener(cb: (playing: boolean) => void) {
    this.onStateChange = cb;
  }

  public setCustomUrl(url: string) {
    this.customUrl = url;
    if (this.customAudio) {
      this.customAudio.src = url;
    }
  }

  public async toggle(): Promise<boolean> {
    if (this.isPlaying) {
      this.pause();
      return false;
    } else {
      await this.play();
      return true;
    }
  }

  public async play(): Promise<void> {
    if (this.isPlaying) return;

    if (this.customUrl) {
      try {
        if (!this.customAudio) {
          this.customAudio = new Audio(this.customUrl);
          this.customAudio.loop = true;
          this.customAudio.volume = 0.5;
        }
        await this.customAudio.play();
        this.isPlaying = true;
        this.onStateChange?.(true);
        return;
      } catch (e) {
        console.warn('Custom audio playback failed, falling back to romantic piano synth:', e);
      }
    }

    // Romantic Web Audio Arpeggio Synthesizer
    try {
      if (!this.audioCtx) {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        this.audioCtx = new AudioContextClass();
      }

      if (this.audioCtx.state === 'suspended') {
        await this.audioCtx.resume();
      }

      this.isPlaying = true;
      this.onStateChange?.(true);
      this.startRomanticMelody();
    } catch (err) {
      console.error('Audio initialization error:', err);
    }
  }

  public pause(): void {
    this.isPlaying = false;
    if (this.customAudio) {
      this.customAudio.pause();
    }
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
    this.onStateChange?.(false);
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  private startRomanticMelody() {
    if (!this.audioCtx || !this.isPlaying) return;

    // Peaceful Romantic Piano Melody (Key of D Major / Canon in D inspired romantic arpeggios)
    // Frequencies in Hz for soft music box / piano tone
    const notes = [
      // Phrase 1: D Major arpeggio
      293.66, 369.99, 440.00, 587.33,
      // A Major
      220.00, 329.63, 440.00, 554.37,
      // B Minor
      246.94, 369.99, 440.00, 493.88,
      // F# Minor
      185.00, 277.18, 369.99, 440.00,
      // G Major
      196.00, 293.66, 392.00, 493.88,
      // D Major
      220.00, 293.66, 369.99, 440.00,
      // G Major / Em
      196.00, 246.94, 329.63, 392.00,
      // A7 romantic resolution
      220.00, 277.18, 329.63, 440.00
    ];

    let noteIdx = 0;
    const tempoMs = 520; // gentle, elegant romantic pacing

    const playNext = () => {
      if (!this.isPlaying || !this.audioCtx) return;

      const freq = notes[noteIdx % notes.length];
      this.playPluckNote(freq);

      // occasionally play a bass note for warmth
      if (noteIdx % 4 === 0) {
        this.playPluckNote(freq / 2, 0.12, 1.8);
      }

      noteIdx++;
      this.timerId = setTimeout(playNext, tempoMs);
    };

    playNext();
  }

  private playPluckNote(freq: number, gainVal: number = 0.08, durationSec: number = 1.2) {
    if (!this.audioCtx) return;

    const ctx = this.audioCtx;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    // Gentle mellow wave (sine + subtle triangle overtone)
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    // Warm envelope
    gain.gain.setValueAtTime(0.001, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(gainVal, ctx.currentTime + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + durationSec);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + durationSec + 0.1);
  }
}

export const weddingMusic = new WeddingMusicManager();
