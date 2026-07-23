// ========================================
// Matrix Rain Canvas Background
// ========================================

const MATRIX_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()_+-=[]{}|;:,.<>?/~`';

class MatrixRain {
  constructor() {
    this.canvas = document.createElement('canvas');
    this.canvas.id = 'matrix-canvas';
    this.ctx = this.canvas.getContext('2d');
    this.columns = [];
    this.fontSize = 14;
    this.running = false;

    this.canvas.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
      pointer-events: none;
      opacity: 0.15;
    `;
  }

  init() {
    document.getElementById('app').prepend(this.canvas);
    this.resize();
    window.addEventListener('resize', () => this.resize());
    this.running = true;
    this.animate();
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    const columnCount = Math.floor(this.canvas.width / this.fontSize);
    this.columns = new Array(columnCount).fill(0).map(() =>
      Math.floor(Math.random() * this.canvas.height / this.fontSize)
    );
  }

  animate() {
    if (!this.running) return;

    // Semi-transparent black to create fade trail
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.fillStyle = '#00ff41';
    this.ctx.font = `${this.fontSize}px monospace`;

    for (let i = 0; i < this.columns.length; i++) {
      const char = MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)];
      const x = i * this.fontSize;
      const y = this.columns[i] * this.fontSize;

      // Random brightness variation
      const brightness = Math.random();
      if (brightness > 0.95) {
        this.ctx.fillStyle = '#ffffff'; // occasional bright white
      } else if (brightness > 0.7) {
        this.ctx.fillStyle = '#00ff41'; // bright green
      } else {
        this.ctx.fillStyle = '#00cc33'; // dim green
      }

      this.ctx.fillText(char, x, y);

      // Reset column when it reaches bottom (with randomness)
      if (y > this.canvas.height && Math.random() > 0.975) {
        this.columns[i] = 0;
      }

      this.columns[i]++;
    }

    requestAnimationFrame(() => this.animate());
  }

  destroy() {
    this.running = false;
    this.canvas.remove();
  }
}

export { MatrixRain };
