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
    if (this.customUrl !== url) {
      this.customUrl = url;
      if (this.customAudio) {
        this.customAudio.src = url;
        this.customAudio.load();
      }
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
          this.customAudio.volume = 0.6;
        } else if (this.customAudio.src !== this.customUrl && !this.customAudio.src.endsWith(this.customUrl)) {
          this.customAudio.src = this.customUrl;
          this.customAudio.load();
        }
        await this.customAudio.play();
        this.isPlaying = true;
        this.onStateChange?.(true);
        return;
      } catch (e) {
        console.warn('Custom audio playback failed, falling back to romantic raag synth:', e);
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

    // Auspicious Indian Wedding Raag Melodic Scale (Raag Bhupali / Kalyan Santoor & Sitar)
    // Notes: Sa (293.66), Re (329.63), Ga (369.99), Pa (440.00), Dha (493.88), Sa' (587.33)
    const notes = [
      // Phrase 1: Graceful Ascent (Aaroh)
      293.66, 329.63, 369.99, 440.00, 493.88, 587.33,
      // Phrase 2: Gentle Traditional Cadence
      493.88, 440.00, 369.99, 329.63, 369.99, 293.66,
      // Phrase 3: Auspicious Celebratory Flow
      369.99, 440.00, 493.88, 587.33, 493.88, 440.00,
      329.63, 369.99, 440.00, 369.99, 329.63, 293.66
    ];

    let noteIdx = 0;
    const tempoMs = 520; // gentle, elegant auspicious pacing

    const playNext = () => {
      if (!this.isPlaying || !this.audioCtx) return;

      const freq = notes[noteIdx % notes.length];
      this.playPluckNote(freq);

      // occasionally play a soft tanpura/drone bass note for auspicious depth
      if (noteIdx % 6 === 0) {
        this.playPluckNote(293.66 / 2, 0.12, 2.2);
      } else if (noteIdx % 6 === 3) {
        this.playPluckNote(220.00 / 2, 0.10, 2.0);
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
