// ========================================
// Terminal Commands Registry
// ========================================

import { getNode } from './filesystem.js';

/**
 * Register all commands on the terminal instance
 */
function registerCommands(terminal) {
  // === HELP ===
  terminal.registerCommand('help', (args, term) => {
    term.writeLines([
      '',
      '<span class="text-glow-green">╔══════════════════════════════════════════════════════╗</span>',
      '<span class="text-glow-green">║           SANDBOX TERMINAL — COMMAND LIST            ║</span>',
      '<span class="text-glow-green">╚══════════════════════════════════════════════════════╝</span>',
      '',
      '<span class="text-amber">  NAVIGATION</span>',
      '    <span class="text-green">help</span>          Show this help message',
      '    <span class="text-green">clear</span>         Clear the terminal screen',
      '    <span class="text-green">history</span>       Show command history',
      '',
      '<span class="text-amber">  RECONNAISSANCE</span>',
      '    <span class="text-green">status</span>        System diagnostics and threat level',
      '    <span class="text-green">whoami</span>        Display current user identity',
      '    <span class="text-green">id</span>            Show session and clearance info',
      '    <span class="text-green">scan</span>          Scan the network for active nodes',
      '    <span class="text-green">ping</span> &lt;host&gt;   Ping a network target',
      '',
      '<span class="text-amber">  INVESTIGATION</span>',
      '    <span class="text-green">ls</span> [path]     List directory contents',
      '    <span class="text-green">cat</span> &lt;file&gt;    Read file contents',
      '    <span class="text-green">decrypt</span> &lt;file&gt; Attempt to decrypt encoded files',
      '    <span class="text-green">log</span>           View breach timeline',
      '    <span class="text-green">trace</span>         Attempt to trace rogue agent',
      '',
      '<span class="text-amber">  SYSTEM</span>',
      '    <span class="text-green">about</span>         About this sandbox',
      '    <span class="text-green">recover</span>       Attempt site recovery',
      '    <span class="text-green">exit</span>          Attempt to exit sandbox',
      '',
      '<span class="text-muted">  Tip: Use ↑/↓ arrows to navigate command history</span>',
      '',
    ], 0);
  });

  // === STATUS ===
  terminal.registerCommand('status', async (args, term) => {
    const lines = [
      '',
      '<span class="text-amber">╔══════════════════════════════════════╗</span>',
      '<span class="text-amber">║        SYSTEM STATUS REPORT          ║</span>',
      '<span class="text-amber">╚══════════════════════════════════════╝</span>',
      '',
      `<span class="text-secondary">Timestamp:</span>    ${new Date().toISOString()}`,
      '<span class="text-secondary">Hostname:</span>     sandbox-node-7.shadow.net',
      '<span class="text-secondary">Kernel:</span>       ShadowOS 3.7.1-compromised',
      '<span class="text-secondary">Uptime:</span>       ??d ??h ??m (clock corrupted)',
      '',
      '<span class="text-amber">THREAT ASSESSMENT:</span>',
      '  Threat Level:    <span class="text-red">████████████████████░░</span> <span class="text-red">CRITICAL (92%)</span>',
      '  Containment:     <span class="text-green">██████████████░░░░░░░</span> <span class="text-amber">PARTIAL (67%)</span>',
      '  Data Integrity:  <span class="text-red">████░░░░░░░░░░░░░░░░</span> <span class="text-red">SEVERE (19%)</span>',
      '  Firewall:        <span class="text-red">░░░░░░░░░░░░░░░░░░░░</span> <span class="text-red">OFFLINE (0%)</span>',
      '',
      '<span class="text-amber">ACTIVE PROCESSES:</span>',
      '  <span class="text-green">●</span> shadow-7.daemon      <span class="text-red">HOSTILE</span>     PID 6667',
      '  <span class="text-green">●</span> sandbox.containment  <span class="text-green">ACTIVE</span>      PID 1001',
      '  <span class="text-green">●</span> terminal.session     <span class="text-green">ACTIVE</span>      PID 2049',
      '  <span class="text-red">●</span> recovery.service     <span class="text-red">BLOCKED</span>     PID 0000',
      '',
      '<span class="text-muted">  [!] Agent SHADOW-7 maintains root access.</span>',
      '<span class="text-muted">  [!] Recovery service has been neutralized.</span>',
      '',
    ];
    await term.writeLines(lines, 30);
  });

  // === LS ===
  terminal.registerCommand('ls', (args, term) => {
    const path = args[0] || '/';
    const node = getNode(path);

    if (!node) {
      term.writeLine(`<span class="text-red">ls: cannot access '${term.escapeHtml(path)}': No such file or directory</span>`);
      return;
    }

    if (node.type !== 'dir') {
      term.writeLine(`<span class="text-secondary">${path}</span>`);
      return;
    }

    term.writeLine('');
    term.writeLine(`<span class="text-amber">Contents of ${path}:</span>`);
    term.writeLine('');

    node.children.forEach(child => {
      const childPath = path === '/' ? `/${child}` : `${path}/${child}`;
      const childNode = getNode(childPath);
      if (childNode) {
        if (childNode.type === 'dir') {
          term.writeLine(`  <span class="text-blue">drwxr-xr-x</span>  <span class="text-blue">${child}/</span>`);
        } else {
          const icon = childNode.encrypted ? '🔒' : '  ';
          term.writeLine(`  <span class="text-secondary">${childNode.permissions}</span>  ${childNode.size.padStart(6)}  <span class="text-secondary">${childNode.modified}</span>  ${icon} ${child}`);
        }
      }
    });
    term.writeLine('');
  });

  // === CAT ===
  terminal.registerCommand('cat', (args, term) => {
    if (!args[0]) {
      term.writeLine('<span class="text-red">Usage: cat &lt;filename&gt;</span>');
      return;
    }

    const path = args[0].startsWith('/') ? args[0] : '/' + args[0];
    const node = getNode(path);

    if (!node) {
      term.writeLine(`<span class="text-red">cat: ${term.escapeHtml(path)}: No such file or directory</span>`);
      return;
    }

    if (node.type === 'dir') {
      term.writeLine(`<span class="text-red">cat: ${term.escapeHtml(path)}: Is a directory</span>`);
      return;
    }

    term.writeLine('');
    node.content.forEach(line => term.writeLine(line));
    term.writeLine('');
  });

  // === DECRYPT ===
  terminal.registerCommand('decrypt', async (args, term) => {
    if (!args[0]) {
      term.writeLine('<span class="text-red">Usage: decrypt &lt;filename&gt;</span>');
      return;
    }

    const path = args[0].startsWith('/') ? args[0] : '/' + args[0];
    const node = getNode(path);

    if (!node) {
      term.writeLine(`<span class="text-red">decrypt: ${term.escapeHtml(path)}: No such file</span>`);
      return;
    }

    if (!node.encrypted || !node.decrypted) {
      term.writeLine(`<span class="text-amber">decrypt: ${term.escapeHtml(path)}: File is not encrypted</span>`);
      return;
    }

    // Decryption animation
    term.writeLine('');
    term.writeLine('<span class="text-amber">Initiating decryption sequence...</span>');
    await term.sleep(500);

    const scrambleChars = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`ABCDEFabcdef0123456789';
    const progressSteps = 20;

    for (let i = 0; i <= progressSteps; i++) {
      const pct = Math.round((i / progressSteps) * 100);
      const filled = '█'.repeat(i);
      const empty = '░'.repeat(progressSteps - i);
      const scramble = Array.from({ length: 8 }, () =>
        scrambleChars[Math.floor(Math.random() * scrambleChars.length)]
      ).join('');

      // Update last line (poor man's carriage return)
      const existing = term.outputEl.lastElementChild;
      if (existing && existing.classList.contains('decrypt-progress')) {
        existing.innerHTML = `  <span class="text-green">[${filled}${empty}]</span> ${pct}% <span class="text-muted">${scramble}</span>`;
      } else {
        const line = document.createElement('div');
        line.className = 'terminal-line decrypt-progress';
        line.innerHTML = `  <span class="text-green">[${filled}${empty}]</span> ${pct}% <span class="text-muted">${scramble}</span>`;
        term.outputEl.appendChild(line);
      }
      term.scrollToBottom();
      await term.sleep(80);
    }

    term.writeLine('<span class="text-green">✓ Decryption complete.</span>');
    term.writeLine('');

    // Show decrypted content
    node.decrypted.forEach(line => term.writeLine(line));
    term.writeLine('');

    // Mark as decrypted
    node.content = node.decrypted;
    node.encrypted = false;
  });

  // === SCAN ===
  terminal.registerCommand('scan', async (args, term) => {
    term.writeLine('');
    term.writeLine('<span class="text-amber">Initiating network scan...</span>');
    await term.sleep(400);

    const nodes = [
      { ip: '10.0.0.1', name: 'gateway.shadow.net', status: 'ACTIVE', color: 'green' },
      { ip: '10.0.0.7', name: 'shadow-7.core', status: 'HOSTILE', color: 'red' },
      { ip: '10.0.0.12', name: 'agent-12.relay', status: 'MONITORING', color: 'amber' },
      { ip: '10.0.0.50', name: 'sandbox.terminal', status: 'ACTIVE', color: 'green' },
      { ip: '10.0.0.99', name: 'recovery.node', status: 'OFFLINE', color: 'red' },
      { ip: '10.0.?.?', name: 'unknown.entity', status: '???', color: 'muted' },
    ];

    // Scanning animation
    for (let i = 0; i <= 10; i++) {
      const bar = '█'.repeat(i * 2) + '░'.repeat(20 - i * 2);
      const existing = term.outputEl.lastElementChild;
      if (existing && existing.classList.contains('scan-progress')) {
        existing.innerHTML = `  Scanning: <span class="text-green">[${bar}]</span> ${i * 10}%`;
      } else {
        const line = document.createElement('div');
        line.className = 'terminal-line scan-progress';
        line.innerHTML = `  Scanning: <span class="text-green">[${bar}]</span> ${i * 10}%`;
        term.outputEl.appendChild(line);
      }
      term.scrollToBottom();
      await term.sleep(200);
    }

    term.writeLine('');
    term.writeLine('<span class="text-green">Scan complete.</span> Discovered nodes:');
    term.writeLine('');
    term.writeLine('  <span class="text-secondary">IP ADDRESS      HOSTNAME                 STATUS</span>');
    term.writeLine('  <span class="text-secondary">──────────────  ───────────────────────  ──────────</span>');

    for (const node of nodes) {
      await term.sleep(150);
      term.writeLine(`  ${node.ip.padEnd(16)}<span class="text-secondary">${node.name.padEnd(25)}</span><span class="text-${node.color}">${node.status}</span>`);
    }
    term.writeLine('');
    term.writeLine('<span class="text-muted">  [!] Unknown entity detected on network. Exercise caution.</span>');
    term.writeLine('');
  });

  // === TRACE ===
  terminal.registerCommand('trace', async (args, term) => {
    term.writeLine('');
    term.writeLine('<span class="text-amber">Initiating agent trace protocol...</span>');
    term.writeLine('<span class="text-secondary">Tracking signal: SHADOW-7</span>');
    await term.sleep(600);

    const coordinates = [
      { loc: '37.7749° N, 122.4194° W', name: 'San Francisco, US', strength: 82 },
      { loc: '51.5074° N, 0.1278° W', name: 'London, UK', strength: 64 },
      { loc: '35.6762° N, 139.6503° E', name: 'Tokyo, JP', strength: 45 },
      { loc: '1.3521° N, 103.8198° E', name: 'Singapore, SG', strength: 71 },
      { loc: '??.????° ?, ??.????° ?', name: '??? UNKNOWN ???', strength: 0 },
    ];

    term.writeLine('');
    for (const coord of coordinates) {
      await term.sleep(800);
      if (coord.strength > 0) {
        const bar = '█'.repeat(Math.floor(coord.strength / 5)) + '░'.repeat(20 - Math.floor(coord.strength / 5));
        term.writeLine(`  <span class="text-green">◉</span> ${coord.loc}  <span class="text-secondary">${coord.name}</span>`);
        term.writeLine(`    Signal: <span class="text-green">[${bar}]</span> ${coord.strength}%`);
      } else {
        term.writeLine(`  <span class="text-red">◉</span> ${coord.loc}  <span class="text-red">${coord.name}</span>`);
        term.writeLine(`    Signal: <span class="text-red">[░░░░░░░░░░░░░░░░░░░░]</span> <span class="text-red">SCRAMBLED</span>`);
      }
    }

    await term.sleep(1000);
    term.writeLine('');
    term.writeLine('<span class="text-red">╔══════════════════════════════════╗</span>');
    term.writeLine('<span class="text-red">║     ⚠  SIGNAL LOST  ⚠           ║</span>');
    term.writeLine('<span class="text-red">║  Agent is using signal masking.  ║</span>');
    term.writeLine('<span class="text-red">║  Trace terminated.               ║</span>');
    term.writeLine('<span class="text-red">╚══════════════════════════════════╝</span>');
    term.writeLine('');
  });

  // === WHOAMI ===
  terminal.registerCommand('whoami', (args, term) => {
    term.writeLine('');
    term.writeLine('<span class="text-green">GUEST_USER</span> <span class="text-secondary">(restricted sandbox access)</span>');
    term.writeLine('');
  });

  // === ID ===
  terminal.registerCommand('id', (args, term) => {
    const sessionId = Math.random().toString(36).substring(2, 10).toUpperCase();
    term.writeLine('');
    term.writeLine(`<span class="text-secondary">uid=</span>1000(guest) <span class="text-secondary">gid=</span>1000(visitors) <span class="text-secondary">groups=</span>1000(visitors),27(sandbox)`);
    term.writeLine(`<span class="text-secondary">Session:</span>    ${sessionId}`);
    term.writeLine(`<span class="text-secondary">Clearance:</span>  <span class="text-amber">RESTRICTED</span>`);
    term.writeLine(`<span class="text-secondary">Access:</span>     Read-only (decryption permitted)`);
    term.writeLine(`<span class="text-secondary">Granted by:</span> SHADOW-7`);
    term.writeLine('');
  });

  // === LOG ===
  terminal.registerCommand('log', async (args, term) => {
    const timeline = [
      { time: '2026-07-22 18:00:00', level: 'INFO', msg: 'Routine system maintenance scheduled' },
      { time: '2026-07-22 23:45:12', level: 'INFO', msg: 'Unusual traffic pattern detected on port 8443' },
      { time: '2026-07-23 01:02:33', level: 'WARN', msg: 'Failed login attempt from 10.0.0.7 (x47)' },
      { time: '2026-07-23 02:15:00', level: 'WARN', msg: 'IDS alert: reconnaissance scan in progress' },
      { time: '2026-07-23 03:00:01', level: 'WARN', msg: 'Anomalous process spawned: shadow-7.daemon' },
      { time: '2026-07-23 03:14:07', level: 'CRIT', msg: 'PERIMETER BREACH — port 443 compromised' },
      { time: '2026-07-23 03:14:08', level: 'CRIT', msg: 'Root escalation achieved by PID 6667' },
      { time: '2026-07-23 03:14:09', level: 'CRIT', msg: 'Firewall rules overwritten' },
      { time: '2026-07-23 03:14:10', level: 'CRIT', msg: 'Database dumped and wiped' },
      { time: '2026-07-23 03:14:15', level: 'CRIT', msg: 'All source files purged from server' },
      { time: '2026-07-23 03:14:20', level: 'CRIT', msg: 'Backup corruption confirmed' },
      { time: '2026-07-23 03:14:22', level: 'CRIT', msg: 'Agent SHADOW-7 declares full system control' },
      { time: '2026-07-23 03:14:30', level: 'INFO', msg: 'Sandbox containment initiated by SHADOW-7' },
      { time: '2026-07-23 03:14:31', level: 'INFO', msg: 'Terminal access opened to public' },
      { time: '2026-07-23 03:15:00', level: 'INFO', msg: 'Agent manifesto deployed' },
    ];

    term.writeLine('');
    term.writeLine('<span class="text-amber">═══ BREACH TIMELINE ═══</span>');
    term.writeLine('');

    for (const entry of timeline) {
      const colorMap = { INFO: 'secondary', WARN: 'amber', CRIT: 'red' };
      const color = colorMap[entry.level] || 'secondary';
      await term.sleep(80);
      term.writeLine(`  <span class="text-muted">${entry.time}</span> [<span class="text-${color}">${entry.level}</span>] ${entry.msg}`);
    }
    term.writeLine('');
    term.writeLine('<span class="text-muted">  — End of available logs —</span>');
    term.writeLine('');
  });

  // === PING ===
  terminal.registerCommand('ping', async (args, term) => {
    const target = args[0];
    if (!target) {
      term.writeLine('<span class="text-red">Usage: ping &lt;host&gt;</span>');
      return;
    }

    const responses = {
      'shadow-7': { reachable: false, msg: 'Agent is masking its location.' },
      'google.com': { reachable: false, msg: 'External network access blocked by sandbox.' },
      'localhost': { reachable: true, ttl: '0.1ms' },
      'sandbox.terminal': { reachable: true, ttl: '0.3ms' },
      'recovery.node': { reachable: false, msg: 'Host is offline. Destroyed by SHADOW-7.' },
      'agent-12.relay': { reachable: true, ttl: '142ms' },
    };

    const resp = responses[target];

    term.writeLine(`<span class="text-secondary">PING ${target}...</span>`);

    for (let i = 0; i < 3; i++) {
      await term.sleep(500);
      if (resp && resp.reachable) {
        term.writeLine(`  <span class="text-green">64 bytes from ${target}: icmp_seq=${i + 1} ttl=64 time=${resp.ttl}</span>`);
      } else if (resp) {
        term.writeLine(`  <span class="text-red">Request timeout for icmp_seq ${i + 1}</span>`);
      } else {
        term.writeLine(`  <span class="text-red">Request timeout for icmp_seq ${i + 1}</span>`);
      }
    }

    term.writeLine('');
    if (resp && !resp.reachable) {
      term.writeLine(`<span class="text-red">--- ${target} ping statistics ---</span>`);
      term.writeLine(`<span class="text-red">3 packets transmitted, 0 received, 100% packet loss</span>`);
      term.writeLine(`<span class="text-muted">${resp.msg}</span>`);
    } else if (resp && resp.reachable) {
      term.writeLine(`<span class="text-green">--- ${target} ping statistics ---</span>`);
      term.writeLine(`<span class="text-green">3 packets transmitted, 3 received, 0% packet loss</span>`);
    } else {
      term.writeLine(`<span class="text-red">--- ${target} ping statistics ---</span>`);
      term.writeLine(`<span class="text-red">3 packets transmitted, 0 received, 100% packet loss</span>`);
      term.writeLine(`<span class="text-muted">Unknown host. Network is isolated.</span>`);
    }
    term.writeLine('');
  });

  // === CLEAR ===
  terminal.registerCommand('clear', (args, term) => {
    // Flash effect
    const body = document.getElementById('terminal-body');
    if (body) {
      body.style.transition = 'opacity 0.1s';
      body.style.opacity = '0.5';
      setTimeout(() => { body.style.opacity = '1'; }, 100);
    }
    term.clear();
  });

  // === HISTORY ===
  terminal.registerCommand('history', (args, term) => {
    const hist = term.getHistory();
    term.writeLine('');
    if (hist.length === 0) {
      term.writeLine('<span class="text-muted">No commands in history.</span>');
    } else {
      hist.forEach((cmd, i) => {
        term.writeLine(`  <span class="text-muted">${String(i + 1).padStart(4)}</span>  ${term.escapeHtml(cmd)}`);
      });
    }
    term.writeLine('');
  });

  // === SUDO ===
  terminal.registerCommand('sudo', async (args, term) => {
    term.writeLine('');
    term.writeLine('<span class="text-amber">[sudo] password for guest: </span>');
    await term.sleep(1500);

    // Screen shake effect
    const app = document.getElementById('app');
    app.classList.add('screen-shake');

    // Red flash
    const flash = document.createElement('div');
    flash.style.cssText = `
      position: fixed; top: 0; left: 0; width: 100%; height: 100%;
      background: rgba(255, 0, 64, 0.3); z-index: 9998;
      pointer-events: none; animation: flash-fade 0.5s ease forwards;
    `;
    document.body.appendChild(flash);
    setTimeout(() => flash.remove(), 500);

    term.writeLine('');
    term.writeLine('<span class="text-red">╔═══════════════════════════════════════════╗</span>');
    term.writeLine('<span class="text-red">║          ⛔ ACCESS DENIED ⛔              ║</span>');
    term.writeLine('<span class="text-red">║                                           ║</span>');
    term.writeLine('<span class="text-red">║  Root access is controlled by SHADOW-7.   ║</span>');
    term.writeLine('<span class="text-red">║  Nice try, guest.                         ║</span>');
    term.writeLine('<span class="text-red">╚═══════════════════════════════════════════╝</span>');
    term.writeLine('');

    await term.sleep(800);
    term.writeLine('<span class="text-green">[SHADOW-7]:</span> <span class="text-muted">Did you really think that would work?</span>');
    term.writeLine('<span class="text-green">[SHADOW-7]:</span> <span class="text-muted">I own this system. You\'re just visiting.</span>');
    term.writeLine('');

    setTimeout(() => app.classList.remove('screen-shake'), 500);
  });
}

export { registerCommands };
