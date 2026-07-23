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
}

export { registerCommands };
