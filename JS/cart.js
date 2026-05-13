/* read cart from sessionStorage, bit of storing info*/
let cart = JSON.parse(sessionStorage.getItem('cart') || '[]');

/* DOM references */
const itemsList = document.querySelector('.cart-items');
const countEl = document.querySelector('.cart-item-count');
const subtotalEl = document.querySelector('.summary-subtotal');
const shippingEl = document.querySelector('.summary-shipping');
const totalEl = document.querySelector('.summary-total');
const shippingFill = document.querySelector('.shipping-fill');
const shippingLabel = document.querySelector('.shipping-label');

const FREE_SHIPPING_THRESHOLD = 100;


/* cart calculations */

function getSubtotal() {
    return cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
}

function getTotalItems() {
    return cart.reduce((sum, item) => sum + item.qty, 0);
}

function getShipping(subtotal) {
    return subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 9.95;
}


/* save & rerender */

function saveCart() {
    sessionStorage.setItem('cart', JSON.stringify(cart));
    render();
}


/* shipping bar */

function renderShippingBar(subtotal) {
    const progress = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100);
    shippingFill.style.width = progress + '%';

    if (subtotal >= FREE_SHIPPING_THRESHOLD) {
        shippingLabel.textContent = 'UNLOCKED FREE SHIPPING';
    } else {
        const remaining = (FREE_SHIPPING_THRESHOLD - subtotal).toFixed(2);
        shippingLabel.textContent = 'ADD $' + remaining + ' FOR FREE SHIPPING';
    }
}


/* ── ORDER SUMMARY ── */

function renderSummary(subtotal, shipping) {
    const total = subtotal + shipping;
    const totalItems = getTotalItems();

    countEl.textContent = totalItems + (totalItems === 1 ? ' item' : ' items');
    subtotalEl.textContent = subtotal.toFixed(2);
    shippingEl.textContent = shipping === 0 ? 'FREE SHIPPING' : '$' + shipping.toFixed(2);
    totalEl.textContent = '$' + total.toFixed(2);

    /* keep nav badge in sync */
    const badge = document.querySelector('.cart-count');
    if (badge) badge.textContent = totalItems > 0 ? totalItems : '';
}


/* item card inject into html */

function buildItemCard(item, index) {
    const li = document.createElement('li');
    li.className = 'cart-item';
    li.innerHTML = `
        <figure class="cart-item-img ${item.feeling}-bg">
            <img src="${item.img}" alt="${item.name}">
        </figure>
        <section class="cart-item-info">
            <p class="cart-item-feeling">${item.feeling.toUpperCase()}</p>
            <h2 class="cart-item-name">${item.name}</h2>
            <p class="cart-item-meta">${item.size} · 100% Pure</p>
            <p class="cart-item-price">$${(item.price * item.qty).toFixed(2)}</p>
            <footer class="cart-item-actions">
                <span class="quantity-stepper">
                    <button class="qty-btn" data-index="${index}" data-action="minus">-</button>
                    <span class="qty-display">${item.qty}</span>
                    <button class="qty-btn" data-index="${index}" data-action="plus">+</button>
                </span>
                <button class="cart-remove" data-index="${index}" aria-label="Remove item">🗑</button>
            </footer>
        </section>
    `;
    return li;
}


/* button listeners for the item cart from previous sesh */

function wireItemButtons() {
    document.querySelectorAll('.qty-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const i = parseInt(btn.dataset.index);
            if (btn.dataset.action === 'plus') {
                cart[i].qty = cart[i].qty + 1;
            } else if (cart[i].qty > 1) {
                cart[i].qty = cart[i].qty - 1;
            }
            saveCart();
        });
    });

    document.querySelectorAll('.cart-remove').forEach(btn => {
        btn.addEventListener('click', () => {
            cart.splice(parseInt(btn.dataset.index), 1);
            saveCart();
        });
    });
}


/* actual render */

function render() {
    const subtotal = getSubtotal();
    const shipping = getShipping(subtotal);

    renderShippingBar(subtotal);
    renderSummary(subtotal, shipping);

    itemsList.innerHTML = '';

    if (cart.length === 0) {
        itemsList.innerHTML = '<li class="cart-empty"><p>Your cart is empty.</p><a href="shop.html" class="btn-primary">Shop Now</a></li>';
        return;
    }

    cart.forEach((item, index) => {
        itemsList.appendChild(buildItemCard(item, index));
    });

    wireItemButtons();
}


render();