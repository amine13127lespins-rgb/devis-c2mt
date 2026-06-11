// ===== CONFIGURATION =====
// Modifier ce numéro WhatsApp (format international, sans + ni espaces)
const WHATSAPP_NUMBER = '33749429810';

// ===== PRODUCTS DATA =====
const products = {
  1: { name: 'Menu Big Mac', price: 12.25 },
  2: { name: 'Menu Double Cheeseburger', price: 13.60 },
  3: { name: 'Menu Golden Big Mac', price: 16.05 },
  4: { name: 'Menu Double Filet Fish', price: 12.75 },
  5: { name: 'Menu Nuggets', price: 12.15 },
};

// ===== STATE =====
let cart = [];
let currentProductId = null;
let cartOpen = false;

// ===== FORMAT PRICE =====
function fmt(n) {
  return n.toFixed(2).replace('.', ',') + ' €';
}

// ===== CATEGORY FILTER =====
function filterCat(cat, btn) {
  // Desktop cats
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
    const desc = (card.querySelector('.product-desc') || {}).textContent?.toLowerCase() || '';
    const match = !q || name.includes(q) || desc.includes(q);
    card.style.display = match ? '' : 'none';
    if (match) visible++;
  });
  document.getElementById('no-results').style.display = visible === 0 ? 'block' : 'none';
}

// ===== CUSTOMIZE MODAL =====
function openCustomize(id) {
  currentProductId = id;
  const p = products[id];
  document.getElementById('modal-product-name').textContent = p.name;
  document.getElementById('modal-product-price').textContent = fmt(p.price);

  // Reset selections
  document.querySelectorAll('input[name="drink"]').forEach(r => r.checked = false);
  document.querySelectorAll('input[name="sauce"]').forEach(r => r.checked = false);

  // Default tab
  switchDrinkTab('small', document.querySelector('.drink-tab'));

  document.getElementById('customize-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCustomize(e) {
  if (e.target === document.getElementById('customize-overlay')) closeCustomizeBtn();
}
function closeCustomizeBtn() {
  document.getElementById('customize-overlay').classList.remove('open');
  document.body.style.overflow = '';
}

function switchDrinkTab(type, btn) {
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

  cart.push(item);
  closeCustomizeBtn();
  renderCart();
  updateCartHeader();
  showAddedFeedback();
}

function showAddedFeedback() {
  const btn = document.querySelector('.fab-cart') || document.querySelector('.cart-btn');
  if (!btn) return;
  btn.style.transform = 'translateX(-50%) scale(1.1)';
  setTimeout(() => { btn.style.transform = ''; }, 200);
}

// ===== REMOVE / QTY =====
function removeItem(id) {
  cart = cart.filter(i => i.id !== id);
  renderCart();
  updateCartHeader();
}

function changeQty(id, delta) {
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
      <div class="cart-item-details">
        🥤 ${item.drink}<br>🥫 ${item.sauce}
      </div>
      <div class="cart-item-controls">
        <div class="qty-controls">
          <button class="qty-btn" onclick="changeQty(${item.id}, -1)">−</button>
          <span class="qty-num">${item.qty}</span>
          <button class="qty-btn" onclick="changeQty(${item.id}, 1)">+</button>
        </div>
        <button class="remove-btn" onclick="removeItem(${item.id})">🗑 Supprimer</button>
      </div>
    </div>`;
}

function renderCart() {
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const hasItems = cart.length > 0;

  // Sidebar
  const sideItems = document.getElementById('cart-items');
  const sideFooter = document.getElementById('cart-footer');
  if (sideItems) {
    sideItems.innerHTML = hasItems
      ? cart.map(cartItemHTML).join('')
      : '<div class="cart-empty"><span>🍔</span><p>Votre panier est vide</p><small>Ajoutez des produits pour commander</small></div>';
    if (sideFooter) {
      sideFooter.style.display = hasItems ? 'block' : 'none';
      document.getElementById('cart-subtotal').textContent = fmt(total);
      document.getElementById('cart-total').textContent = fmt(total);
    }
  }

  // Mobile panel
  const mobItems = document.getElementById('cart-items-mobile');
  const mobFooter = document.getElementById('cart-footer-mobile');
  if (mobItems) {
    mobItems.innerHTML = hasItems
      ? cart.map(cartItemHTML).join('')
      : '<div class="cart-empty"><span>🍔</span><p>Votre panier est vide</p></div>';
    if (mobFooter) {
      mobFooter.style.display = hasItems ? 'block' : 'none';
      document.getElementById('cart-subtotal-mobile').textContent = fmt(total);
      document.getElementById('cart-total-mobile').textContent = fmt(total);
    }
  }
}

function updateCartHeader() {
  const count = cart.reduce((s, i) => s + i.qty, 0);
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);

  document.getElementById('cart-count').textContent = count;
  document.getElementById('cart-total-header').textContent = fmt(total);

  const fabCount = document.getElementById('fab-count');
  const fabTotal = document.getElementById('fab-total');
  if (fabCount) fabCount.textContent = count;
  if (fabTotal) fabTotal.textContent = fmt(total);

  const fab = document.getElementById('fab-cart');
  if (fab) fab.style.display = count > 0 ? 'flex' : 'none';
}

// ===== CART TOGGLE (mobile) =====
function toggleCart() {
  cartOpen = !cartOpen;
  const overlay = document.getElementById('cart-overlay');
  const panel = document.getElementById('cart-mobile');
  if (cartOpen) {
    overlay.classList.add('open');
    panel.classList.add('open');
    document.body.style.overflow = 'hidden';
  } else {
    overlay.classList.remove('open');
    panel.classList.remove('open');
    document.body.style.overflow = '';
  }
}

// ===== ORDER FORM =====
function openOrderForm() {
  if (cart.length === 0) { alert('Votre panier est vide.'); return; }

  // Close cart if open
  if (cartOpen) toggleCart();

  // Build recap
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  let recapHTML = '';
  cart.forEach(item => {
    recapHTML += `<div><span class="recap-item-name">${item.qty}x ${item.name}</span><br>`;
    recapHTML += `&nbsp;&nbsp;🥤 ${item.drink} · 🥫 ${item.sauce} · ${fmt(item.price * item.qty)}</div><br>`;
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
  document.getElementById('order-overlay').classList.remove('open');
  document.body.style.overflow = '';
}

// ===== SEND WHATSAPP =====
function sendWhatsApp() {
  const name = document.getElementById('client-name').value.trim();
  const phone = document.getElementById('client-phone').value.trim();

  if (!name) { alert('Veuillez saisir votre nom.'); document.getElementById('client-name').focus(); return; }
  if (!phone) { alert('Veuillez saisir votre numéro de téléphone.'); document.getElementById('client-phone').focus(); return; }

  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);

  let msg = `Bonjour,\n\nNouvelle commande :\n\n`;
  msg += `Nom : ${name}\n`;
  msg += `Téléphone : ${phone}\n\n`;
  msg += `Commande :\n\n`;

  cart.forEach(item => {
    msg += `${item.qty}x ${item.name}\n`;
    msg += `Boisson : ${item.drink}\n`;
    msg += `Sauce : ${item.sauce}\n`;
    msg += `Prix : ${fmt(item.price * item.qty)}\n\n`;
  });

  msg += `Total : ${fmt(total)}\n\nMerci.`;

  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  window.open(url, '_blank');
}

// ===== INIT =====
renderCart();
updateCartHeader();
