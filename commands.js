// ========================================
// Terminal Commands Registry
// ========================================

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
}

export { registerCommands };
