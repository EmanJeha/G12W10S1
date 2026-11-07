/* Graph Lab · Grade 12 · Week 10 · Session 1 · Complex Data Connections
   Build a network of cities, make it linear, then non-linear; traverse it, find a cycle, export Matplotlib code.
   Usage: const lab = mountLab(root, { fs: '18px', height: '640px', onChange() {} }) */
(function () {
  const CSS = `
.gl{--ink:#1B1F3B;font-size:var(--glfs,18px);font-family:Nunito,system-ui,sans-serif;color:var(--ink);display:grid;grid-template-columns:minmax(0,1.45fr) minmax(0,1fr);grid-template-rows:auto minmax(0,1fr);gap:.8em;height:var(--glh,640px)}
.gl *{box-sizing:border-box}
.gl-next{grid-column:1/-1;display:flex;align-items:center;gap:.8em;background:linear-gradient(90deg,#fff2c4,#fff7e0);border:3px solid #FFB020;border-radius:1em;padding:.55em .9em;font-weight:800}
.gl-next .tag{background:#FFB020;color:#fff;border-radius:.6em;padding:.25em .6em;font:900 .8em Nunito;letter-spacing:.1em;flex:none}
.gl-next .txt{flex:1;line-height:1.3}
.gl-btn{border:0;border-radius:.7em;padding:.5em .8em;font:800 .88em Nunito;cursor:pointer;background:#fff;color:var(--ink);box-shadow:0 .2em 0 #dfe3f2;white-space:nowrap}
.gl-btn.on{background:#5B5BF0;color:#fff;box-shadow:0 .2em 0 #3b3bc0}
.gl-btn.go{background:#12B886;color:#fff;box-shadow:0 .2em 0 #0b8a62}.gl-btn.cy{background:#FF5D73;color:#fff;box-shadow:0 .2em 0 #c43a4e}
.gl-board{background:#fff;border-radius:1em;box-shadow:0 .3em 0 #e4e1f5;display:flex;flex-direction:column;min-height:0;overflow:hidden}
.gl-tools{display:flex;gap:.4em;flex-wrap:wrap;padding:.55em .6em;background:#f6f7ff;align-items:center}
.gl-tools .sep{width:2px;height:1.6em;background:#e1e4f3;margin:0 .2em}
.gl-svg{flex:1;min-height:0;position:relative;background-image:radial-gradient(#e3e6f5 1.5px,transparent 1.5px);background-size:1.6em 1.6em}
.gl-svg svg{width:100%;height:100%;display:block;cursor:crosshair}
.gl-svg svg.link{cursor:pointer}.gl-svg svg.erase{cursor:not-allowed}
.gl-msg{padding:.5em .8em;font:800 .9em/1.35 Nunito;background:#f4f6ff;min-height:2.4em}
.gl-msg.good{background:#dcfbee;color:#0b6a4a}.gl-msg.bad{background:#ffe3e3;color:#a31f1f}.gl-msg.info{background:#fff2d6;color:#8a5b00}
.gl-side{display:flex;flex-direction:column;gap:.7em;min-height:0}
.gl-card{background:#fff;border-radius:1em;padding:.6em .8em;box-shadow:0 .3em 0 #e4e1f5}
.gl-h{font:900 .75em Nunito;letter-spacing:.14em;text-transform:uppercase;color:#5B5BF0;margin-bottom:.35em}
.gl-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:.4em}
.gl-stats div{background:#f6f7ff;border-radius:.7em;padding:.3em .4em;text-align:center;font:800 .75em Nunito;color:#6b7096}
.gl-stats b{display:block;font:800 1.5em 'Baloo 2',sans-serif;color:var(--ink);line-height:1.1}
.gl-verdict{margin-top:.45em;border-radius:.7em;padding:.4em .6em;font:800 .88em/1.3 Nunito}
.gl-code{background:#151936;color:#e9ecff;border-radius:.8em;padding:.5em .7em;font:500 .7em/1.45 'JetBrains Mono',monospace;white-space:pre;overflow:auto;max-height:9.5em}
.gl-code .s{color:#ffd27a}.gl-code .k{color:#c4a7ff}
.gl-mis{flex:1;min-height:0;overflow:auto}
.gl-m{display:flex;gap:.5em;align-items:flex-start;padding:.28em 0;border-top:2px solid #f2f3fa;font:700 .82em/1.3 Nunito;color:#4a5078}
.gl-m:first-of-type{border-top:0}
.gl-m .ck{flex:none;width:1.4em;height:1.4em;border-radius:.4em;background:#e7e9f5;color:#fff;display:grid;place-items:center;font-size:.85em}
.gl-m.on{color:#12884f}.gl-m.on .ck{background:#16a34a}.gl-m.cur{color:var(--ink)}.gl-m.cur .ck{background:#FFB020}
.gl-m .sm{border:0;background:#EEF0FF;color:#3730a3;border-radius:.5em;font:800 .78em Nunito;padding:.15em .45em;cursor:pointer;margin-left:auto;flex:none}
@media (max-width:900px){.gl{grid-template-columns:minmax(0,1fr);height:auto}.gl-next{flex-wrap:wrap}.gl-svg{height:22em;flex:none}}
`;
  const NAMES = ['Riyadh', 'Jeddah', 'Dammam', 'Mecca', 'Medina', 'Abha', 'Tabuk', 'Hail', 'Taif', 'Jazan', 'Najran', 'Yanbu'];
  const COLS = ['#5B5BF0', '#12B886', '#FF5D73', '#1C9BEF', '#FFB020', '#9B5DE5', '#E8337C', '#0EA5A4'];
  const NS = 'http://www.w3.org/2000/svg';
  const mk = (t, a, p) => { const e = document.createElementNS(NS, t); for (const k in a) e.setAttribute(k, a[k]); if (p) p.appendChild(e); return e; };
  const W = 900, H = 520, R = 34;
  const MISSIONS = [
    { id: 'four', t: 'Add at least 4 cities (➕ City, then tap the board)' },
    { id: 'line', t: 'Link 4+ cities in ONE straight line: a linear structure' },
    { id: 'web', t: 'Add one more link so it branches or loops: now it is non-linear' },
    { id: 'hub', t: 'Give one city 3 or more links (the most connected)' },
    { id: 'trav', t: 'Press ▶ Traverse: can you visit everything in one straight pass?' },
    { id: 'cyc', t: 'Press ♻ Find a cycle: spot the loop that could run forever' },
    { id: 'code', t: 'Copy the Python (Matplotlib) code that draws YOUR graph' },
  ];
  window.mountLab = function (root, opts = {}) {
    if (!document.getElementById('gl-css')) { const st = document.createElement('style'); st.id = 'gl-css'; st.textContent = CSS; document.head.appendChild(st); }
    const el = document.createElement('div'); el.className = 'gl'; el.style.setProperty('--glfs', opts.fs || '18px'); el.style.setProperty('--glh', opts.height || '640px');
    el.innerHTML = `<div class="gl-next"><span class="tag">NEXT</span><span class="txt"></span><button class="gl-btn on" data-a="show">▶ Show me</button></div>
      <div class="gl-board"><div class="gl-tools"><button class="gl-btn on" data-mode="city">➕ City</button><button class="gl-btn" data-mode="link">🔗 Link</button><button class="gl-btn" data-mode="erase">🗑 Erase</button><span class="sep"></span><button class="gl-btn go" data-a="trav">▶ Traverse</button><button class="gl-btn cy" data-a="cyc">♻ Find a cycle</button><span style="flex:1"></span><button class="gl-btn" data-a="clear">↺ Clear</button></div>
      <div class="gl-svg"><svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid meet"></svg></div><div class="gl-msg">Tap the board to place your first city.</div></div>
      <div class="gl-side"><div class="gl-card"><div class="gl-h">Your graph</div><div class="gl-stats"><div><b class="sN">0</b>cities</div><div><b class="sE">0</b>links</div><div><b class="sH">–</b>most links</div></div><div class="gl-verdict"></div></div>
      <div class="gl-card"><div class="gl-h" style="display:flex;align-items:center">Python · Matplotlib<span style="flex:1"></span><button class="gl-btn" data-a="copy" style="font-size:.95em;padding:.25em .6em">📋 Copy code</button></div><div class="gl-code"></div></div>
      <div class="gl-card gl-mis"><div class="gl-h">Missions</div><div class="ml"></div></div></div>`;
    root.appendChild(el);
    const svg = el.querySelector('svg'), gE = mk('g', {}, svg), gN = mk('g', {}, svg), gT = mk('g', {}, svg);
    const msgEl = el.querySelector('.gl-msg');
    let nodes = [], edges = [], mode = 'city', sel = null, nameI = 0, flags = {}, hl = { nodes: new Map(), edges: new Set() };
    const sticky = new Set();
    const msg = (t, c = '') => { msgEl.className = 'gl-msg ' + c; msgEl.innerHTML = t; };
    const ek = (a, b) => a < b ? a + '-' + b : b + '-' + a;
    const has = (a, b) => edges.some((e) => ek(e[0], e[1]) === ek(a, b));
    const deg = (id) => edges.filter((e) => e[0] === id || e[1] === id).length;
    const byId = (id) => nodes.find((n) => n.id === id);
    const nbrs = (id) => edges.filter((e) => e[0] === id || e[1] === id).map((e) => e[0] === id ? e[1] : e[0]);
    function connected() { if (!nodes.length) return false; const seen = new Set([nodes[0].id]), q = [nodes[0].id]; while (q.length) { const x = q.shift(); nbrs(x).forEach((y) => { if (!seen.has(y)) { seen.add(y); q.push(y); } }); } return seen.size === nodes.length; }
    function isLinear() { return nodes.length >= 2 && connected() && edges.length === nodes.length - 1 && nodes.every((n) => deg(n.id) <= 2); }
    function findCycle() {
      const par = new Map(), seen = new Set();
      for (const s of nodes) { if (seen.has(s.id)) continue; const st = [[s.id, null]];
        while (st.length) { const [u, p] = st.pop(); if (seen.has(u)) continue; seen.add(u); par.set(u, p);
          for (const v of nbrs(u)) { if (v === p) continue; if (seen.has(v)) { // build cycle u -> ... -> v
              const pathU = []; let x = u; while (x != null) { pathU.push(x); x = par.get(x); } const pathV = []; x = v; while (x != null) { pathV.push(x); x = par.get(x); }
              const lca = pathU.find((y) => pathV.includes(y)); if (lca == null) continue;
              const a = pathU.slice(0, pathU.indexOf(lca) + 1), b = pathV.slice(0, pathV.indexOf(lca)).reverse(); return [...a, ...b]; }
            st.push([v, u]); } } }
      return null;
    }
    function draw() {
      gE.innerHTML = ''; gN.innerHTML = '';
      edges.forEach(([a, b]) => { const A = byId(a), B = byId(b); const on = hl.edges.has(ek(a, b)); const l = mk('line', { x1: A.x, y1: A.y, x2: B.x, y2: B.y, stroke: on ? '#FF5D73' : '#aab1d4', 'stroke-width': on ? 10 : 7, 'stroke-linecap': 'round' }, gE); l.dataset.e = ek(a, b); });
      nodes.forEach((n, i) => { const g = mk('g', { transform: `translate(${n.x} ${n.y})`, class: 'gn' }, gN); g.dataset.id = n.id; const h = hl.nodes.get(n.id);
        if (sel === n.id) mk('circle', { r: R + 10, fill: 'none', stroke: '#14183a', 'stroke-width': 5, 'stroke-dasharray': '8 6' }, g);
        mk('circle', { r: R, cy: 5, fill: 'rgba(20,24,58,.14)' }, g); mk('circle', { r: R, fill: h ? h.c : n.c, stroke: '#fff', 'stroke-width': 5 }, g);
        const t = mk('text', { 'text-anchor': 'middle', 'dominant-baseline': 'central', y: 1, 'font-size': 26, 'font-family': 'Baloo 2, sans-serif', 'font-weight': 800, fill: '#fff' }, g); t.textContent = h && h.lab ? h.lab : n.name[0];
        const lb = mk('text', { 'text-anchor': 'middle', y: R + 24, 'font-size': 21, 'font-family': 'Nunito, sans-serif', 'font-weight': 800, fill: '#1B1F3B' }, g); lb.textContent = n.name;
        const d = deg(n.id); if (d) { mk('circle', { cx: R - 4, cy: -R + 4, r: 13, fill: '#14183a' }, g); const dt = mk('text', { x: R - 4, y: -R + 5, 'text-anchor': 'middle', 'dominant-baseline': 'central', 'font-size': 15, 'font-weight': 800, fill: '#fff', 'font-family': 'Nunito' }, g); dt.textContent = d; } });
    }
    function code() {
      const pos = nodes.map((n) => `    "${n.name}": (${((n.x - W / 2) / 150).toFixed(1)}, ${((H / 2 - n.y) / 150).toFixed(1)}),`);
      const con = edges.map(([a, b]) => `    ("${byId(a).name}", "${byId(b).name}"),`);
      return ['import matplotlib.pyplot as plt', 'positions = {', ...pos, '}', 'connections = [', ...con, ']', 'plt.figure(figsize=(6, 6))', 'for city, (x, y) in positions.items():', '    plt.scatter(x, y, s=4000, color="skyblue")', '    plt.text(x, y, city, ha="center")', 'for c1, c2 in connections:', '    plt.annotate("", xy=positions[c2], xytext=positions[c1],', '        arrowprops=dict(arrowstyle="<->", color="gray", shrinkA=38, shrinkB=38))', 'plt.margins(0.4)', 'plt.axis("off")', 'plt.show()'].join('\n');
    }
    const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
    const done = (id) => { switch (id) { case 'four': return nodes.length >= 4; case 'line': return !!flags.line; case 'web': return !!flags.web; case 'hub': return nodes.some((n) => deg(n.id) >= 3); case 'trav': return !!flags.trav; case 'cyc': return !!flags.cyc; case 'code': return !!flags.code; } };
    const tasks = () => MISSIONS.map((m) => { if (done(m.id)) sticky.add(m.id); return [m.t, sticky.has(m.id)]; });
    let nextM = null;
    function paint() {
      if (nodes.length >= 4 && isLinear()) flags.line = true;
      if (flags.line && nodes.length >= 4 && connected() && !isLinear()) flags.web = true;
      draw();
      el.querySelector('.sN').textContent = nodes.length; el.querySelector('.sE').textContent = edges.length;
      const hub = nodes.reduce((m, n) => !m || deg(n.id) > deg(m.id) ? n : m, null); el.querySelector('.sH').textContent = hub && deg(hub.id) ? hub.name : '–';
      const v = el.querySelector('.gl-verdict');
      if (nodes.length < 2) { v.style.background = '#f4f6ff'; v.style.color = '#6b7096'; v.innerHTML = 'Add cities and links to see if your structure is linear or non-linear.'; }
      else if (!connected()) { v.style.background = '#fff2d6'; v.style.color = '#8a5b00'; v.innerHTML = '🧩 Not all connected yet: link every city.'; }
      else if (isLinear()) { v.style.background = '#e3f3ff'; v.style.color = '#0d5ea8'; v.innerHTML = '➡️ <b>LINEAR</b>: one straight line, each city links to the previous and next. One pass visits all.'; }
      else { const cy = !!findCycle(), br = nodes.some((n) => deg(n.id) >= 3); v.style.background = '#ffe8ec'; v.style.color = '#c0264a'; v.innerHTML = `🕸️ <b>NON-LINEAR</b>: ${br ? 'a city branches to 3+ others' : ''}${br && cy ? ' and ' : ''}${cy ? 'there is a loop (cycle)' : ''}. No single straight pass.`; }
      el.querySelector('.gl-code').innerHTML = esc(code()).replace(/(&quot;|")([^"\n]*?)"/g, '<span class="s">"$2"</span>').replace(/\b(import|for|in|as)\b/g, '<span class="k">$1</span>');
      const ts = tasks(); nextM = MISSIONS.find((m, i) => !ts[i][1]);
      el.querySelector('.ml').innerHTML = MISSIONS.map((m, i) => `<div class="gl-m ${ts[i][1] ? 'on' : m === nextM ? 'cur' : ''}"><span class="ck">${ts[i][1] ? '✓' : i + 1}</span><span>${m.t}</span><button class="sm" data-m="${i}">show</button></div>`).join('');
      el.querySelector('.gl-next .txt').innerHTML = nextM ? nextM.t : '🎉 All missions complete! Build a bigger network and test it again.';
      el.querySelectorAll('.ml [data-m]').forEach((b) => b.onclick = () => playDemo(MISSIONS[+b.dataset.m]));
      opts.onChange && opts.onChange();
    }
    const clearHL = () => { hl = { nodes: new Map(), edges: new Set() }; };
    function addCity(x, y) { if (nodes.length >= NAMES.length) { msg('That is plenty of cities! Link them up.', 'info'); return; } const n = { id: nameI, name: NAMES[nameI % NAMES.length], x, y, c: COLS[nameI % COLS.length] }; nameI++; nodes.push(n); clearHL(); msg(`➕ <b>${n.name}</b> added. ${nodes.length < 4 ? 'Add more cities.' : 'Now press 🔗 Link and connect them.'}`); paint(); return n; }
    function toggleLink(a, b) { if (a === b) return; clearHL(); if (has(a, b)) { edges = edges.filter((e) => ek(e[0], e[1]) !== ek(a, b)); msg(`✂ Link ${byId(a).name} – ${byId(b).name} removed.`); } else { edges.push([a, b]); msg(`🔗 <b>${byId(a).name}</b> ↔ <b>${byId(b).name}</b> linked.`, 'good'); } paint(); }
    const pt = (ev) => { const r = svg.getBoundingClientRect(), s = Math.min(r.width / W, r.height / H), ox = (r.width - W * s) / 2, oy = (r.height - H * s) / 2; return [(ev.clientX - r.left - ox) / s, (ev.clientY - r.top - oy) / s]; };
    svg.addEventListener('click', (ev) => {
      const g = ev.target.closest('.gn'), line = ev.target.closest('line');
      if (mode === 'city') { if (g) { msg('Switch to 🔗 Link to connect cities.', 'info'); return; } let [x, y] = pt(ev); x = Math.max(R + 10, Math.min(W - R - 10, x)); y = Math.max(R + 10, Math.min(H - R - 34, y)); if (nodes.some((n) => Math.hypot(n.x - x, n.y - y) < R * 2.4)) { msg('Too close to another city: tap a bit further away.', 'info'); return; } addCity(x, y); return; }
      if (mode === 'link') { if (!g) { sel = null; draw(); return; } const id = +g.dataset.id; if (sel == null) { sel = id; draw(); msg(`Now tap the city to link with <b>${byId(id).name}</b>.`); } else { const a = sel; sel = null; toggleLink(a, id); } return; }
      if (mode === 'erase') { if (g) { const id = +g.dataset.id; const nm = byId(id).name; nodes = nodes.filter((n) => n.id !== id); edges = edges.filter((e) => e[0] !== id && e[1] !== id); clearHL(); msg(`🗑 ${nm} removed.`); paint(); } else if (line) { edges = edges.filter((e) => ek(e[0], e[1]) !== line.dataset.e); clearHL(); msg('🗑 Link removed.'); paint(); } }
    });
    const setMode = (m) => { mode = m; sel = null; el.querySelectorAll('[data-mode]').forEach((b) => b.classList.toggle('on', b.dataset.mode === m)); svg.setAttribute('class', m); draw(); };
    el.querySelectorAll('[data-mode]').forEach((b) => b.onclick = () => setMode(b.dataset.mode));
    let anim = 0;
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
    async function traverse() {
      if (nodes.length < 2) { msg('Add some cities and links first.', 'info'); return; }
      const my = ++anim; clearHL(); const start = nodes[0].id, order = [], seen = new Set([start]), q = [start];
      while (q.length) { const x = q.shift(); order.push(x); nbrs(x).forEach((y) => { if (!seen.has(y)) { seen.add(y); q.push(y); } }); }
      for (let i = 0; i < order.length; i++) { if (my !== anim) return; hl.nodes.set(order[i], { c: '#14183a', lab: String(i + 1) }); draw(); await sleep(520); }
      flags.trav = true; const missed = nodes.length - order.length, lin = isLinear();
      msg(`▶ Visit order: <b>${order.map((i) => byId(i).name).join(' → ')}</b>. ${missed ? `⚠ ${missed} city(ies) are not connected, so they were never reached!` : lin ? '✅ Linear: one straight pass visited every city.' : '🕸️ Non-linear: we had to branch out level by level and keep track of visited cities. No single straight pass.'}`, missed ? 'bad' : lin ? 'good' : 'info');
      paint();
    }
    async function cycle() {
      const my = ++anim; clearHL(); const c = findCycle();
      if (!c) { draw(); msg(edges.length ? '✅ No cycle: no city path loops back to itself. Add a link that closes a loop to see one!' : 'Add links first.', 'good'); return; }
      for (let i = 0; i < c.length; i++) { if (my !== anim) return; hl.nodes.set(c[i], { c: '#FF5D73' }); hl.edges.add(ek(c[i], c[(i + 1) % c.length])); draw(); await sleep(380); }
      flags.cyc = true; msg(`♻ Cycle: <b>${[...c, c[0]].map((i) => byId(i).name).join(' → ')}</b>. Without a “visited” check, a program could go round forever!`, 'bad'); paint();
    }
    el.querySelector('[data-a="trav"]').onclick = traverse;
    el.querySelector('[data-a="cyc"]').onclick = cycle;
    el.querySelector('[data-a="copy"]').onclick = () => { const t = code(); flags.code = true; try { navigator.clipboard.writeText(t).catch(() => { }); } catch (e) { } msg('📋 Code copied! Paste it into Visual Studio Code and run it (pip install matplotlib first).', 'good'); paint(); };
    el.querySelector('[data-a="clear"]').onclick = () => { anim++; nodes = []; edges = []; nameI = 0; sel = null; clearHL(); msg('Fresh board: tap to place a city.'); setMode('city'); paint(); };
    // demo
    const P = [[150, 380], [330, 160], [540, 330], [740, 140], [700, 420]];
    let busy = false;
    async function playDemo(m) {
      if (busy) return; busy = true;
      const ensure = async (k) => { while (nodes.length < k) { setMode('city'); const [x, y] = P[nodes.length % P.length]; addCity(x + (nodes.length >= P.length ? 30 : 0), y); await sleep(450); } };
      const link = async (i, j) => { const a = nodes[i], b = nodes[j]; if (!a || !b || has(a.id, b.id)) return; setMode('link'); sel = a.id; draw(); await sleep(300); sel = null; toggleLink(a.id, b.id); await sleep(450); };
      if (m.id === 'four') await ensure(4);
      if (m.id === 'line') { await ensure(4); edges = []; paint(); for (let i = 0; i < 3; i++) await link(i, i + 1); }
      if (m.id === 'web') { if (!flags.line) await playDemo0(MISSIONS[1]); await link(0, 2); }
      if (m.id === 'hub') { await ensure(5); await link(2, 4); await link(1, 2); if (!nodes.some((n) => deg(n.id) >= 3)) await link(2, 0); }
      if (m.id === 'trav') { await ensure(4); if (!edges.length) for (let i = 0; i < 3; i++) await link(i, i + 1); busy = false; await traverse(); return; }
      if (m.id === 'cyc') { await ensure(4); if (!findCycle()) { await link(0, 1); await link(1, 2); await link(0, 2); } busy = false; await cycle(); return; }
      if (m.id === 'code') { el.querySelector('[data-a="copy"]').click(); }
      busy = false;
    }
    async function playDemo0(m) { busy = false; await playDemo(m); busy = true; }
    el.querySelector('[data-a="show"]').onclick = () => nextM && playDemo(nextM);
    setMode('city'); paint();
    return {
      el, tasks,
      demoStep() { if (busy || !nextM) return false; playDemo(nextM); return true; },
      async demo() { for (const m of MISSIONS) if (!sticky.has(m.id)) { await playDemo(m); await sleep(900); } },
      reset() { el.querySelector('[data-a="clear"]').click(); flags = {}; sticky.clear(); paint(); },
    };
  };
})();
