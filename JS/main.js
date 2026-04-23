const toggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
        navlinks.classList.toggle('open');
        toggle.textContent = navLinks.classList.contains('open') ? 'x' : '☰';
    });
}


const headline = document.querySelector('.breathing-headline');

if (headline) {
    let inhale = true;
    headline.classList.add('breathing-inhale');

    setInterval (() => {
        inhale = !inhale;
        headline.classList.toggle('breathing-inhale', inhale);
        headline.classList.toggle('breathing-exhale', !inhale);
    }, 2000);
}