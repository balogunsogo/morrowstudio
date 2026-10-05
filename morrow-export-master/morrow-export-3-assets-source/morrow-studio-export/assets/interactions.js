/* Morrow Studio — prototype interactions for the exported static frames.
   Vanilla JS, no dependencies. Mirrors the state logic in ../source/*.dc.html.
   Covers: home index hover, Work filters / hover preview / grid view, case-study galleries,
   mobile Work filters. Reference only — rebuild as React state in the Next.js app. */
(function () {
  var IMG = '../../assets/images/';
  var P = [
    { name: 'Aster House', slug: 'case-01-aster-house', sector: 'Hospitality', tags: ['Identity', 'Digital'], year: '2026', img: 'aster.jpg' },
    { name: 'Nocturne', slug: 'case-02-nocturne', sector: 'Culture', tags: ['Art Direction'], year: '2026', img: 'nocturne.jpg' },
    { name: 'Forma', slug: 'case-03-forma', sector: 'Architecture', tags: ['Digital'], year: '2025', img: 'forma.jpg' },
    { name: 'Arc Athletics', slug: 'case-04-arc-athletics', sector: 'Sport', tags: ['Identity'], year: '2025', img: 'arc.jpg' },
    { name: 'Halden', slug: 'case-05-halden', sector: 'Landscape', tags: ['Editorial'], year: '2025', img: 'halden.jpg' },
    { name: 'Field Notes', slug: 'case-06-field-notes', sector: 'Publishing', tags: ['Editorial', 'Digital'], year: '2024', img: 'fieldnotes.jpg' },
    { name: 'Sola Ceramics', slug: 'case-07-sola-ceramics', sector: 'Craft', tags: ['Identity', 'Art Direction'], year: '2024', img: 'sola.jpg' },
    { name: 'Kiln', slug: 'case-08-kiln', sector: 'Food & Drink', tags: ['Identity'], year: '2024', img: 'kiln.jpg' },
    { name: 'Meridian', slug: 'case-09-meridian', sector: 'Property', tags: ['Digital'], year: '2023', img: 'meridian.jpg' },
    { name: 'Open Room', slug: 'case-10-open-room', sector: 'Exhibition', tags: ['Art Direction', 'Editorial'], year: '2023', img: 'forma-2.jpg' }
  ];
  var pad = function (n) { return String(n).padStart(2, '0'); };
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var frame = document.body.getAttribute('data-frame');

  /* Desktop home — index hover swaps the sticky preview */
  if (frame === 'desktop/01-home') {
    var ix = $('section[aria-labelledby="ix"]');
    var rows = $$('.idx-row', ix);
    var prev = $('.hide-s[style*="sticky"]', ix);
    var counter = $('.g.mono p:last-child', ix);
    var set = function (i) {
      rows.forEach(function (r, k) { r.classList.toggle('on', k === i); });
      var p = P[i];
      $('img', prev).src = IMG + p.img; $('img', prev).alt = p.name;
      $('.h-p', prev).textContent = p.name;
      $('.pm .mono', prev).textContent = p.year;
      $('.pm .grey', prev).textContent = $('.mono.grey', rows[i]).textContent.split(' · ')[0];
      counter.textContent = pad(i + 1) + ' / 10';
    };
    rows.forEach(function (r, i) { r.addEventListener('mouseenter', function () { set(i); }); r.addEventListener('focus', function () { set(i); }); });
  }

  /* Desktop work — filters, hover preview, Index / Grid view */
  if (frame === 'desktop/02-work') {
    var state = { filter: 'All', view: 'list', hover: -1 };
    var listSec = $('section[aria-label="Project index"]');
    var ol = $('ol', listSec);
    var rowsW = $$('a.row', ol);
    var aside = $('aside', listSec);
    var fBtns = $$('[aria-label="Filter by discipline"] button');
    var vBtns = $$('[aria-label="View"] button');
    var grid = document.createElement('section');
    grid.className = 'g'; grid.setAttribute('aria-label', 'Project grid');
    grid.style.cssText = 'padding-top: 48px; padding-bottom: 200px; row-gap: 88px; align-items: start; display: none';
    listSec.after(grid);
    var cells = ['grid-column: span 4', 'grid-column: span 5; margin-top: 120px', 'grid-column: span 3', 'grid-column: span 3; margin-top: 64px', 'grid-column: 5 / span 4', 'grid-column: span 4; margin-top: 160px'];
    var ratios = ['4 / 5', '3 / 2', '3 / 4', '1 / 1', '4 / 5', '3 / 4'];
    var visible = function () { return P.map(function (p, i) { return i; }).filter(function (i) { return state.filter === 'All' || P[i].tags.indexOf(state.filter) > -1; }); };
    var render = function () {
      var vis = visible();
      rowsW.forEach(function (r, i) { r.parentElement.style.display = vis.indexOf(i) > -1 ? '' : 'none'; r.classList.toggle('on', i === state.hover); });
      ol.classList.toggle('hov', state.hover > -1);
      var ci = state.hover > -1 ? state.hover : (vis[0] || 0), cur = P[ci];
      $('img', aside).src = IMG + cur.img;
      $('.h-p', aside).textContent = cur.name;
      $('.pm .mono', aside).textContent = pad(ci + 1) + ' / 10';
      $('.pm .grey', aside).textContent = cur.sector + ' — ' + cur.tags.join(', ');
      fBtns.forEach(function (b) { var on = $('span', b).textContent === state.filter; b.setAttribute('aria-pressed', on); $('span', b).className = on ? 'u on' : 'u'; });
      vBtns[0].setAttribute('aria-pressed', state.view === 'list'); vBtns[1].setAttribute('aria-pressed', state.view === 'grid');
      listSec.style.display = state.view === 'list' ? '' : 'none';
      grid.style.display = state.view === 'grid' ? '' : 'none';
      grid.innerHTML = vis.map(function (i, k) {
        var p = P[i];
        return '<a class="proj" href="' + p.slug + '.html" style="' + cells[k % 6] + '"><figure class="media" style="aspect-ratio: ' + ratios[k % 6] + '"><img src="' + IMG + p.img + '" alt="' + p.name + '"></figure><div class="pm"><h2 class="h-p"><span class="u">' + p.name + '</span></h2><p class="mono">' + p.year + '</p><p class="grey" style="font-size: 14px">' + p.sector + ' — ' + p.tags.join(', ') + '</p></div></a>';
      }).join('');
      var c = pad(vis.length);
      $('h1 sup').textContent = '(' + c + ')';
      $('.nav p.mono').textContent = 'Archive — ' + c + ' projects';
    };
    rowsW.forEach(function (r, i) {
      r.addEventListener('mouseenter', function () { state.hover = i; render(); });
      r.addEventListener('focus', function () { state.hover = i; render(); });
    });
    ol.addEventListener('mouseleave', function () { state.hover = -1; render(); });
    fBtns.forEach(function (b) { b.addEventListener('click', function () { state.filter = $('span', b).textContent; state.hover = -1; render(); }); });
    vBtns[0].addEventListener('click', function () { state.view = 'list'; render(); });
    vBtns[1].addEventListener('click', function () { state.view = 'grid'; render(); });
    render();
  }

  /* Any desktop case study with a gallery module — Prev / Next (slide widths read from inline vw) */
  var gl = $('section[aria-labelledby="gl"]');
  if (gl && $('.track', gl) && $$('.ctl', gl).length === 2) {
    var track = $('.track', gl);
    var btns = $$('.ctl', gl);
    var num = $('p.mono.grey', gl);
    var W = $$('.slide', track).map(function (s) { return parseFloat(s.style.width) || 40; });
    var total = pad(W.length), g = 0;
    var go = function (n) {
      g = Math.max(0, Math.min(W.length - 1, n));
      var off = W.slice(0, g).reduce(function (a, b) { return a + b; }, 0);
      track.style.transform = 'translateX(calc(-' + off + 'vw - ' + g + ' * var(--gap)))';
      btns[0].disabled = g === 0; btns[1].disabled = g === W.length - 1;
      num.textContent = pad(g + 1) + ' / ' + total;
    };
    btns[0].addEventListener('click', function () { go(g - 1); });
    btns[1].addEventListener('click', function () { go(g + 1); });
    go(0);
  }

  /* Mobile work — filters */
  if (frame === 'mobile/03-work') {
    var mf = 'All';
    var mBtns = $$('[aria-label="Filter by discipline"] button');
    var items = $$('main ol > li');
    var mRender = function () {
      var n = 0;
      items.forEach(function (li, i) { var show = mf === 'All' || P[i].tags.indexOf(mf) > -1; li.style.display = show ? '' : 'none'; if (show) n++; });
      mBtns.forEach(function (b) { b.setAttribute('aria-pressed', b.firstChild.textContent === mf); });
      $('h1 sup').textContent = '(' + pad(n) + ')';
    };
    mBtns.forEach(function (b) { b.addEventListener('click', function () { mf = b.firstChild.textContent; mRender(); }); });
  }
})();
