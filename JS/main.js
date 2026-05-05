
/* for mobile toggles only*/
const toggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

/*guard for only wire up the listener if both elements actually exist in the DOM*/
if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
        navlinks.classList.toggle('open');

        /*swap the icon to reflect the current state, so burger when closed, x when open*/
        toggle.textContent = navLinks.classList.contains('open') ? 'x' : '☰';
    });
}

/*breathing headlines*/
const headline = document.querySelector('.breathing-headline');

if (headline) {
    let inhale = true;

    /* start on inhale immediately and not to wait for first tick*/
    headline.classList.add('breathing-inhale');

    /*flip between breathing inhale and exhale every 2 seconds or so, total is 2+2 4 seconds*/
    setInterval (() => {
        inhale = !inhale;
        headline.classList.toggle('breathing-inhale', inhale);
        headline.classList.toggle('breathing-exhale', !inhale);
    }, 2000);
}


/* Since I was instructed to get rid of repeating things in HTML and put in JS, I put the nav in here!*/

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
}

renderNav();