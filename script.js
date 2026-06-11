// ===== CONFIGURATION =====
const WHATSAPP_NUMBER = '33749429810';

// ===== WHATSAPP BUSINESS API =====
const WA_API = {
  phoneNumberId: '1204205212767520',
  token: 'EAAZA3Aw68cpQBRux9f3BiWoMCG6PpSGqGrWZC7DY6wg9YwSoD3elzyMG0Ar3F9dGTC3sxA8uVVtIvfkDuD00mtkqzZCvCgyZAyyyacqHGos9ztBckgky06LEmIZBPei4QZA1D8PrgcrtH2LgkG6znLvp2aleezhZCs6mRlQ4xtSF8ipINGVRkNLgZBfldDfggPDKrwiQ0PjgUCSqS5utEvN1kvmsNRgi5fRCLghVhnNlNu2CnWQg9JstAwZDZD',
  recipient: '33749429810',
};

async function sendViaBusinessAPI(message) {
  const res = await fetch(
    `https://graph.facebook.com/v19.0/${WA_API.phoneNumberId}/messages`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${WA_API.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        to: WA_API.recipient,
        type: 'text',
        text: { body: message },
      }),
    }
  );
  return res.json();
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

// ===== SOUNDS (Web Audio API) =====
function getAudioCtx() {
  if (!window._ac) window._ac = new (window.AudioContext || window.webkitAudioContext)();
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
    g.gain.setValueAtTime(0.06, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
    osc.start(ctx.currentTime); osc.stop(ctx.currentTime + 0.12);
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
      g.gain.setValueAtTime(0.12, ctx.currentTime + t);
      g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + t + 0.4);
      osc.start(ctx.currentTime + t); osc.stop(ctx.currentTime + t + 0.45);
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
      g.gain.setValueAtTime(0.09, ctx.currentTime + t);
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

// ===== BUILD ORDER MESSAGE =====
function buildOrderMessage(name, phone) {
  const total = cart.reduce((s,i) => s + i.price * i.qty, 0);
  let msg = `🛎️ Nouvelle commande !\n\n👤 Nom : ${name}\n📞 Téléphone : ${phone}\n\n🍽️ Commande :\n\n`;
  cart.forEach(item => {
    msg += `• ${item.qty}x ${item.name}\n  🥤 ${item.drink}\n  🥫 ${item.sauce}\n  💰 ${fmt(item.price * item.qty)}\n\n`;
  });
  msg += `━━━━━━━━━━━━\n💵 Total : ${fmt(total)}`;
  return msg;
}

// ===== SEND WHATSAPP =====
async function sendWhatsApp() {
  const name  = document.getElementById('client-name').value.trim();
  const phone = document.getElementById('client-phone').value.trim();
  if (!name)  { alert('Veuillez saisir votre nom.');                 document.getElementById('client-name').focus();  return; }
  if (!phone) { alert('Veuillez saisir votre numéro de téléphone.'); document.getElementById('client-phone').focus(); return; }

  const btn = document.querySelector('.whatsapp-btn');
  btn.disabled = true;
  btn.textContent = '⏳ Envoi en cours...';

  const msg = buildOrderMessage(name, phone);

  try {
    const result = await sendViaBusinessAPI(msg);

    if (result.messages && result.messages[0]?.id) {
      // Succès
      playFanfare();
      launchConfetti();
      btn.textContent = '✅ Commande envoyée !';
      btn.style.background = '#1a9e4f';
      setTimeout(() => {
        closeOrderFormBtn();
        cart = [];
        renderCart();
        updateCartHeader();
        btn.disabled = false;
        btn.textContent = 'Envoyer la commande sur WhatsApp';
        btn.style.background = '';
      }, 2500);
    } else {
      throw new Error(JSON.stringify(result));
    }
  } catch (err) {
    // Fallback wa.me si l'API échoue
    console.warn('API WA échouée, fallback wa.me :', err);
    btn.disabled = false;
    btn.textContent = 'Envoyer la commande sur WhatsApp';
    playFanfare();
    launchConfetti();
    setTimeout(() => window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank'), 500);
  }
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  const sub = document.querySelector('.logo-sub');
  if (sub) setTimeout(() => typeEffect(sub, 'American Diner', 75), 600);
  document.addEventListener('click', () => {
    if (window._ac && window._ac.state === 'suspended') window._ac.resume();
  }, { once: true });
});

renderCart();
updateCartHeader();
