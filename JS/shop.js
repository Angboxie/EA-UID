/* HERE IS THE PRODUCTS. I did this so that it looks cleaner, so that you can see the products clearly.
Also, it's pretty clean too and easy to add newer items in the future without changing HTML!*/


const products = [
    {
        feeling: 'uplift',
        name: 'Zest Myrtle',
        scent: 'green mango · citrus peel · fresh peel',
        price: '22.95',
        img: 'assets/zest-myrtle.png',
        link: 'product-zest-myrtle.html',
        badge: 'BEST SELLER',
        badgeClass: 'badge-bestseller'
    },

    {
        feeling: 'calm',
        name: 'Anise Myrtle',
        scent: 'star anise · sweet licorice · warm herb',
        price: '26.95',
        img: 'assets/anise-myrtle.png',
        link: '#'

    },

    {
        feeling: 'restore',
        name: 'Eucalyptus Aus.',
        scent: 'eucalyptus leaf · cool camphor · fresh mint',
        price: '19.95',
        img: 'assets/eucalyptus.png',
        link: '#'
    },

    {
        feeling: 'restore',
        name: 'Fragonia',
        scent: 'fragonia leaf · pinene',
        price: '55.95',
        img: 'assets/fragonia.png',
        link: 'product-fragonia.html',
        badge: '10 LEFT',
        badgeClass: 'badge-stock',
    },

    {
        feeling: 'uplift',
        name: 'Honey Myrtle',
        scent: 'wildflower honey · lemon blossom · warm vanilla',
        price: '22.95',
        img: 'assets/honey-myrtle.png',
        link: '#'
    },

    {
        feeling: 'restore',
        name: 'Eucalyptus Radiata',
        scent: 'eucalyptol · limonene · warm vanilla',
        price: '54.95',
        img: 'assets/eucalyptus-radiata.png',
        link: '#'
    },

    {
        feeling: 'uplift',
        name: 'Lemon Myrtle',
        scent: 'lemon bark · eucalyptus leaf · light florals',
        price: '22.95',
        img: 'assets/lemon-myrtle.png',
        link: '#'
    },

    {
        feeling: 'uplift',
        name: 'Lemon Tea Tree',
        scent: 'lemon drop · tea tree · fresh herbs',
        price: '28.95',
        img: 'assets/lemon-tea-tree.png',
        link: '#'
    },

    {
        feeling: 'calm',
        name: 'Kunzea',
        scent: 'kunzea leaf · cool camphor',
        price: '25.95',
        img: 'assets/kunzea.png',
        link: '#'
    },

    {
        feeling: 'ground',
        name: 'Northern Sandalwood',
        scent: 'creamy wood · dry earth',
        price: '15.95',
        img: 'assets/sandalwood.png',
        link: '#'
    },
];

/* Now this is the rendering that puts it in. I used loops through products, and then builds each card
then it injects it into .product-list*/

function renderProducts(productArray) {
    const list = document.querySelector('.product-list');
    if (!list) return;

    productArray.forEach(p => {

        /*let the badge be optional, since not every one of them needs a badge*/
        let badge = '';
        if (p.badge) {
            badge = '<span class="product-badge ' + p.badgeClass + '">' + p.badge + '</span>';
        }

        /*build the card html*/
        list.innerHTML += `
            <article class="product-card" data-feeling="${p.feeling}">
                <figure class="product-img ${p.feeling}-bg">
                    <img src="${p.img}" alt="${p.name} essential oil 12ml">
                </figure>
                <section class="product-info">
                    <header class="product-meta">
                        <span class="feeling-dot ${p.feeling}-dot"></span>
                        <span class="feeling-label">${p.feeling.toUpperCase()}</span>
                        ${badge}
                    </header>
                    <h2 class="product-name">${p.name}</h2>
                    <p class="product-scent">${p.scent}</p>
                    <footer class="product-footer">
                        <p class="product-price">$${p.price} <span class="price-size">12ml</span></p>
                        <a href="${p.link}" class="btn-view">View →</a>
                    </footer>
                </section>
            </article>
        `;
    });
}


renderProducts(products);

/* clicking a non-interactive product card shows a message to go back since not part o the demo */
document.querySelector('.product-list').addEventListener('click', e => {
    const link = e.target.closest('.btn-view');
    if (!link) return;
    if (link.getAttribute('href') === '#') {
        e.preventDefault();
        alert('Only Zest Myrtle and Fragonia are interactive in this demo.');
    }
});