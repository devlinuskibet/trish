// ========================================
// Random Glitch Event Generator
// ========================================

class GlitchEngine {
  constructor() {
    this.timer = null;
  }

  init() {
    this.scheduleNextGlitch();
  }

  scheduleNextGlitch() {
    const delay = 15000 + Math.random() * 25000;
    this.timer = setTimeout(() => {
      this.triggerGlitch();
      this.scheduleNextGlitch();
    }, delay);
  }

  triggerGlitch() {
    const app = document.getElementById('app');
    if (!app) return;

    // Apply quick glitch class
    app.classList.add('active-glitch-burst');

    setTimeout(() => {
      app.classList.remove('active-glitch-burst');
    }, 300 + Math.random() * 400);
  }
}

export { GlitchEngine };
