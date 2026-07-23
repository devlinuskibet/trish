// ========================================
// Ambient Particle System
// Floating digital fragments
// ========================================

class ParticleSystem {
  constructor() {
    this.container = null;
    this.particles = [];
    this.maxParticles = 40;
    this.running = false;
  }

  init() {
    this.container = document.createElement('div');
    this.container.id = 'particle-container';
    this.container.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 2;
      pointer-events: none;
      overflow: hidden;
    `;
    document.getElementById('app').prepend(this.container);
    this.running = true;
    this.spawn();
  }

  spawn() {
    if (!this.running) return;

    if (this.particles.length < this.maxParticles) {
      this.createParticle();
    }

    // Spawn new particles periodically
    setTimeout(() => this.spawn(), 800 + Math.random() * 1200);
  }

  createParticle() {
    const particle = document.createElement('div');
    const size = 1 + Math.random() * 3;
    const x = Math.random() * 100;
    const duration = 8 + Math.random() * 12;
    const delay = Math.random() * 2;

    // Random particle type
    const types = ['dot', 'line', 'char'];
    const type = types[Math.floor(Math.random() * types.length)];

    const colors = ['#00ff41', '#00cc33', '#00ff41', '#00d4ff', '#ffb000'];
    const color = colors[Math.floor(Math.random() * colors.length)];

    particle.style.cssText = `
      position: absolute;
      left: ${x}%;
      bottom: -20px;
      opacity: ${0.1 + Math.random() * 0.3};
      animation: particle-float ${duration}s linear ${delay}s forwards;
      color: ${color};
      text-shadow: 0 0 6px ${color};
    `;

    if (type === 'dot') {
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.borderRadius = '50%';
      particle.style.backgroundColor = color;
      particle.style.boxShadow = `0 0 ${size * 2}px ${color}`;
    } else if (type === 'line') {
      particle.style.width = `${1}px`;
      particle.style.height = `${10 + Math.random() * 20}px`;
      particle.style.backgroundColor = color;
    } else {
      const chars = '01█▓░▒╳╬◆';
      particle.textContent = chars[Math.floor(Math.random() * chars.length)];
      particle.style.fontSize = `${8 + Math.random() * 6}px`;
      particle.style.fontFamily = 'monospace';
    }

    // Slight horizontal drift
    particle.style.setProperty('--drift', `${-20 + Math.random() * 40}px`);

    this.container.appendChild(particle);
    this.particles.push(particle);

    // Remove after animation
    setTimeout(() => {
      particle.remove();
      this.particles = this.particles.filter(p => p !== particle);
    }, (duration + delay) * 1000);
  }

  destroy() {
    this.running = false;
    if (this.container) this.container.remove();
  }
}

export { ParticleSystem };
