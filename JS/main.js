/*breathing headline animation*/
const headline = document.querySelector('.breathing-headline');

if (headline) {
    let inhale = true;
    headline.classList.add('breathing-inhale');

    setInterval(() => {
        inhale = !inhale;
        headline.classList.toggle('breathing-inhale', inhale);
        headline.classList.toggle('breathing-exhale', !inhale);
    }, 2000);
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
            <div class="nav-actions">
                <button aria-label="Search">
                    <img src="assets/searchicon.svg" alt="" width="20" height="20">
                </button>
                <button aria-label="Cart">
                    <img src="assets/cart.svg" alt="" width="22" height="22">
                </button>
            </div>
        </nav>
    `;

    /* wire up toggle after nav exists in DOM */
    const toggle = header.querySelector('.nav-toggle');
    const navLinks = header.querySelector('.nav-links');

    toggle.addEventListener('click', () => {
        navLinks.classList.toggle('open');
        toggle.textContent = navLinks.classList.contains('open') ? 'x' : '☰';
    });
}

renderNav();