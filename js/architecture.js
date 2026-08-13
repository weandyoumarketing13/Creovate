/* ==========================================================================
   CREOVATE 2D ARCHITECTURE & NODE CANVAS ENGINE
   Interactive Physics, Blueprint Grid, Particle Telemetry
   ========================================================================== */

class ArchitectureCanvas {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.nodes = [];
    this.connections = [];
    this.particles = [];
    this.draggedNode = null;
    this.hoveredNode = null;
    this.mouse = { x: 0, y: 0, isDown: false };
    this.preset = 'ecosystem';
    this.signalCount = 0;
    this.fps = 60;
    this.lastFrameTime = performance.now();

    this.init();
  }

  init() {
    this.resize();
    window.addEventListener('resize', () => this.resize());
    this.setupEvents();
    this.loadPreset('ecosystem');
    this.animate();
  }

  resize() {
    const parent = this.canvas.parentElement;
    this.width = parent.clientWidth;
    this.height = parent.clientHeight;
    this.canvas.width = this.width * window.devicePixelRatio;
    this.canvas.height = this.height * window.devicePixelRatio;
    this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
  }

  setupEvents() {
    const getPos = (e) => {
      const rect = this.canvas.getBoundingClientRect();
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };

    this.canvas.addEventListener('mousemove', (e) => {
      this.mouse = { ...getPos(e), isDown: this.mouse.isDown };
      if (this.draggedNode) {
        this.draggedNode.x = this.mouse.x;
        this.draggedNode.y = this.mouse.y;
        this.draggedNode.vx = 0;
        this.draggedNode.vy = 0;
      } else {
        this.hoveredNode = this.getNodeAt(this.mouse.x, this.mouse.y);
        this.canvas.style.cursor = this.hoveredNode ? 'grab' : 'default';
      }
    });

    this.canvas.addEventListener('mousedown', (e) => {
      this.mouse.isDown = true;
      const node = this.getNodeAt(this.mouse.x, this.mouse.y);
      if (node) {
        this.draggedNode = node;
        this.canvas.style.cursor = 'grabbing';
        this.updateTelemetry(node);
      }
    });

    window.addEventListener('mouseup', () => {
      this.mouse.isDown = false;
      if (this.draggedNode) {
        this.draggedNode = null;
        this.canvas.style.cursor = 'default';
      }
    });

    // Touch support
    this.canvas.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const rect = this.canvas.getBoundingClientRect();
        this.mouse.x = touch.clientX - rect.left;
        this.mouse.y = touch.clientY - rect.top;
        if (this.draggedNode) {
          this.draggedNode.x = this.mouse.x;
          this.draggedNode.y = this.mouse.y;
        }
      }
    });

    this.canvas.addEventListener('touchstart', (e) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const rect = this.canvas.getBoundingClientRect();
        const node = this.getNodeAt(touch.clientX - rect.left, touch.clientY - rect.top);
        if (node) {
          this.draggedNode = node;
          this.updateTelemetry(node);
        }
      }
    });

    window.addEventListener('touchend', () => {
      this.draggedNode = null;
    });
  }

  getNodeAt(x, y) {
    return this.nodes.find(n => {
      const dx = n.x - x;
      const dy = n.y - y;
      return Math.sqrt(dx * dx + dy * dy) <= n.radius + 10;
    });
  }

  loadPreset(presetName) {
    this.preset = presetName;
    const cx = this.width / 2;
    const cy = this.height / 2;

    if (presetName === 'ecosystem') {
      this.nodes = [
        { id: 1, label: 'CREOVATE CORE', x: cx, y: cy, radius: 28, isCore: true, color: '#00f2fe', vx: 0, vy: 0 },
        { id: 2, label: 'CREATIVE DNA', x: cx - 180, y: cy - 100, radius: 18, color: '#e100ff', vx: 0, vy: 0 },
        { id: 3, label: 'INNOVATION MESH', x: cx + 180, y: cy - 100, radius: 18, color: '#4facfe', vx: 0, vy: 0 },
        { id: 4, label: 'AI NEURAL CAMPAIGN', x: cx - 200, y: cy + 120, radius: 18, color: '#7f00ff', vx: 0, vy: 0 },
        { id: 5, label: 'BRAND ARCHITECTURE', x: cx + 200, y: cy + 120, radius: 18, color: '#00f2fe', vx: 0, vy: 0 },
        { id: 6, label: 'CONVERSION ENGINE', x: cx, y: cy - 180, radius: 16, color: '#ffffff', vx: 0, vy: 0 },
        { id: 7, label: 'SPATIAL EXPERIENCE', x: cx, y: cy + 190, radius: 16, color: '#a1a1a6', vx: 0, vy: 0 }
      ];
      this.connections = [
        { from: 1, to: 2 }, { from: 1, to: 3 }, { from: 1, to: 4 },
        { from: 1, to: 5 }, { from: 1, to: 6 }, { from: 1, to: 7 },
        { from: 2, to: 6 }, { from: 3, to: 6 }, { from: 4, to: 7 }, { from: 5, to: 7 }
      ];
    } else if (presetName === 'brand') {
      this.nodes = [
        { id: 1, label: 'BRAND STRATEGY', x: cx - 150, y: cy, radius: 24, isCore: true, color: '#00f2fe', vx: 0, vy: 0 },
        { id: 2, label: 'VISUAL IDENTITY', x: cx, y: cy - 120, radius: 20, color: '#e100ff', vx: 0, vy: 0 },
        { id: 3, label: 'POSITIONING', x: cx + 150, y: cy, radius: 20, color: '#4facfe', vx: 0, vy: 0 },
        { id: 4, label: 'TONE & VOICE', x: cx, y: cy + 120, radius: 20, color: '#7f00ff', vx: 0, vy: 0 }
      ];
      this.connections = [
        { from: 1, to: 2 }, { from: 2, to: 3 }, { from: 3, to: 4 }, { from: 4, to: 1 }, { from: 1, to: 3 }
      ];
    } else if (presetName === 'growth') {
      this.nodes = [
        { id: 1, label: 'AI DATA MATRIX', x: cx, y: cy - 140, radius: 22, isCore: true, color: '#7f00ff', vx: 0, vy: 0 },
        { id: 2, label: 'PERFORMANCE ADS', x: cx - 160, y: cy + 60, radius: 18, color: '#00f2fe', vx: 0, vy: 0 },
        { id: 3, label: 'FUNNEL ENGINE', x: cx + 160, y: cy + 60, radius: 18, color: '#e100ff', vx: 0, vy: 0 },
        { id: 4, label: 'ROAS MAXIMIZER', x: cx, y: cy + 160, radius: 22, color: '#4facfe', vx: 0, vy: 0 }
      ];
      this.connections = [
        { from: 1, to: 2 }, { from: 1, to: 3 }, { from: 2, to: 4 }, { from: 3, to: 4 }, { from: 1, to: 4 }
      ];
    }

    // Spawn pulses
    this.particles = [];
    for (let i = 0; i < 12; i++) {
      this.spawnParticle();
    }

    this.updateTelemetry(this.nodes[0]);
  }

  spawnParticle() {
    if (this.connections.length === 0) return;
    const conn = this.connections[Math.floor(Math.random() * this.connections.length)];
    const n1 = this.nodes.find(n => n.id === conn.from);
    const n2 = this.nodes.find(n => n.id === conn.to);
    if (!n1 || !n2) return;

    const spectrumColors = ['#00E5D1', '#FF2A6D', '#2563EB', '#8B5CF6', '#F59E0B'];
    const randomColor = spectrumColors[Math.floor(Math.random() * spectrumColors.length)];

    this.particles.push({
      fromNode: n1,
      toNode: n2,
      progress: Math.random(),
      speed: 0.005 + Math.random() * 0.008,
      size: 2.5 + Math.random() * 2,
      color: randomColor
    });
    this.signalCount++;
  }

  updatePhysics() {
    // Subtle orbital physics & spring forces
    const time = Date.now() * 0.001;
    this.nodes.forEach((n, idx) => {
      if (n === this.draggedNode) return;

      // Gentle floating motion
      n.x += Math.sin(time + idx) * 0.3;
      n.y += Math.cos(time + idx * 0.8) * 0.3;
    });

    // Update particles along connections
    this.particles.forEach((p, idx) => {
      p.progress += p.speed;
      if (p.progress >= 1) {
        p.progress = 0;
        const conn = this.connections[Math.floor(Math.random() * this.connections.length)];
        p.fromNode = this.nodes.find(n => n.id === conn.from);
        p.toNode = this.nodes.find(n => n.id === conn.to);
      }
    });
  }

  updateTelemetry(activeNode) {
    const elActive = document.getElementById('telemetryActiveNode');
    const elNodes = document.getElementById('telemetryNodesCount');
    const elResonance = document.getElementById('telemetryResonance');
    const elSignals = document.getElementById('telemetrySignals');

    if (elActive && activeNode) elActive.textContent = activeNode.label;
    if (elNodes) elNodes.textContent = `${this.nodes.length} Active Nodes`;
    if (elResonance) elResonance.textContent = `${(98.4 + Math.random() * 1.5).toFixed(1)}%`;
    if (elSignals) elSignals.textContent = `${this.signalCount} Pkts/s`;
  }

  drawGrid() {
    this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
    this.ctx.lineWidth = 1;
    const gridSize = 40;

    for (let x = 0; x < this.width; x += gridSize) {
      this.ctx.beginPath();
      this.ctx.moveTo(x, 0);
      this.ctx.lineTo(x, this.height);
      this.ctx.stroke();
    }

    for (let y = 0; y < this.height; y += gridSize) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(this.width, y);
      this.ctx.stroke();
    }
  }

  render() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    // 1. Draw Blueprint Grid
    this.drawGrid();

    // 2. Draw Connections
    this.connections.forEach(conn => {
      const n1 = this.nodes.find(n => n.id === conn.from);
      const n2 = this.nodes.find(n => n.id === conn.to);
      if (!n1 || !n2) return;

      this.ctx.beginPath();
      this.ctx.moveTo(n1.x, n1.y);
      this.ctx.lineTo(n2.x, n2.y);
      this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
      this.ctx.lineWidth = 1.5;
      this.ctx.setLineDash([4, 4]);
      this.ctx.stroke();
      this.ctx.setLineDash([]);
    });

    // 3. Draw Particles (Signals)
    this.particles.forEach(p => {
      if (!p.fromNode || !p.toNode) return;
      const px = p.fromNode.x + (p.toNode.x - p.fromNode.x) * p.progress;
      const py = p.fromNode.y + (p.toNode.y - p.fromNode.y) * p.progress;

      this.ctx.beginPath();
      this.ctx.arc(px, py, p.size, 0, Math.PI * 2);
      this.ctx.fillStyle = p.color;
      this.ctx.shadowColor = p.color;
      this.ctx.shadowBlur = 10;
      this.ctx.fill();
      this.ctx.shadowBlur = 0;
    });

    // 4. Draw Nodes
    this.nodes.forEach(n => {
      const isHovered = n === this.hoveredNode;
      const isDragged = n === this.draggedNode;

      // Glow backdrop
      this.ctx.beginPath();
      this.ctx.arc(n.x, n.y, n.radius + (isHovered || isDragged ? 8 : 4), 0, Math.PI * 2);
      this.ctx.fillStyle = n.color;
      this.ctx.globalAlpha = isHovered || isDragged ? 0.25 : 0.1;
      this.ctx.fill();
      this.ctx.globalAlpha = 1.0;

      // Core Outer Circle
      this.ctx.beginPath();
      this.ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = '#0a0a0f';
      this.ctx.strokeStyle = n.color;
      this.ctx.lineWidth = n.isCore ? 3 : 2;
      this.ctx.shadowColor = n.color;
      this.ctx.shadowBlur = isHovered ? 20 : 8;
      this.ctx.fill();
      this.ctx.stroke();
      this.ctx.shadowBlur = 0;

      // Inner Point
      this.ctx.beginPath();
      this.ctx.arc(n.x, n.y, 4, 0, Math.PI * 2);
      this.ctx.fillStyle = n.color;
      this.ctx.fill();

      // Label
      this.ctx.font = `${n.isCore ? 'bold 11px' : '500 10px'} -apple-system, sans-serif`;
      this.ctx.fillStyle = isHovered ? '#ffffff' : 'rgba(255, 255, 255, 0.75)';
      this.ctx.textAlign = 'center';
      this.ctx.fillText(n.label, n.x, n.y + n.radius + 18);
    });
  }

  animate() {
    const now = performance.now();
    this.fps = Math.round(1000 / (now - this.lastFrameTime));
    this.lastFrameTime = now;

    this.updatePhysics();
    this.render();

    requestAnimationFrame(() => this.animate());
  }
}

// Instantiate global engine when DOM ready
document.addEventListener('DOMContentLoaded', () => {
  window.creovateCanvas = new ArchitectureCanvas('architectureCanvas');
});
