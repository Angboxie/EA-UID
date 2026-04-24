
/* thinking of doing the wreath to protrude away from the circle to signal the loading progress, timing's pretty important*/

const wreath = document.querySelector('.loading-wreath img');
const percent = document.querySelector('.loading-percent');
const brand = document.querySelector('.loading-brand');
const sub = document.querySelector('.loading-sub');

let progress = 0;

const interval = setInterval (() => {
    progress++;

    percent.textContent = progress + '%';


    const clip = 5 + (progress * 0.5);
    wreath.style.clipPath = `circle(${clip}% at 50% 50%)`;

    if (progress >= 100) {
        clearInterval(interval);

        brand.classList.add('visible');
        sub.classList.add('visible');

        setTimeout(() => {
            window.location.href = 'shop.html';
        }, 1200);
    }
}, 16);