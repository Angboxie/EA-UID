/* read cart from sessionStorage — stays in memory even after we wipe it later */
const cart = JSON.parse(sessionStorage.getItem('cart') || '[]');


/* ── CALCULATIONS ── */

function getSubtotal() {
    return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
}

function getShipping(subtotal) {
    return subtotal >= 100 ? 0 : 9.95;
}


/* step nav */

function goToStep(n) {
    /* hide all, show target step */
    document.querySelectorAll('.checkout-step').forEach(s => s.classList.remove('active'));
    document.getElementById(n === 4 ? 'step-confirmation' : 'step-' + n).classList.add('active');

    /* completed = green check, active = gold, rest = grey */
    document.querySelectorAll('.steps-list .step').forEach((dot, i) => {
        dot.classList.remove('active', 'completed');
        if (i + 1 < n) dot.classList.add('completed');
        else if (i + 1 === n) dot.classList.add('active');
    });

    /* hide step nav on confirmation */
    document.querySelector('.checkout-steps').hidden = n === 4;
    window.scrollTo({ top: 0, behavior: 'smooth' });
}


/* step 3 totals + order and review */

function showTotals() {
    const subtotal = getSubtotal();
    const shipping = getShipping(subtotal);
    const total = subtotal + shipping;

    document.querySelector('.co-subtotal').textContent = '$' + subtotal.toFixed(2);
    document.querySelector('.co-shipping').textContent = shipping === 0 ? 'FREE' : '$' + shipping.toFixed(2);
    document.querySelector('.co-total').textContent = '$' + total.toFixed(2);
    document.getElementById('co-total-inline').textContent = total.toFixed(2);

    /* show cart items above the place order button */
    const list = document.getElementById('checkout-order-items');
    list.innerHTML = '';
    cart.forEach(item => {
        const li = document.createElement('li');
        li.className = 'confirm-item ' + item.feeling + '-bg';
        li.innerHTML = '<img src="' + item.img + '" alt="' + item.name + '"><section class="confirm-item-info"><p class="confirm-item-name">' + item.name + '</p><p class="confirm-item-meta">' + item.size + ' · ' + item.feeling.charAt(0).toUpperCase() + item.feeling.slice(1) + '</p></section><p class="confirm-item-price">$' + (item.price * item.qty).toFixed(2) + '</p>';
        list.appendChild(li);
    });
}


/* confirmation */

function showConfirmation() {
    /* wipe cart — badge zeroes on next nav, cart variable still in memory */
    sessionStorage.setItem('cart', '[]');

    /* personalise with name and city from step 1 */
    const name = document.getElementById('fullname').value.split(' ')[0] || 'there';
    const city = document.getElementById('city').value || 'your city';
    const address = document.getElementById('address').value + ', ' + city + ' ' + document.getElementById('postcode').value;

    document.getElementById('confirm-name').textContent = name;
    document.getElementById('confirm-city').textContent = city;
    document.getElementById('confirm-address').textContent = address;

    /* random order number */
    document.getElementById('confirm-order-num').textContent =
        '#EA-' + new Date().getFullYear() + '-' + Math.floor(1000 + Math.random() * 9000);

    /* shipping label from selected radio */
    const selected = document.querySelector('input[name="shipping"]:checked');
    document.getElementById('confirm-shipping').textContent = selected?.dataset.label || 'Standard · 3–5 business days';

    /* last 4 of card */
    const card = document.getElementById('card-number').value.replace(/\s/g, '');
    document.getElementById('confirm-payment').textContent = 'Mastercard Ending in ' + (card.slice(-4) || '4242');

    /* inject cart items into confirmation */
    const list = document.getElementById('confirm-items');
    cart.forEach(item => {
        const li = document.createElement('li');
        li.className = 'confirm-item ' + item.feeling + '-bg';
        li.innerHTML = '<img src="' + item.img + '" alt="' + item.name + '"><section class="confirm-item-info"><p class="confirm-item-name">' + item.name + '</p><p class="confirm-item-meta">' + item.size + ' · ' + item.feeling.charAt(0).toUpperCase() + item.feeling.slice(1) + '</p></section><p class="confirm-item-price">$' + (item.price * item.qty).toFixed(2) + '</p>';
        list.appendChild(li);
    });

    /* totals */
    const sub = getSubtotal();
    const ship = getShipping(sub);
    document.getElementById('confirm-subtotal').textContent = '$' + sub.toFixed(2);
    document.getElementById('confirm-shipping-val').textContent = ship === 0 ? 'FREE' : '$' + ship.toFixed(2);
    document.getElementById('confirm-total').textContent = '$' + (sub + ship).toFixed(2);
}


/* payment tabs */

document.querySelectorAll('.payment-method-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.payment-method-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        /* only show card form if card is selected */
        document.getElementById('card-form').hidden = btn.dataset.method !== 'card';
    });
});


/* shipping highlight */

document.querySelectorAll('.shipping-option input').forEach(opt => {
    opt.addEventListener('change', () => {
        document.querySelectorAll('.shipping-option').forEach(o => o.classList.remove('selected'));
        opt.closest('.shipping-option').classList.add('selected');
    });
});


/* buttons */

/* step 1 → 2: pull address into delivering to display */
document.getElementById('btn-to-shipping').addEventListener('click', () => {
    const addr = document.getElementById('address').value;
    const city = document.getElementById('city').value;
    const state = document.getElementById('state').value;
    const postcode = document.getElementById('postcode').value;
    document.getElementById('delivering-to-address').textContent = addr + ', ' + city + ' ' + state + ' ' + postcode;
    goToStep(2);
});

/* step 2 → 3: show totals before payment */
document.getElementById('btn-to-payment').addEventListener('click', () => {
    showTotals();
    goToStep(3);
});

/* step 3 → confirmation */
document.getElementById('btn-place-order').addEventListener('click', () => {
    showConfirmation();
    goToStep(4);
});

/* back buttons */
document.getElementById('back-to-contact').addEventListener('click', () => goToStep(1));
document.getElementById('back-to-shipment').addEventListener('click', () => goToStep(2));


/* init */
goToStep(1);