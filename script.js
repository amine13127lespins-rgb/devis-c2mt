// ===== FIREBASE CONFIG =====
const firebaseConfig = {
  apiKey: "AIzaSyDh0f3x8Vj2u8S7-NBjVmV7KNE2RY5bLA8",
  authDomain: "bene-diners.firebaseapp.com",
  databaseURL: "https://bene-diners-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "bene-diners",
  storageBucket: "bene-diners.firebasestorage.app",
  messagingSenderId: "655264478961",
  appId: "1:655264478961:web:848148ab9f1d52951d1b50"
};

let _db = null;
function getDB() {
  if (_db) return _db;
  if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
  _db = firebase.database();
  return _db;
}

// ===== PRODUCTS DATA =====
const products = {
  1: { name: 'Menu Big Mac', price: 12.25 },
  2: { name: 'Menu Double Cheeseburger', price: 13.60 },
  3: { name: 'Menu Golden Big Mac', price: 16.05 },
  4: { name: 'Menu Double Filet Fish', price: 12.75 },
  5: { name: 'Wings x10', price: 15.00 },
  6: { name: 'Long Fish', price: 14.00 },
  7: { name: 'ClassiQ Crispy Onions Beef', price: 10.00 },
};

// ===== STATE =====
let cart = [];
let currentProductId = null;
let cartOpen = false;

// ===== FORMAT PRICE =====
function fmt(n) {
  return n.toFixed(2).replace('.', ',') + ' €';
}

// ===== ORDER TYPE =====
let orderType = 'takeaway';
let selectedTable = null;

function selectOrderType(type) {
  orderType = type;
  document.getElementById('btn-takeaway').classList.toggle('active', type === 'takeaway');
  document.getElementById('btn-dine').classList.toggle('active', type === 'dine');
  const ts = document.getElementById('table-select');
  if (ts) ts.style.display = type === 'dine' ? 'block' : 'none';
  if (type === 'takeaway') { selectedTable = null; document.querySelectorAll('.table-btn').forEach(b => b.classList.remove('active')); }
}

function selectTable(n) {
  selectedTable = n;
  document.querySelectorAll('.table-btn').forEach((b, i) => b.classList.toggle('active', i + 1 === n));
  playBlip();
}

// ===== SOUNDS (Web Audio API) =====
function getAudioCtx() {
  if (!window._ac) window._ac = new (window.AudioContext || window.webkitAudioContext)();
  if (window._ac.state === 'suspended') window._ac.resume();
  return window._ac;
}

function playBlip() {
  try {
    const ctx = getAudioCtx();
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.connect(g); g.connect(ctx.destination);
    osc.type = 'square';
    osc.frequency.setValueAtTime(660, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.05);
    g.gain.setValueAtTime(0.12, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
    osc.start(ctx.currentTime); osc.stop(ctx.currentTime + 0.14);
  } catch(e) {}
}

function playDing() {
  try {
    const ctx = getAudioCtx();
    [[880, 0], [1100, 0.13], [1320, 0.26]].forEach(([freq, t]) => {
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.connect(g); g.connect(ctx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + t);
      g.gain.setValueAtTime(0.18, ctx.currentTime + t);
      g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + t + 0.5);
      osc.start(ctx.currentTime + t); osc.stop(ctx.currentTime + t + 0.55);
    });
  } catch(e) {}
}

function playFanfare() {
  try {
    const ctx = getAudioCtx();
    [[523,0],[659,0.13],[784,0.26],[1047,0.39],[784,0.52],[1047,0.6]].forEach(([freq, t]) => {
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.connect(g); g.connect(ctx.destination);
      osc.type = 'square';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + t);
      g.gain.setValueAtTime(0.12, ctx.currentTime + t);
      g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + t + 0.38);
      osc.start(ctx.currentTime + t); osc.stop(ctx.currentTime + t + 0.4);
    });
  } catch(e) {}
}

// ===== TYPING EFFECT =====
function typeEffect(el, text, speed = 75) {
  el.textContent = '';
  let i = 0;
  const iv = setInterval(() => {
    if (i < text.length) el.textContent += text[i++];
    else clearInterval(iv);
  }, speed);
}

// ===== FLYING ITEM ANIMATION =====
function flyToCart(sourceEl) {
  const dot = document.getElementById('fly-dot');
  if (!dot || !sourceEl) return;
  const cartBtn = document.querySelector('.cart-btn') || document.querySelector('.fab-cart');
  if (!cartBtn) return;
  const src = sourceEl.getBoundingClientRect();
  const dst = cartBtn.getBoundingClientRect();
  dot.style.cssText = `
    left:${src.left + src.width/2}px;
    top:${src.top + src.height/2}px;
    opacity:1;
    transform:scale(1);
    transition:none;
  `;
  requestAnimationFrame(() => requestAnimationFrame(() => {
    dot.style.transition = 'all 0.55s cubic-bezier(0.25,0.46,0.45,0.94)';
    dot.style.left = (dst.left + dst.width/2) + 'px';
    dot.style.top  = (dst.top  + dst.height/2) + 'px';
    dot.style.opacity = '0';
    dot.style.transform = 'scale(0.2)';
  }));
  setTimeout(() => { dot.style.transition = 'none'; dot.style.opacity = '0'; }, 700);
}

// ===== CONFETTI BURST =====
function launchConfetti() {
  const c = document.getElementById('confetti-container');
  if (!c) return;
  c.innerHTML = '';
  const colors = ['#ff1a1a','#ffd700','#ff6a00','#ffffff','#ff69b4','#00ffff'];
  for (let i = 0; i < 70; i++) {
    const p = document.createElement('div');
    p.className = 'confetti-piece';
    p.style.cssText = `
      left:${Math.random()*100}vw;
      top:${-(Math.random()*10+5)}vh;
      background:${colors[Math.floor(Math.random()*colors.length)]};
      width:${Math.random()*8+4}px;
      height:${Math.random()*8+4}px;
      border-radius:${Math.random()>0.5?'50%':'2px'};
      animation-duration:${Math.random()*1+1.2}s;
      animation-delay:${Math.random()*0.6}s;
    `;
    c.appendChild(p);
  }
  setTimeout(() => { c.innerHTML = ''; }, 3000);
}

// ===== ODOMETER ANIMATION =====
function animateValue(el, end, duration) {
  const raw = el.textContent.replace(/[^\d,]/g,'').replace(',','.');
  const start = parseFloat(raw) || 0;
  const t0 = performance.now();
  function update(t) {
    const prog = Math.min((t - t0) / duration, 1);
    el.textContent = (start + (end - start) * prog).toFixed(2).replace('.',',') + ' €';
    if (prog < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

// ===== BOUNCE =====
function bounceBtn(btn) {
  if (!btn) return;
  btn.classList.remove('bounce');
  void btn.offsetWidth;
  btn.classList.add('bounce');
  setTimeout(() => btn.classList.remove('bounce'), 500);
}

// ===== CART SHAKE =====
function shakeCartBtn() {
  const btn = document.querySelector('.cart-btn');
  if (!btn) return;
  btn.classList.remove('shake');
  void btn.offsetWidth;
  btn.classList.add('shake');
  setTimeout(() => btn.classList.remove('shake'), 600);
}

// ===== CATEGORY FILTER =====
function filterCat(cat, btn) {
  playBlip();
  document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
  if (btn && btn.classList.contains('cat-btn')) btn.classList.add('active');
  const cards = document.querySelectorAll('.product-card');
  let visible = 0;
  cards.forEach(card => {
    const cats = card.dataset.cat || '';
    const match = cat === 'all' || cats.split(' ').includes(cat);
    card.style.display = match ? '' : 'none';
    if (match) visible++;
  });
  document.getElementById('no-results').style.display = visible === 0 ? 'block' : 'none';
}

function setMobileNav(btn) {
  document.querySelectorAll('.mobile-nav-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

// ===== SEARCH =====
function filterSearch(val) {
  const q = val.trim().toLowerCase();
  const cards = document.querySelectorAll('.product-card');
  let visible = 0;
  cards.forEach(card => {
    const name = card.querySelector('.product-name').textContent.toLowerCase();
    const desc = (card.querySelector('.product-desc')||{}).textContent?.toLowerCase()||'';
    const match = !q || name.includes(q) || desc.includes(q);
    card.style.display = match ? '' : 'none';
    if (match) visible++;
  });
  document.getElementById('no-results').style.display = visible === 0 ? 'block' : 'none';
}

// ===== CUSTOMIZE MODAL =====
function openCustomize(id, btn) {
  bounceBtn(btn);
  playBlip();
  currentProductId = id;
  const p = products[id];
  document.getElementById('modal-product-name').textContent = p.name;
  document.getElementById('modal-product-price').textContent = fmt(p.price);
  document.querySelectorAll('input[name="drink"]').forEach(r => r.checked = false);
  document.querySelectorAll('input[name="sauce"]').forEach(r => r.checked = false);
  switchDrinkTab('small', document.querySelector('.drink-tab'));
  document.getElementById('customize-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCustomize(e) {
  if (e.target === document.getElementById('customize-overlay')) closeCustomizeBtn();
}
function closeCustomizeBtn() {
  playBlip();
  document.getElementById('customize-overlay').classList.remove('open');
  document.body.style.overflow = '';
}

function switchDrinkTab(type, btn) {
  playBlip();
  document.querySelectorAll('.drink-tab').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.drink-options').forEach(d => d.classList.remove('active'));
  if (btn) btn.classList.add('active');
  document.getElementById('drinks-' + type).classList.add('active');
}

// ===== ADD TO CART =====
function addToCart() {
  const drinkEl = document.querySelector('input[name="drink"]:checked');
  const sauceEl = document.querySelector('input[name="sauce"]:checked');
  if (!drinkEl) { alert('Veuillez choisir une boisson.'); return; }
  if (!sauceEl) { alert('Veuillez choisir une sauce.'); return; }

  const p = products[currentProductId];
  const item = {
    id: Date.now(),
    productId: currentProductId,
    name: p.name,
    price: p.price,
    drink: drinkEl.value,
    sauce: sauceEl.value,
    qty: 1,
  };

  playDing();
  flyToCart(document.querySelector('.modal-add-btn'));
  cart.push(item);
  closeCustomizeBtn();
  setTimeout(() => {
    renderCart();
    updateCartHeader();
    shakeCartBtn();
  }, 350);
}

// ===== REMOVE / QTY =====
function removeItem(id) {
  playBlip();
  cart = cart.filter(i => i.id !== id);
  renderCart();
  updateCartHeader();
}

function changeQty(id, delta) {
  playBlip();
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) { removeItem(id); return; }
  renderCart();
  updateCartHeader();
}

// ===== RENDER CART =====
function cartItemHTML(item) {
  const subtotal = item.price * item.qty;
  return `
    <div class="cart-item" id="ci-${item.id}">
      <div class="cart-item-header">
        <span class="cart-item-name">${item.name}</span>
        <span class="cart-item-price">${fmt(subtotal)}</span>
      </div>
      <div class="cart-item-details">🥤 ${item.drink}<br>🥫 ${item.sauce}</div>
      <div class="cart-item-controls">
        <div class="qty-controls">
          <button class="qty-btn" onclick="changeQty(${item.id},-1)">−</button>
          <span class="qty-num">${item.qty}</span>
          <button class="qty-btn" onclick="changeQty(${item.id},1)">+</button>
        </div>
        <button class="remove-btn" onclick="removeItem(${item.id})">🗑 Supprimer</button>
      </div>
    </div>`;
}

function renderCart() {
  const total = cart.reduce((s,i) => s + i.price * i.qty, 0);
  const hasItems = cart.length > 0;

  const sideItems = document.getElementById('cart-items');
  const sideFooter = document.getElementById('cart-footer');
  if (sideItems) {
    sideItems.innerHTML = hasItems
      ? cart.map(cartItemHTML).join('')
      : '<div class="cart-empty"><span>🍔</span><p>Votre panier est vide</p><small>Ajoutez des produits pour commander</small></div>';
    if (sideFooter) {
      sideFooter.style.display = hasItems ? 'block' : 'none';
      const st = document.getElementById('cart-subtotal');
      const tt = document.getElementById('cart-total');
      if (st) animateValue(st, total, 400);
      if (tt) animateValue(tt, total, 400);
    }
  }

  const mobItems = document.getElementById('cart-items-mobile');
  const mobFooter = document.getElementById('cart-footer-mobile');
  if (mobItems) {
    mobItems.innerHTML = hasItems
      ? cart.map(cartItemHTML).join('')
      : '<div class="cart-empty"><span>🍔</span><p>Votre panier est vide</p></div>';
    if (mobFooter) {
      mobFooter.style.display = hasItems ? 'block' : 'none';
      const sm = document.getElementById('cart-subtotal-mobile');
      const tm = document.getElementById('cart-total-mobile');
      if (sm) sm.textContent = fmt(total);
      if (tm) tm.textContent = fmt(total);
    }
  }
}

function updateCartHeader() {
  const count = cart.reduce((s,i) => s + i.qty, 0);
  const total = cart.reduce((s,i) => s + i.price * i.qty, 0);
  document.getElementById('cart-count').textContent = count;
  document.getElementById('cart-total-header').textContent = fmt(total);
  const fc = document.getElementById('fab-count');
  const ft = document.getElementById('fab-total');
  if (fc) fc.textContent = count;
  if (ft) ft.textContent = fmt(total);
  const fab = document.getElementById('fab-cart');
  if (fab) fab.style.display = count > 0 ? 'flex' : 'none';
}

// ===== CART TOGGLE =====
function toggleCart() {
  playBlip();
  cartOpen = !cartOpen;
  const overlay = document.getElementById('cart-overlay');
  const panel   = document.getElementById('cart-mobile');
  if (cartOpen) {
    overlay.classList.add('open'); panel.classList.add('open');
    document.body.style.overflow = 'hidden';
  } else {
    overlay.classList.remove('open'); panel.classList.remove('open');
    document.body.style.overflow = '';
  }
}

// ===== ORDER FORM =====
function openOrderForm() {
  playBlip();
  if (cart.length === 0) { alert('Votre panier est vide.'); return; }
  if (cartOpen) toggleCart();
  const total = cart.reduce((s,i) => s + i.price * i.qty, 0);
  let recapHTML = '';
  cart.forEach(item => {
    recapHTML += `<div><span class="recap-item-name">${item.qty}x ${item.name}</span><br>&nbsp;&nbsp;🥤 ${item.drink} · 🥫 ${item.sauce} · ${fmt(item.price * item.qty)}</div><br>`;
  });
  document.getElementById('order-recap').innerHTML = recapHTML;
  document.getElementById('order-total-display').textContent = fmt(total);
  document.getElementById('order-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeOrderForm(e) {
  if (e.target === document.getElementById('order-overlay')) closeOrderFormBtn();
}
function closeOrderFormBtn() {
  playBlip();
  document.getElementById('order-overlay').classList.remove('open');
  document.body.style.overflow = '';
}

// ===== SEND ORDER TO FIREBASE =====
async function getNextOrderNumber() {
  const snap = await getDB().ref('orderCounter').transaction(n => (n || 99) + 1);
  return snap.snapshot.val();
}

async function saveOrder() {
  const name  = document.getElementById('client-name').value.trim();
  const phone = document.getElementById('client-phone').value.trim();
  if (!name)  { alert('Veuillez saisir votre nom.');                 document.getElementById('client-name').focus();  return; }
  if (!phone) { alert('Veuillez saisir votre numéro de téléphone.'); document.getElementById('client-phone').focus(); return; }

  if (orderType === 'dine' && !selectedTable) {
    alert('Veuillez sélectionner votre numéro de table.');
    return;
  }

  const btn = document.querySelector('.whatsapp-btn');
  btn.disabled = true;
  btn.textContent = '⏳ Envoi en cours...';

  try {
    const total = cart.reduce((s,i) => s + i.price * i.qty, 0);
    const orderNum = await getNextOrderNumber();
    const order = {
      clientName: name,
      clientPhone: phone,
      orderType: orderType,
      tableNumber: orderType === 'dine' ? selectedTable : null,
      items: cart.map(item => ({
        qty: item.qty,
        name: item.name,
        drink: item.drink,
        sauce: item.sauce,
        subtotal: fmt(item.price * item.qty),
      })),
      total: fmt(total),
      status: 'new',
      timestamp: Date.now(),
      orderNumber: String(orderNum),
    };

    await getDB().ref('orders').push(order);
    closeOrderFormBtn();
    cart = [];
    renderCart();
    updateCartHeader();
    btn.disabled = false;
    btn.textContent = '🛎️ Envoyer la commande';
    btn.style.background = '';
    selectOrderType('takeaway');
    showOrderConfirmation(orderNum);
  } catch (err) {
    btn.disabled = false;
    btn.textContent = '🛎️ Envoyer la commande';
    alert('Erreur : ' + (err?.message || err));
  }
}

// ===== ORDER CONFIRMATION + FUNK MUSIC =====
let _musicCtx = null;
let _musicTimer = null;
let _musicBeat = 0;
let _musicNext = 0;

const _BASS = [82,0,0,110,82,0,98,0,82,0,82,0,110,98,82,0,82,0,0,110,82,0,131,0,147,0,131,0,110,98,82,0];
const _KICK  = new Set([0,8,16,24]);
const _SNARE = new Set([4,12,20,28]);
const _BPM   = 108;
const _16TH  = 60 / _BPM / 4;

function _mkNoise(ctx, dur) {
  const sz = Math.floor(ctx.sampleRate * dur);
  const buf = ctx.createBuffer(1, sz, ctx.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < sz; i++) d[i] = Math.random() * 2 - 1;
  return buf;
}

function _schedFunk(ctx, step, t) {
  const freq = _BASS[step % 32];
  if (freq) {
    const osc = ctx.createOscillator(), flt = ctx.createBiquadFilter(), g = ctx.createGain();
    osc.type = 'sawtooth'; osc.frequency.value = freq;
    flt.type = 'lowpass'; flt.frequency.value = 480; flt.Q.value = 6;
    osc.connect(flt); flt.connect(g); g.connect(ctx.destination);
    g.gain.setValueAtTime(0.38, t); g.gain.exponentialRampToValueAtTime(0.001, t + _16TH * 0.85);
    osc.start(t); osc.stop(t + _16TH);
  }
  if (_KICK.has(step % 32)) {
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.connect(g); g.connect(ctx.destination); o.type = 'sine';
    o.frequency.setValueAtTime(180, t); o.frequency.exponentialRampToValueAtTime(38, t + 0.1);
    g.gain.setValueAtTime(0.85, t); g.gain.exponentialRampToValueAtTime(0.001, t + 0.22);
    o.start(t); o.stop(t + 0.25);
  }
  if (_SNARE.has(step % 32)) {
    const src = ctx.createBufferSource(), flt = ctx.createBiquadFilter(), g = ctx.createGain();
    src.buffer = _mkNoise(ctx, 0.12); flt.type = 'bandpass'; flt.frequency.value = 1400; flt.Q.value = 0.6;
    src.connect(flt); flt.connect(g); g.connect(ctx.destination);
    g.gain.setValueAtTime(0.35, t); g.gain.exponentialRampToValueAtTime(0.001, t + 0.1);
    src.start(t); src.stop(t + 0.13);
  }
  const src2 = ctx.createBufferSource(), flt2 = ctx.createBiquadFilter(), g2 = ctx.createGain();
  src2.buffer = _mkNoise(ctx, 0.04); flt2.type = 'highpass'; flt2.frequency.value = 8000;
  src2.connect(flt2); flt2.connect(g2); g2.connect(ctx.destination);
  const hVol = step % 2 === 0 ? 0.1 : 0.06;
  g2.gain.setValueAtTime(hVol, t); g2.gain.exponentialRampToValueAtTime(0.001, t + 0.03);
  src2.start(t); src2.stop(t + 0.04);
}

function _musicTick() {
  if (!_musicCtx) return;
  while (_musicNext < _musicCtx.currentTime + 0.12) {
    _schedFunk(_musicCtx, _musicBeat, _musicNext);
    _musicNext += _16TH;
    _musicBeat++;
  }
}
function startFunk() {
  if (_musicCtx) return;
  _musicCtx = new (window.AudioContext || window.webkitAudioContext)();
  _musicNext = _musicCtx.currentTime + 0.1;
  _musicBeat = 0;
  _musicTick();
  _musicTimer = setInterval(_musicTick, 25);
}
function stopFunk() {
  clearInterval(_musicTimer); _musicTimer = null;
  if (_musicCtx) { _musicCtx.close(); _musicCtx = null; }
}

function showOrderConfirmation(num) {
  const el = document.getElementById('confirm-number');
  if (el) el.textContent = num;
  const ov = document.getElementById('order-confirm-overlay');
  if (ov) ov.style.display = 'flex';
  document.body.style.overflow = 'hidden';
  startFunk();
}
function closeConfirm() {
  stopFunk();
  const ov = document.getElementById('order-confirm-overlay');
  if (ov) ov.style.display = 'none';
  document.body.style.overflow = '';
  launchConfetti();
  playFanfare();
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  // Scroll reveal for product cards
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.product-card').forEach(card => observer.observe(card));

  document.addEventListener('click', () => {
    if (!window._ac) window._ac = new (window.AudioContext || window.webkitAudioContext)();
    window._ac.resume();
  });
});

renderCart();
updateCartHeader();
