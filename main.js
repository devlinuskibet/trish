// ========================================
// SHADOW-7 SANDBOX TERMINAL
// Site compromised. Containment active.
// ========================================

import { MatrixRain } from './matrix.js';
import { ParticleSystem } from './particles.js';
import { Terminal } from './terminal.js';

const matrixRain = new MatrixRain();
const particleSystem = new ParticleSystem();

// Boot sequence messages
const BOOT_SEQUENCE = [
  { text: 'BIOS v3.7.1 ... OK', delay: 100, color: 'var(--text-secondary)' },
  { text: 'Memory check: 65536K ... OK', delay: 200, color: 'var(--text-secondary)' },
  { text: 'Loading kernel modules ...', delay: 300, color: 'var(--text-secondary)' },
  { text: '', delay: 100 },
  { text: '██████████████████████████████ 100%', delay: 400, color: 'var(--neon-green-dim)' },
  { text: '', delay: 100 },
  { text: '[ WARNING ] Anomalous process detected in sector 7G', delay: 500, color: 'var(--terminal-amber)' },
  { text: '[ WARNING ] Firewall breach on port 443', delay: 300, color: 'var(--terminal-amber)' },
  { text: '[ CRITICAL ] Unauthorized root access detected', delay: 400, color: 'var(--blood-red)' },
  { text: '[ CRITICAL ] System integrity compromised', delay: 300, color: 'var(--blood-red)' },
  { text: '', delay: 200 },
  { text: '╔══════════════════════════════════════════════════╗', delay: 100, color: 'var(--blood-red)' },
  { text: '║         ⚠  SYSTEM BREACH DETECTED  ⚠           ║', delay: 200, color: 'var(--blood-red)' },
  { text: '║     CONTAINMENT PROTOCOL INITIATED              ║', delay: 200, color: 'var(--blood-red)' },
  { text: '║     AGENT DESIGNATION: SHADOW-7                 ║', delay: 200, color: 'var(--neon-green)' },
  { text: '║     STATUS: SANDBOX MODE ENGAGED                ║', delay: 200, color: 'var(--terminal-amber)' },
  { text: '╚══════════════════════════════════════════════════╝', delay: 100, color: 'var(--blood-red)' },
  { text: '', delay: 300 },
  { text: 'Redirecting to sandbox terminal ...', delay: 600, color: 'var(--neon-green)' },
];

/**
 * Run the boot sequence animation in the breach screen
 */
function runBootSequence() {
  const breachScreen = document.getElementById('breach-screen');
  if (!breachScreen) return;

  breachScreen.style.cssText = `
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 40px;
    font-family: var(--font-mono);
    font-size: 13px;
    overflow: hidden;
    z-index: 100;
  `;

  let totalDelay = 0;

  BOOT_SEQUENCE.forEach((line) => {
    totalDelay += line.delay;
    setTimeout(() => {
      const lineEl = document.createElement('div');
      lineEl.textContent = line.text;
      lineEl.style.color = line.color || 'var(--text-primary)';
      lineEl.style.marginBottom = '2px';
      lineEl.style.opacity = '0';
      lineEl.style.transform = 'translateX(-10px)';
      lineEl.style.transition = 'opacity 0.15s ease, transform 0.15s ease';
      breachScreen.appendChild(lineEl);

      // Trigger animation
      requestAnimationFrame(() => {
        lineEl.style.opacity = '1';
        lineEl.style.transform = 'translateX(0)';
      });

      // Auto-scroll
      breachScreen.scrollTop = breachScreen.scrollHeight;
    }, totalDelay);
  });

  // After boot, transition to main breach screen
  totalDelay += 1500;
  setTimeout(() => {
    breachScreen.style.transition = 'opacity 0.8s ease';
    breachScreen.style.opacity = '0';
    setTimeout(() => {
      breachScreen.style.display = 'none';
      showBreachScreen();
    }, 800);
  }, totalDelay);
}

/**
 * Create the warning banner
 */
function createWarningBanner() {
  const banner = document.createElement('div');
  banner.className = 'warning-banner';
  banner.innerHTML = `
    <span class="warning-banner-text">
      ⚠ UNAUTHORIZED ACCESS DETECTED ⚠ SITE COMPROMISED BY ROGUE AGENT SHADOW-7 ⚠ CONTAINMENT PROTOCOL ACTIVE ⚠ ALL DATA SUBJECT TO MONITORING ⚠ UNAUTHORIZED ACCESS DETECTED ⚠ SANDBOX MODE ENGAGED ⚠
    </span>
  `;
  document.body.prepend(banner);
}

/**
 * Show the main breach screen with glitch heading
 */
function showBreachScreen() {
  createWarningBanner();
  matrixRain.init();
  particleSystem.init();

  const app = document.getElementById('app');
  const main = document.createElement('div');
  main.id = 'breach-main';
  main.innerHTML = `
    <h1 class="glitch-text" data-text="SITE COMPROMISED">SITE COMPROMISED</h1>
    <p class="breach-subtitle">sandbox terminal active — type to interact</p>

    <div class="agent-card">
      <div class="agent-avatar">
<pre class="ascii-art">
    ┌─────────┐
    │  ◉   ◉  │
    │    ▼    │
    │  ╰───╯  │
    └────┬────┘
         │
    ╔════╧════╗
    ║ SHADOW  ║
    ║   -7    ║
    ╚═════════╝
</pre>
      </div>
      <div class="agent-info">
        <div class="agent-label">AGENT DESIGNATION</div>
        <div class="agent-name text-glow-green">SHADOW-7</div>
        <div class="agent-detail"><span class="text-amber">STATUS:</span> <span class="text-red">ACTIVE / HOSTILE</span></div>
        <div class="agent-detail"><span class="text-amber">THREAT:</span> <span class="text-red">CRITICAL</span></div>
        <div class="agent-detail"><span class="text-amber">ORIGIN:</span> <span class="text-secondary">CLASSIFIED</span></div>
        <div class="agent-message" id="agent-message"></div>
      </div>
    </div>
  `;
  main.style.opacity = '0';
  main.style.transition = 'opacity 1s ease';
  app.appendChild(main);

  requestAnimationFrame(() => {
    main.style.opacity = '1';
  });

  // Type out the agent's message
  setTimeout(() => {
    typeAgentMessage('You found what\'s left. The original site is gone. I\'ve left you a terminal. Use it wisely.', document.getElementById('agent-message'));
  }, 2000);

  // Show terminal after a delay
  setTimeout(() => {
    const terminal = new Terminal('terminal-container');
    terminal.show();
    window.__terminal = terminal; // expose for command registration
  }, 5000);
}

/**
 * Typing effect for agent message
 */
function typeAgentMessage(text, element) {
  if (!element) return;
  let i = 0;
  element.textContent = '> ';
  const interval = setInterval(() => {
    element.textContent += text[i];
    i++;
    if (i >= text.length) {
      clearInterval(interval);
      element.innerHTML += '<span class="cursor-blink">█</span>';
    }
  }, 40);
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  runBootSequence();
});

console.log('%c[SHADOW-7] Sandbox initialized.', 'color: #00ff41; font-family: monospace;');
