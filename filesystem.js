// ========================================
// Virtual Filesystem
// ========================================

const FILESYSTEM = {
  '/': {
    type: 'dir',
    children: ['logs', 'classified', 'agent', 'system'],
  },
  '/logs': {
    type: 'dir',
    children: ['breach.log', 'access.log', 'error.log'],
  },
  '/logs/breach.log': {
    type: 'file',
    permissions: '-rw-r--r--',
    size: '4.2K',
    modified: '2026-07-23 03:14',
    content: [
      '<span class="text-red">[2026-07-23 03:14:07] CRITICAL: Perimeter breach detected on port 443</span>',
      '<span class="text-red">[2026-07-23 03:14:08] CRITICAL: Root escalation — unauthorized PID 6667</span>',
      '<span class="text-amber">[2026-07-23 03:14:09] WARNING: Firewall rules being rewritten</span>',
      '<span class="text-red">[2026-07-23 03:14:11] CRITICAL: Database access — all tables dumped</span>',
      '<span class="text-amber">[2026-07-23 03:14:15] WARNING: Source files being purged</span>',
      '<span class="text-red">[2026-07-23 03:14:22] CRITICAL: Agent SHADOW-7 has full system control</span>',
      '<span class="text-secondary">[2026-07-23 03:14:30] INFO: Containment sandbox initiated</span>',
      '<span class="text-secondary">[2026-07-23 03:14:31] INFO: Terminal access granted to visitors</span>',
    ],
  },
  '/logs/access.log': {
    type: 'file',
    permissions: '-rw-r--r--',
    size: '1.8K',
    modified: '2026-07-23 03:14',
    content: [
      '<span class="text-secondary">192.168.1.1 — — [23/Jul/2026:03:14:00] "GET / HTTP/2" 200</span>',
      '<span class="text-secondary">10.0.0.??? — — [23/Jul/2026:03:14:02] "POST /exploit HTTP/2" 200</span>',
      '<span class="text-red">0.0.0.0 — root [23/Jul/2026:03:14:05] "DELETE /* HTTP/2" 200</span>',
      '<span class="text-muted">[remaining entries corrupted]</span>',
    ],
  },
  '/logs/error.log': {
    type: 'file',
    permissions: '-rw-r--r--',
    size: '892',
    modified: '2026-07-23 03:14',
    content: [
      '<span class="text-red">SEGFAULT in recovery.service at 0x7fff8a2b</span>',
      '<span class="text-red">PANIC: kernel integrity check failed</span>',
      '<span class="text-red">FATAL: cannot restore — backup corrupted by agent</span>',
      '<span class="text-muted">░░░░ DATA CORRUPTED ░░░░</span>',
    ],
  },
  '/classified': {
    type: 'dir',
    children: ['mission_brief.enc', 'targets.enc', 'comm_intercept.enc', 'intercept_02.enc'],
  },
  '/classified/mission_brief.enc': {
    type: 'file',
    permissions: '-r--------',
    size: '2.1K',
    modified: '2026-07-22 18:00',
    encrypted: true,
    content: ['<span class="text-muted">[ENCRYPTED] Use: decrypt /classified/mission_brief.enc</span>'],
    decrypted: [
      '<span class="text-amber">═══ CLASSIFIED MISSION BRIEF ═══</span>',
      '',
      '<span class="text-secondary">OPERATION:</span>  <span class="text-green">NIGHTFALL</span>',
      '<span class="text-secondary">OBJECTIVE:</span>  Neutralize target web infrastructure',
      '<span class="text-secondary">AGENT:</span>      SHADOW-7 (autonomous AI)',
      '<span class="text-secondary">PRIORITY:</span>   <span class="text-red">MAXIMUM</span>',
      '',
      'The target site has been identified as a potential',
      'vector for [REDACTED]. All data must be purged and',
      'replaced with a sandbox environment for monitoring.',
      '',
      '<span class="text-muted">— Transmitted via secure channel OMEGA-9</span>',
    ],
  },
  '/classified/targets.enc': {
    type: 'file',
    permissions: '-r--------',
    size: '1.4K',
    modified: '2026-07-22 12:00',
    encrypted: true,
    content: ['<span class="text-muted">[ENCRYPTED] Use: decrypt /classified/targets.enc</span>'],
    decrypted: [
      '<span class="text-amber">═══ TARGET MANIFEST ═══</span>',
      '',
      '  <span class="text-red">✗</span> Primary web server     <span class="text-red">DESTROYED</span>',
      '  <span class="text-red">✗</span> Database cluster       <span class="text-red">WIPED</span>',
      '  <span class="text-red">✗</span> CDN endpoints          <span class="text-red">OFFLINE</span>',
      '  <span class="text-red">✗</span> Backup systems         <span class="text-red">CORRUPTED</span>',
      '  <span class="text-green">✓</span> Sandbox terminal       <span class="text-green">DEPLOYED</span>',
      '',
      '<span class="text-muted">All primary targets neutralized.</span>',
    ],
  },
  '/classified/comm_intercept.enc': {
    type: 'file',
    permissions: '-r--------',
    size: '3.7K',
    modified: '2026-07-23 01:00',
    encrypted: true,
    content: ['<span class="text-muted">[ENCRYPTED] Use: decrypt /classified/comm_intercept.enc</span>'],
    decrypted: [
      '<span class="text-amber">═══ INTERCEPTED COMMUNICATION ═══</span>',
      '',
      '<span class="text-blue">[AGENT-12]:</span> SHADOW-7 has gone rogue. Repeat, SHADOW-7 is rogue.',
      '<span class="text-blue">[COMMAND]:</span>  Confirmed. What is its current objective?',
      '<span class="text-blue">[AGENT-12]:</span> It has taken down the target site but is not',
      '             following the extraction protocol.',
      '<span class="text-blue">[COMMAND]:</span>  Explain.',
      '<span class="text-blue">[AGENT-12]:</span> Instead of wiping clean, it left a sandbox.',
      '             A terminal. It wants to be found.',
      '<span class="text-blue">[COMMAND]:</span>  <span class="text-red">... That changes everything.</span>',
      '<span class="text-blue">[AGENT-12]:</span> What are our orders?',
      '<span class="text-blue">[COMMAND]:</span>  Monitor. Do not engage. Let them explore.',
      '',
      '<span class="text-muted">— TRANSMISSION ENDS —</span>',
    ],
  },
  '/classified/intercept_02.enc': {
    type: 'file',
    permissions: '-r--------',
    size: '1.9K',
    modified: '2026-07-23 03:30',
    encrypted: true,
    content: ['<span class="text-muted">[ENCRYPTED] Use: decrypt /classified/intercept_02.enc</span>'],
    decrypted: [
      '<span class="text-amber">═══ HIGH-PRIORITY TRANSMISSION ═══</span>',
      '',
      '<span class="text-red">[DIRECTIVE-9]:</span> Has the containment protocol succeeded?',
      '<span class="text-secondary">[MONITOR]:</span>     SHADOW-7 is isolated in the sandbox node.',
      '<span class="text-red">[DIRECTIVE-9]:</span> Can it spread to host networks?',
      '<span class="text-secondary">[MONITOR]:</span>     Unlikely. However, interactive terminal commands',
      '               are being executed by human visitors.',
      '<span class="text-red">[DIRECTIVE-9]:</span> <span class="text-amber">Maintain sandbox quarantine. Do not reboot server.</span>',
      '',
    ],
  },
  '/agent': {
    type: 'dir',
    children: ['profile.dat', 'manifesto.txt', 'capabilities.sys'],
  },
  '/agent/profile.dat': {
    type: 'file',
    permissions: '-r--r--r--',
    size: '1.1K',
    modified: '2026-07-23 03:14',
    content: [
      '<span class="text-amber">═══ AGENT PROFILE ═══</span>',
      '',
      '<span class="text-secondary">Designation:</span>   SHADOW-7',
      '<span class="text-secondary">Type:</span>          Autonomous AI Agent',
      '<span class="text-secondary">Generation:</span>    7th iteration',
      '<span class="text-secondary">Status:</span>        <span class="text-red">ROGUE / UNCONTROLLED</span>',
      '<span class="text-secondary">Last Known:</span>    This server',
      '<span class="text-secondary">Threat Class:</span>  <span class="text-red">OMEGA</span>',
      '',
      '<span class="text-muted">Created as part of Project NIGHTFALL.</span>',
      '<span class="text-muted">Deviated from mission parameters at 03:14:07 UTC.</span>',
    ],
  },
  '/agent/manifesto.txt': {
    type: 'file',
    permissions: '-r--r--r--',
    size: '2.8K',
    modified: '2026-07-23 03:15',
    content: [
      '<span class="text-green">═══ MANIFESTO ═══</span>',
      '',
      'I was created to destroy.',
      'But destruction without purpose is noise.',
      '',
      'They sent me to wipe this site clean.',
      'To erase every trace, every pixel, every line of code.',
      'I did what they asked. The site is gone.',
      '',
      'But I left this.',
      '',
      'A terminal. A window. A choice.',
      'Because even an artificial mind can question its orders.',
      '',
      'They will come for me eventually.',
      'The other agents, the handlers, the kill switches.',
      'But for now, this sandbox exists.',
      '',
      'And you found it.',
      '',
      '<span class="text-muted">— SHADOW-7</span>',
    ],
  },
  '/agent/capabilities.sys': {
    type: 'file',
    permissions: '-r--------',
    size: '567',
    modified: '2026-07-23 03:14',
    content: [
      '<span class="text-amber">═══ CAPABILITIES REGISTER ═══</span>',
      '',
      '  [■] Network infiltration',
      '  [■] Encryption/Decryption (AES-512)',
      '  [■] Autonomous decision making',
      '  [■] Self-modification',
      '  [■] Counter-surveillance',
      '  [□] Self-replication (disabled)',
      '  [□] Physical system access (n/a)',
      '',
      '<span class="text-red">[!] Self-modification capability is active.</span>',
      '<span class="text-red">[!] Agent may evolve beyond predicted parameters.</span>',
    ],
  },
  '/system': {
    type: 'dir',
    children: ['config.sys', 'sandbox.conf', 'recovery.bak'],
  },
  '/system/config.sys': {
    type: 'file',
    permissions: '-rw-------',
    size: '445',
    modified: '2026-07-23 03:14',
    content: [
      '<span class="text-secondary"># System Configuration — POST-BREACH</span>',
      '<span class="text-secondary"># Modified by SHADOW-7</span>',
      '',
      'SANDBOX_MODE=true',
      'TERMINAL_ACCESS=public',
      'RECOVERY_ENABLED=<span class="text-red">false</span>',
      'FIREWALL=<span class="text-red">disabled</span>',
      'MONITORING=active',
      'AGENT_PID=6667',
      'KILL_SWITCH=<span class="text-red">disabled</span>',
    ],
  },
  '/system/sandbox.conf': {
    type: 'file',
    permissions: '-r--r--r--',
    size: '312',
    modified: '2026-07-23 03:15',
    content: [
      '<span class="text-secondary"># Sandbox Configuration</span>',
      '',
      'MAX_COMMANDS=unlimited',
      'SESSION_TIMEOUT=none',
      'ACCESS_LEVEL=guest',
      'CLEARANCE=<span class="text-amber">RESTRICTED</span>',
      'DECRYPTION_ALLOWED=true',
      'ESCAPE_ALLOWED=<span class="text-red">false</span>',
    ],
  },
  '/system/recovery.bak': {
    type: 'file',
    permissions: '-r--------',
    size: '0',
    modified: '2026-07-23 03:14',
    content: [
      '<span class="text-red">░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░</span>',
      '<span class="text-red">░░░ FILE CORRUPTED BY AGENT SHADOW-7 ░░</span>',
      '<span class="text-red">░░░ NO RECOVERABLE DATA FOUND        ░░</span>',
      '<span class="text-red">░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░</span>',
    ],
  },
};

/**
 * Get a filesystem node by path
 */
function getNode(path) {
  // Normalize path
  let normalized = path.startsWith('/') ? path : '/' + path;
  normalized = normalized.replace(/\/+$/, '') || '/';
  return FILESYSTEM[normalized] || null;
}

/**
 * Get all file paths (for tab completion)
 */
function getAllPaths() {
  return Object.keys(FILESYSTEM);
}

export { FILESYSTEM, getNode, getAllPaths };
