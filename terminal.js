// ========================================
// Interactive Terminal Engine
// ========================================

class Terminal {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.history = [];
    this.historyIndex = -1;
    this.commandHandlers = {};
    this.outputBuffer = [];
    this.isProcessing = false;
    this.prompt = 'shadow-7@sandbox:~$ ';

    this.init();
  }

  init() {
    if (!this.container) return;

    this.container.innerHTML = `
      <div class="terminal-window">
        <div class="terminal-header">
          <div class="terminal-dots">
            <span class="dot dot-red"></span>
            <span class="dot dot-yellow"></span>
            <span class="dot dot-green"></span>
          </div>
          <div class="terminal-title">SANDBOX TERMINAL v2.1 — RESTRICTED ACCESS</div>
          <div class="terminal-status">
            <span class="status-indicator"></span>
            LIVE
          </div>
        </div>
        <div class="terminal-body" id="terminal-body">
          <div class="terminal-output" id="terminal-output"></div>
          <div class="terminal-input-line">
            <span class="terminal-prompt">${this.prompt}</span>
            <input type="text" id="terminal-input" class="terminal-input" autocomplete="off" spellcheck="false" autofocus />
          </div>
        </div>
      </div>
    `;

    this.outputEl = document.getElementById('terminal-output');
    this.inputEl = document.getElementById('terminal-input');
    this.bodyEl = document.getElementById('terminal-body');

    this.bindEvents();
  }

  playKeyClick() {
    try {
      if (!this.audioCtx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) this.audioCtx = new AudioContext();
      }
      if (this.audioCtx && this.audioCtx.state === 'running') {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(600 + Math.random() * 200, this.audioCtx.currentTime);
        gain.gain.setValueAtTime(0.015, this.audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.audioCtx.currentTime + 0.03);
        osc.connect(gain);
        gain.connect(this.audioCtx.destination);
        osc.start();
        osc.stop(this.audioCtx.currentTime + 0.03);
      }
    } catch (_) {}
  }

  bindEvents() {
    this.inputEl.addEventListener('keydown', (e) => {
      this.playKeyClick();
      if (e.ctrlKey && e.key === 'l') {
        e.preventDefault();
        this.clear();
      } else if (e.ctrlKey && e.key === 'c') {
        e.preventDefault();
        this.writeLine(`<span class="text-green">${this.prompt}</span>${this.escapeHtml(this.inputEl.value)}^C`, 'command-echo');
        this.inputEl.value = '';
      } else if (e.key === 'Tab') {
        e.preventDefault();
        this.handleTabCompletion();
      } else if (e.key === 'Enter') {
        const cmd = this.inputEl.value.trim();
        if (cmd) {
          this.executeCommand(cmd);
        }
        this.inputEl.value = '';
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        this.navigateHistory(-1);
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        this.navigateHistory(1);
      }
    });

    // Always focus the input when clicking the terminal
    this.container.addEventListener('click', () => {
      this.inputEl.focus();
    });

    // Focus on load
    setTimeout(() => this.inputEl.focus(), 100);
  }

  handleTabCompletion() {
    const val = this.inputEl.value;
    if (!val) return;

    const registeredCmds = Object.keys(this.commandHandlers);
    const matches = registeredCmds.filter(cmd => cmd.startsWith(val.toLowerCase()));

    if (matches.length === 1) {
      this.inputEl.value = matches[0] + ' ';
    } else if (matches.length > 1) {
      this.writeLine(`<span class="text-green">${this.prompt}</span>${this.escapeHtml(val)}`, 'command-echo');
      this.writeLine(`<span class="text-secondary">Possible matches: ${matches.join('  ')}</span>`);
    }
  }

  navigateHistory(direction) {
    if (this.history.length === 0) return;

    this.historyIndex += direction;

    if (this.historyIndex < 0) {
      this.historyIndex = 0;
      return;
    }

    if (this.historyIndex >= this.history.length) {
      this.historyIndex = this.history.length;
      this.inputEl.value = '';
      return;
    }

    this.inputEl.value = this.history[this.historyIndex];
  }

  executeCommand(rawInput) {
    // Add to history
    this.history.push(rawInput);
    this.historyIndex = this.history.length;

    // Echo the command
    this.writeLine(`<span class="text-green">${this.prompt}</span>${this.escapeHtml(rawInput)}`, 'command-echo');

    // Parse command
    const parts = rawInput.split(/\s+/);
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    // Execute handler
    const handler = this.commandHandlers[cmd];
    if (handler) {
      handler(args, this);
    } else {
      this.writeLine(`<span class="text-red">Command not found:</span> ${this.escapeHtml(cmd)}. Type <span class="text-amber">help</span> for available commands.`);
    }

    this.scrollToBottom();
  }

  /**
   * Register a command handler
   */
  registerCommand(name, handler) {
    this.commandHandlers[name.toLowerCase()] = handler;
  }

  /**
   * Write a line to the terminal output
   */
  writeLine(html, className = '') {
    const line = document.createElement('div');
    line.className = `terminal-line ${className}`;
    line.innerHTML = html;
    this.outputEl.appendChild(line);
    
    // Output buffering: limit total lines to 500
    if (this.outputEl.children.length > 500) {
      this.outputEl.removeChild(this.outputEl.firstElementChild);
    }
    
    this.scrollToBottom();
  }

  /**
   * Write multiple lines with a delay between each
   */
  async writeLines(lines, delay = 50) {
    for (const line of lines) {
      this.writeLine(line.html || line, line.className || '');
      if (delay > 0) {
        await this.sleep(delay);
      }
    }
  }

  /**
   * Write a blank line
   */
  writeBlank() {
    this.writeLine('&nbsp;');
  }

  /**
   * Clear the terminal output
   */
  clear() {
    this.outputEl.innerHTML = '';
  }

  /**
   * Scroll to the bottom of the terminal
   */
  scrollToBottom() {
    this.bodyEl.scrollTop = this.bodyEl.scrollHeight;
  }

  /**
   * Escape HTML special characters
   */
  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  /**
   * Sleep helper
   */
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Show the terminal (slide up from bottom)
   */
  show() {
    this.container.classList.add('terminal-visible');
    setTimeout(() => this.inputEl.focus(), 500);
  }

  /**
   * Get command history
   */
  getHistory() {
    return [...this.history];
  }
}

export { Terminal };
