/* size selector, it updates price display and cart button when size is clicked */
const sizeBtns = document.querySelectorAll('.size-btn');
const currentPrice = document.getElementById('current-price');
const currentSize = document.getElementById('current-size');
const cartPrice = document.getElementById('cart-price');

let basePrice = 22.95;
let qty = 1;

function updatePriceDisplay() {
    const total = (basePrice * qty).toFixed(2);
    cartPrice.textContent = total;
}

sizeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        sizeBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        basePrice = parseFloat(btn.dataset.price);
        currentPrice.textContent = basePrice.toFixed(2);
        currentSize.textContent = '· ' + btn.dataset.size;
        updatePriceDisplay();
    });
});

/* quantity stepper: minimal 1  and it should update price on change */
const qtyDisplay = document.getElementById('qty-count');
const qtyMinus = document.getElementById('qty-minus');
const qtyPlus = document.getElementById('qty-plus');

qtyMinus.addEventListener('click', () => {
    if (qty > 1) {
        qty = qty - 1;
        qtyDisplay.textContent = qty;
        updatePriceDisplay();
    }
});

qtyPlus.addEventListener('click', () => {
    qty = qty + 1;
    qtyDisplay.textContent = qty;
    updatePriceDisplay();
});

/* tab switching */
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById('tab-' + btn.dataset.tab).classList.add('active');
    });
});

function flyToCart(fromBtn) {
    const cartIcon = document.querySelector('.site-nav .nav-actions button[aria-label="Cart"] img');
    if (!cartIcon) return;

    const from = fromBtn.getBoundingClientRect();
    const to = cartIcon.getBoundingClientRect();

    const dot = document.createElement('span');
    dot.style.cssText = `
        position: fixed;
        width: 12px;
        height: 12px;
        background: var(--evergreen);
        border-radius: 50%;
        left: ${from.left + from.width / 2}px;
        top: ${from.top + from.height / 2}px;
        pointer-events: none;
        z-index: 999;
        transition: left 0.6s ease, top 0.6s ease, opacity 0.6s ease;
    `;
    document.body.appendChild(dot);

    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            dot.style.left = (to.left + to.width / 2) + 'px';
            dot.style.top = (to.top + to.height / 2) + 'px';
            dot.style.opacity = '0';
        });
    });

    setTimeout(() => dot.remove(), 700);
}

/* updates cart count badge in nav */
function updateCartCount() {
    const cart = JSON.parse(sessionStorage.getItem('cart') || '[]');
    const total = cart.reduce((sum, item) => sum + item.qty, 0);
    const badge = document.querySelector('.cart-count');
    if (badge) badge.textContent = total > 0 ? total : '';
}

updateCartCount();

/* add to cart, saves to sessionStorage, redirects to cart */
const addToCartBtn = document.getElementById('add-to-cart');

addToCartBtn.addEventListener('click', () => {
    const activeSize = document.querySelector('.size-btn.active');
    const item = {
        name: 'Zest Myrtle',
        size: activeSize.dataset.size,
        price: basePrice,
        qty: qty,
        img: 'assets/zest-myrtle.png',
        feeling: 'uplift'
    };

    const cart = JSON.parse(sessionStorage.getItem('cart') || '[]');
    cart.push(item);
    sessionStorage.setItem('cart', JSON.stringify(cart));

    flyToCart(addToCartBtn);
    updateCartCount();
});