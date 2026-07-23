// ========================================
// SHADOW-7 SANDBOX TERMINAL
// Site compromised. Containment active.
// ========================================

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

  // After boot, transition to main content
  totalDelay += 1500;
  setTimeout(() => {
    breachScreen.style.transition = 'opacity 0.8s ease';
    breachScreen.style.opacity = '0';
    setTimeout(() => {
      breachScreen.style.display = 'none';
    }, 800);
  }, totalDelay);
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  runBootSequence();
});

console.log('%c[SHADOW-7] Sandbox initialized.', 'color: #00ff41; font-family: monospace;');
