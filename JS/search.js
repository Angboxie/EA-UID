/* products to search through — should be the same as shop.js */
const products = [
    /* uplift */
    { feeling: 'uplift', name: 'Zest Myrtle', scent: 'green mango · citrus peel · fresh peel', price: '22.95', img: 'assets/zest-myrtle.png', link: 'product-zest-myrtle.html' },
    { feeling: 'uplift', name: 'Honey Myrtle', scent: 'wildflower honey · lemon blossom · warm vanilla', price: '22.95', img: 'assets/honey-myrtle.png', link: '#' },
    { feeling: 'uplift', name: 'Lemon Myrtle', scent: 'lemon bark · eucalyptus leaf · light florals', price: '22.95', img: 'assets/lemon-myrtle.png', link: '#' },
    { feeling: 'uplift', name: 'Lemon Tea Tree', scent: 'lemon drop · tea tree · fresh herbs', price: '28.95', img: 'assets/lemon-tea-tree.png', link: '#' },

    /* calm */
    { feeling: 'calm', name: 'Anise Myrtle', scent: 'star anise · sweet licorice · warm herb', price: '26.95', img: 'assets/anise-myrtle.png', link: '#' },
    { feeling: 'calm', name: 'Kunzea', scent: 'kunzea leaf · cool camphor', price: '25.95', img: 'assets/kunzea.png', link: '#' },

    /* restore */
    { feeling: 'restore', name: 'Eucalyptus Aus.', scent: 'eucalyptus leaf · cool camphor · fresh mint', price: '19.95', img: 'assets/eucalyptus.png', link: '#' },
    { feeling: 'restore', name: 'Eucalyptus Radiata', scent: 'eucalyptol · limonene · warm vanilla', price: '54.95', img: 'assets/eucalyptus-radiata.png', link: '#' },
    { feeling: 'restore', name: 'Fragonia', scent: 'fragonia leaf · pinene', price: '55.95', img: 'assets/fragonia.png', link: 'product-fragonia.html' },

    /* ground */
    { feeling: 'ground', name: 'Northern Sandalwood', scent: 'creamy wood · dry earth', price: '15.95', img: 'assets/sandalwood.png', link: '#' },

];

/* DOM references */
const searchInput        = document.getElementById('search-input');
const emptyStateSection  = document.getElementById('search-empty');
const resultsSection     = document.getElementById('search-results');
const resultsProductList = document.getElementById('results-list');
const alsoLikeSection    = document.getElementById('search-also');
const alsoLikeList       = document.getElementById('also-list');
const resultsCountLabel  = document.getElementById('results-count');
const recentSearchList   = document.getElementById('recent-list');

/* build a single product card. btw the ${} to clarify i forgot is to insert variable values */

function buildCard(p) {
    const li = document.createElement('li');
    li.className = 'search-card';
    li.innerHTML = `
        <figure class="search-card-img ${p.feeling}-bg">
            <img src="${p.img}" alt="${p.name}">
        </figure>
        <section class="search-card-info">
            <p class="search-card-feeling">
                <span class="feeling-dot ${p.feeling}-dot"></span>
                ${p.feeling.toUpperCase()}
            </p>
            <h2 class="search-card-name">${p.name}</h2>
            <p class="search-card-scent">${p.scent}</p>
            <p class="search-card-price">$${p.price} <span class="price-size">12ml</span></p>
        </section>
        <a href="${p.link}" class="btn-view">View →</a>
    `;
    return li;
}

/* filter products by name, scent or feeling (predictive AI, searches for individual letters/words) */

function filterProducts(query) {
    const q = query.toLowerCase();
    return products.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.feeling.toLowerCase().includes(q)
    );
}

/* run search and show results, shows only relevant results*/

function runSearch(query) {
    if (!query.trim()) {
        emptyStateSection.hidden = false;
        resultsSection.hidden = true;
        return;
    }

    const matchedProducts = filterProducts(query);

    /* suggestions — same feeling, not already in results */
    const matchedNames = matchedProducts.map(p => p.name);
    const suggestedProducts = products.filter(p =>
        matchedProducts.some(m => m.feeling === p.feeling) && !matchedNames.includes(p.name)
    ).slice(0, 2);

    /* switch to results view */
    emptyStateSection.hidden = true;
    resultsSection.hidden = false;

    resultsCountLabel.textContent = matchedProducts.length + ' Result' + (matchedProducts.length !== 1 ? 's' : '');

    resultsProductList.innerHTML = '';
    matchedProducts.forEach(p => resultsProductList.appendChild(buildCard(p)));

    alsoLikeList.innerHTML = '';
    suggestedProducts.forEach(p => alsoLikeList.appendChild(buildCard(p)));
    alsoLikeSection.hidden = suggestedProducts.length === 0;
}


/* I plan to save it in storage session so that way it is more responsive */
function getRecent() {
    return JSON.parse(sessionStorage.getItem('ea-recent') || '[]');
}

function saveRecent(query) {
    let recent = getRecent().filter(r => r !== query);
    recent.unshift(query);
    sessionStorage.setItem('ea-recent', JSON.stringify(recent.slice(0, 5)));
    renderRecent();
}

/* renders recent searches from storagesession into recent list*/
function renderRecent() {
    recentSearchList.innerHTML = '';

    getRecent().forEach(savedQuery => {
        const listItem = document.createElement('li');
        listItem.className = 'recent-item';
        listItem.innerHTML = `
            <button class="recent-query" data-query="${savedQuery}">
                <img src="assets/searchicon.svg" alt="" width="14" height="14"> ${savedQuery}
            </button>
            <button class="recent-remove" data-query="${savedQuery}" aria-label="Remove">✕</button>
        `;

        /* clicking recent item fills the search box and runs the search */
        listItem.querySelector('.recent-query').addEventListener('click', () => {
            searchInput.value = savedQuery;
            runSearch(savedQuery);
        });

        /* clicking x removes that item from sessionStorage and re-renders  list*/
        listItem.querySelector('.recent-remove').addEventListener('click', () => {
            const updated = getRecent().filter(r => r !== savedQuery);
            sessionStorage.setItem('ea-recent', JSON.stringify(updated));
            renderRecent();
        });

        recentSearchList.appendChild(listItem);
    });
}


/* feeling chip and trending clicks, make it responsive since in the Figma it was responsive also*/

document.querySelectorAll('.feeling-chip, .trending-item').forEach(btn => {
    btn.addEventListener('click', () => {
        const searchQuery = btn.dataset.feeling || btn.dataset.query;
        searchInput.value = searchQuery;
        saveRecent(searchQuery);
        runSearch(searchQuery);
    });
});

/* live search as user types */

searchInput.addEventListener('input', () => runSearch(searchInput.value));

/* save to recent on enter */
searchInput.addEventListener('keydown', e => {
    if (e.key === 'Enter' && searchInput.value.trim()) saveRecent(searchInput.value.trim());
});


/* initialization */
renderRecent();