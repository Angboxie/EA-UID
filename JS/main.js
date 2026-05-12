/*breathing headline animation*/
const headline = document.querySelector('.breathing-headline');

if (headline) {
    let inhale = true;
    headline.classList.add('breathing-inhale');

    setInterval(() => {
        inhale = !inhale;
        headline.classList.toggle('breathing-inhale', inhale);
        headline.classList.toggle('breathing-exhale', !inhale);
    }, 3000);
}

function renderNav() {
    const header = document.querySelector('.site-header');
    if (!header) return;

    header.innerHTML = `
        <nav class="site-nav">
            <button class="nav-toggle" aria-label="Open menu">☰</button>
            <a href="index.html" class="nav-logo">ESSENTIALLY AUSTRALIA</a>
            <ul class="nav-links">
                <li><a href="shop.html">SHOP</a></li>
                <li><a href="#">Our Story</a></li>
                <li><a href="#">Scent Memory</a></li>
            </ul>
            <nav class="nav-actions">
                <button aria-label="Search">
                    <img src="assets/searchicon.svg" alt="" width="20" height="20">
                </button>
                <a href="cart.hmtl" aria-label="Cart" class="cart-link">
                    <img src="assets/cart.svg" alt="" width="22" height="22">
                    <span class="cart-count"></span>
                </a>
            </nav>
        </nav>
    `;

    /* wire up toggle after nav exists in DOM */
    const toggle = header.querySelector('.nav-toggle');
    const navLinks = header.querySelector('.nav-links');

    toggle.addEventListener('click', () => {
        navLinks.classList.toggle('open');
        toggle.textContent = navLinks.classList.contains('open') ? 'x' : '☰';
    });

    updateCartCount();
}

function updateCartCount() {
    const cart = JSON.parse(sessionStorage.getItem('cart') || '[]');
    const total = cart.reduce((sum, item) => sum + item.qty, 0);
    const badge = document.querySelector('.cart-count');
    if (badge) badge.textContent = total > 0 ? total : '';
}

renderNav();