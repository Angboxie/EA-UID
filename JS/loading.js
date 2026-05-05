
/* thinking of doing the wreath to protrude away from the circle to signal the loading progress, timing's pretty important*/


/* grabbing the DOM */
const wreath = document.querySelector('.loading-wreath img');
const percent = document.querySelector('.loading-percent');
const brand = document.querySelector('.loading-brand');
const sub = document.querySelector('.loading-sub');

/* progress state start*/
let progress = 0;

/* the core animation loop, set interval is around every 16ms which is around 60fps, which is 1.6s of loading time*/
const interval = setInterval (() => {
    progress++;
    percent.textContent = progress + '%'; /* keep number in sync with each tick*/

    /* start at 5% progress, then grows 0.5% per tick, fully reveals and 55% at 100%.*/
    const clip = 5 + (progress * 0.5);
    wreath.style.clipPath = `circle(${clip}% at 50% 50%)`;
    
    /* completion */
    if (progress >= 100) {
        clearInterval(interval);

        /*reveal the brand after finish loading*/
        brand.classList.add('visible');
        sub.classList.add('visible');

        /* short pause then switch screens*/
        setTimeout(() => {
            window.location.href = 'shop.html';
        }, 1200);
    }
}, 16);