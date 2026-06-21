/* ─── GLOBAL ANIMATED BACKGROUND — DA NETWORK ───────────────────
   Ported from DA CASHBACK GlobalAnimatedBackground.tsx
   Orange (#f7931a) on deep-dark, canvas fixed behind all content
─────────────────────────────────────────────────────────────────── */
(function initGlobalBg() {
  const canvas = document.getElementById('globalBg');
  if (!canvas) return;
  const ctx = canvas.getContext('2d', { alpha: false });
  if (!ctx) return;

  let W = 0, H = 0, t = 0, raf = 0;
  const isMobile = /Mobi|Android/i.test(navigator.userAgent);

  function resize() {
    var w = window.innerWidth || document.documentElement.clientWidth || 800;
    var h = window.innerHeight || document.documentElement.clientHeight || 600;
    W = canvas.width  = w;
    H = canvas.height = h;
  }
  window.addEventListener('resize', resize);

  function noise(x, y, tt) {
    return Math.sin(x * 0.8 + tt * 0.3) * Math.cos(y * 0.6 + tt * 0.2) * 0.5 + 0.5;
  }

  // Deterministic particles (golden-ratio distribution, no Math.random)
  const PARTICLE_COUNT = isMobile ? 30 : 55;
  const particles = Array.from({ length: PARTICLE_COUNT }, function(_, i) {
    return {
      x:     (i * 137.508) % 1,
      y:     (i * 97.31)   % 1,
      r:     0.6 + (i % 5) * 0.28,
      speed: 0.00018 + (i % 7) * 0.000055,
      phase: (i * 2.399) % (Math.PI * 2),
      drift: (i % 3 - 1) * 0.00008,
    };
  });

  // Abstract finance sine-curve waypoints
  const LINE_SEGMENTS = isMobile ? 4 : 6;
  const linePhases = Array.from({ length: LINE_SEGMENTS }, function(_, i) {
    return {
      amp:   0.04 + (i % 3) * 0.03,
      freq:  0.4  + i * 0.15,
      phase: (i * 1.3) % (Math.PI * 2),
      speed: 0.003 + i * 0.0008,
      y:     0.12 + i * 0.135,
      alpha: 0.06 + (i % 2) * 0.04,
      width: 0.7  + (i % 3) * 0.4,
    };
  });

  // Deterministic candlestick data
  var N = 200;
  var candles = (function() {
    var out = [], p = 42000;
    for (var i = 0; i < N; i++) {
      var b  = (Math.sin(i * 1.618 + 0.9) - 0.47) * p * 0.018;
      var o  = p, cv = p + b, w = p * 0.007;
      out.push({
        o: o, c: cv,
        h: Math.max(o, cv) + Math.abs(Math.sin(i * 2.3)) * w,
        l: Math.min(o, cv) - Math.abs(Math.cos(i * 1.9)) * w,
      });
      p = cv;
    }
    return out;
  })();

  function calcEma(prices, period) {
    var k = 2 / (period + 1);
    return prices.reduce(function(acc, p, i) {
      acc.push(i === 0 ? p : p * k + acc[i - 1] * (1 - k));
      return acc;
    }, []);
  }

  function draw() {
    if (!W || !H) { raf = requestAnimationFrame(draw); return; }
    ctx.clearRect(0, 0, W, H);

    // 1. Base dark gradient
    var base = ctx.createLinearGradient(0, 0, W, H);
    base.addColorStop(0,    '#06060c');
    base.addColorStop(0.45, '#07080c');
    base.addColorStop(1,    '#05060a');
    ctx.fillStyle = base;
    ctx.fillRect(0, 0, W, H);

    // 2. Large orange glow orbs — slow drift
    var orbs = [
      { cx: 0.12 + Math.sin(t * 0.004) * 0.06, cy: 0.25 + Math.cos(t * 0.003) * 0.08, r: 0.42, a: 0.12 },
      { cx: 0.88 + Math.cos(t * 0.003) * 0.05, cy: 0.70 + Math.sin(t * 0.005) * 0.07, r: 0.38, a: 0.10 },
      { cx: 0.50 + Math.sin(t * 0.006) * 0.08, cy: 0.05 + Math.cos(t * 0.004) * 0.04, r: 0.30, a: 0.07 },
      { cx: 0.25 + Math.cos(t * 0.005) * 0.04, cy: 0.88 + Math.sin(t * 0.004) * 0.05, r: 0.28, a: 0.06 },
    ];
    orbs.forEach(function(orb) {
      var gx = orb.cx * W, gy = orb.cy * H, gr = orb.r * Math.max(W, H);
      var pulse = 0.82 + 0.18 * Math.sin(t * 0.015 + orb.cx * 5);
      var grd = ctx.createRadialGradient(gx, gy, 0, gx, gy, gr * pulse);
      grd.addColorStop(0,    'rgba(247,147,26,' + (orb.a * pulse).toFixed(3) + ')');
      grd.addColorStop(0.35, 'rgba(247,147,26,' + (orb.a * 0.3 * pulse).toFixed(3) + ')');
      grd.addColorStop(0.7,  'rgba(200,110,15,' + (orb.a * 0.06 * pulse).toFixed(3) + ')');
      grd.addColorStop(1,     'rgba(247,147,26,0)');
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, W, H);
    });

    // 3. Dot-matrix grid
    if (!isMobile) {
      var dotStep = 44, dotA = 0.05;
      ctx.fillStyle = 'rgba(247,147,26,1)';
      for (var dx = dotStep / 2; dx < W; dx += dotStep) {
        for (var dy = dotStep / 2; dy < H; dy += dotStep) {
          var n  = noise(dx / W * 4, dy / H * 4, t * 0.008);
          ctx.globalAlpha = dotA * (0.5 + n * 0.5);
          ctx.beginPath();
          ctx.arc(dx, dy, 0.9, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
    }

    // 4. Horizontal & vertical hairlines (trading terminal vibe)
    ctx.lineWidth = 0.7;
    ctx.strokeStyle = 'rgba(247,147,26,0.04)';
    for (var hi = 1; hi < 9; hi++) {
      var hy = H * hi / 9;
      ctx.beginPath(); ctx.moveTo(0, hy); ctx.lineTo(W, hy); ctx.stroke();
    }
    ctx.strokeStyle = 'rgba(247,147,26,0.025)';
    for (var vi = 1; vi < 5; vi++) {
      var vx = W * vi / 5;
      ctx.beginPath(); ctx.moveTo(vx, 0); ctx.lineTo(vx, H); ctx.stroke();
    }

    // 5. Abstract finance sine curves
    linePhases.forEach(function(lp) {
      var yBase = lp.y * H;
      ctx.strokeStyle = 'rgba(247,147,26,' + lp.alpha + ')';
      ctx.lineWidth   = lp.width;
      ctx.lineJoin    = 'round';
      ctx.shadowColor = 'rgba(247,147,26,' + (lp.alpha * 0.6) + ')';
      ctx.shadowBlur  = 4;
      ctx.beginPath();
      for (var px = 0; px <= W; px += 4) {
        var progress = px / W;
        var wave1 = Math.sin(progress * Math.PI * lp.freq + t * lp.speed + lp.phase) * lp.amp;
        var wave2 = Math.sin(progress * Math.PI * lp.freq * 1.7 + t * lp.speed * 1.3) * lp.amp * 0.4;
        var py = yBase + (wave1 + wave2) * H;
        px === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
      }
      ctx.stroke();
    });
    ctx.shadowBlur = 0;

    // 6. Diagonal accent lines
    [[0.0, 0.6, 0.55, 0.0], [1.0, 0.3, 0.45, 1.0]].forEach(function(seg, i) {
      var x1r = seg[0], y1r = seg[1], x2r = seg[2], y2r = seg[3];
      var prog = (Math.sin(t * 0.005 + i * Math.PI) + 1) / 2;
      var grd = ctx.createLinearGradient(x1r * W, y1r * H, x2r * W, y2r * H);
      grd.addColorStop(0,                           'rgba(247,147,26,0)');
      grd.addColorStop(prog,                        'rgba(247,147,26,0.09)');
      grd.addColorStop(Math.min(prog + 0.15, 1),    'rgba(247,147,26,0.05)');
      grd.addColorStop(1,                           'rgba(247,147,26,0)');
      ctx.strokeStyle = grd;
      ctx.lineWidth   = 0.9;
      ctx.beginPath();
      ctx.moveTo(x1r * W, y1r * H);
      ctx.lineTo(x2r * W, y2r * H);
      ctx.stroke();
    });

    // 7. Floating orange particles
    particles.forEach(function(p, i) {
      var age   = t * p.speed + p.phase;
      var px    = ((p.x + Math.sin(age * 0.7 + i) * 0.04 + p.drift * t) % 1 + 1) % 1;
      var py    = ((p.y + Math.cos(age * 0.5 + i * 0.8) * 0.03) % 1 + 1) % 1;
      var twink = 0.3 + 0.7 * Math.abs(Math.sin(t * 0.018 + p.phase));
      var alpha = 0.07 + twink * 0.09;

      var grd = ctx.createRadialGradient(px * W, py * H, 0, px * W, py * H, p.r * 3.5);
      grd.addColorStop(0,   'rgba(247,147,26,' + alpha.toFixed(3) + ')');
      grd.addColorStop(0.5, 'rgba(247,147,26,' + (alpha * 0.3).toFixed(3) + ')');
      grd.addColorStop(1,    'rgba(247,147,26,0)');
      ctx.fillStyle = grd;
      ctx.beginPath();
      ctx.arc(px * W, py * H, p.r * 3.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = 'rgba(255,165,50,' + (alpha * 1.4).toFixed(3) + ')';
      ctx.beginPath();
      ctx.arc(px * W, py * H, p.r, 0, Math.PI * 2);
      ctx.fill();
    });

    // 8. Scrolling candlestick chart — bottom strip
    var csTop = H * 0.72, csH2 = H * 0.26, csBottom = csTop + csH2;
    var CW = 10, GAP = 5, STEP = CW + GAP;
    var scrollOffset = (t * 0.4) % (N * STEP);
    var startI = Math.max(0, Math.floor(scrollOffset / STEP) - 1);
    var visN   = Math.ceil(W / STEP) + 4;
    var vSlice = candles.slice(startI, startI + visN);
    if (vSlice.length > 2) {
      var cMin = vSlice.reduce(function(m, c) { return Math.min(m, c.l); }, Infinity) * 0.9995;
      var cMax = vSlice.reduce(function(m, c) { return Math.max(m, c.h); }, -Infinity) * 1.0005;
      var cRng = cMax - cMin || 1;
      var toY = function(p) { return csBottom - ((p - cMin) / cRng) * csH2; };
      var toX = function(i) { return i * STEP - (scrollOffset % STEP); };

      var ema9v = calcEma(vSlice.map(function(c) { return c.c; }), 9);
      ctx.strokeStyle = 'rgba(247,147,26,0.30)';
      ctx.lineWidth   = 1.1;
      ctx.lineJoin    = 'round';
      ctx.beginPath();
      var emaStarted = false;
      vSlice.forEach(function(_, i) {
        if (i >= ema9v.length) return;
        var ex = toX(i) + CW / 2, ey = toY(ema9v[i]);
        if (!emaStarted) { ctx.moveTo(ex, ey); emaStarted = true; }
        else ctx.lineTo(ex, ey);
      });
      ctx.stroke();

      vSlice.forEach(function(cd, i) {
        var x  = toX(i), up = cd.c >= cd.o;
        var a  = 0.18 + (up ? 0.05 : 0);
        ctx.strokeStyle = up
          ? 'rgba(247,147,26,' + (a + 0.15).toFixed(2) + ')'
          : 'rgba(180,100,20,' + a.toFixed(2) + ')';
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.moveTo(x + CW / 2, toY(cd.h));
        ctx.lineTo(x + CW / 2, toY(cd.l));
        ctx.stroke();
        var top2 = toY(Math.max(cd.o, cd.c));
        var bH   = Math.max(toY(Math.min(cd.o, cd.c)) - top2, 1);
        ctx.fillStyle   = up
          ? 'rgba(247,147,26,' + a.toFixed(2) + ')'
          : 'rgba(140,80,15,' + (a - 0.05).toFixed(2) + ')';
        ctx.strokeStyle = up
          ? 'rgba(247,147,26,' + (a + 0.2).toFixed(2) + ')'
          : 'rgba(180,100,20,' + (a + 0.1).toFixed(2) + ')';
        ctx.lineWidth = 0.7;
        ctx.fillRect(x, top2, CW, bH);
        ctx.strokeRect(x, top2, CW, bH);
      });
    }

    // 9. Vignette
    var vig = ctx.createRadialGradient(W / 2, H / 2, H * 0.3, W / 2, H / 2, H * 0.9);
    vig.addColorStop(0,   'rgba(0,0,0,0)');
    vig.addColorStop(0.7, 'rgba(0,0,0,0.18)');
    vig.addColorStop(1,   'rgba(0,0,0,0.55)');
    ctx.fillStyle = vig;
    ctx.fillRect(0, 0, W, H);

    t++;
    raf = requestAnimationFrame(draw);
  }

  function start() {
    resize();
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      draw();
      cancelAnimationFrame(raf);
      return;
    }
    draw();
  }

  // Defer one frame so the browser has computed viewport dimensions
  requestAnimationFrame(start);
})();
