class SoundEngine {
  private ctx: AudioContext | null = null;
  private muted = false;
  private initialized = false;

  init() {
    if (this.initialized) return;
    try {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      this.initialized = true;
    } catch (e) {
      console.warn('Web Audio not supported');
    }
  }

  get isMuted() { return this.muted; }
  toggleMute() { this.muted = !this.muted; return this.muted; }

  private playTone(freq: number, duration: number, type: OscillatorType = 'sine', volume = 0.15, ramp = true) {
    if (!this.ctx || this.muted) return;
    if (this.ctx.state === 'suspended') this.ctx.resume();
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
    gain.gain.setValueAtTime(volume, this.ctx.currentTime);
    if (ramp) gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + duration);
  }

  private playNoise(duration: number, volume = 0.08) {
    if (!this.ctx || this.muted) return;
    if (this.ctx.state === 'suspended') this.ctx.resume();
    const bufferSize = this.ctx.sampleRate * duration;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = (Math.random() * 2 - 1) * Math.max(0, 1 - i / bufferSize);
    const source = this.ctx.createBufferSource();
    source.buffer = buffer;
    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(volume, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
    source.connect(gain);
    gain.connect(this.ctx.destination);
    source.start();
  }

  launch() {
    this.playTone(220, 0.15, 'sawtooth', 0.1);
    setTimeout(() => this.playTone(330, 0.1, 'sine', 0.08), 50);
    this.playNoise(0.08, 0.06);
  }

  bounce() {
    this.playTone(400 + Math.random() * 200, 0.1, 'sine', 0.08);
  }

  bouncyBounce() {
    this.playTone(600, 0.15, 'sine', 0.12);
    setTimeout(() => this.playTone(800, 0.1, 'sine', 0.08), 30);
  }

  collectStar() {
    this.playTone(880, 0.15, 'sine', 0.12);
    setTimeout(() => this.playTone(1100, 0.12, 'sine', 0.1), 80);
    setTimeout(() => this.playTone(1320, 0.1, 'sine', 0.08), 160);
  }

  win() {
    const notes = [523, 659, 784, 1047];
    notes.forEach((n, i) => setTimeout(() => this.playTone(n, 0.3, 'sine', 0.1), i * 120));
  }

  lose() {
    this.playTone(300, 0.3, 'sawtooth', 0.08);
    setTimeout(() => this.playTone(200, 0.4, 'sawtooth', 0.06), 200);
  }

  death() {
    this.playNoise(0.2, 0.1);
    this.playTone(150, 0.3, 'sawtooth', 0.08);
  }

  breakBlock() {
    this.playNoise(0.1, 0.08);
    this.playTone(200, 0.1, 'square', 0.05);
  }

  click() {
    this.playTone(800, 0.05, 'sine', 0.06);
  }

  portalEnter() {
    const freqs = [400, 600, 800, 1000, 1200];
    freqs.forEach((f, i) => setTimeout(() => this.playTone(f, 0.15, 'sine', 0.06), i * 40));
  }
}

export const soundEngine = new SoundEngine();
