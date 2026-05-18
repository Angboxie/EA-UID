const OPENAI_API_KEY = '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';

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
const chatWindow = document.getElementById('scent-chat');
const resultsArea = document.getElementById('scent-results');
const userInput = document.getElementById('scent-input');
const sendButton = document.getElementById('scent-send');


/* add a message bubble to the chat window, green for user and whitish for*/
function addMessage(text, sender) {
    const bubble = document.createElement('p');
    bubble.className = 'scent-bubble scent-bubble--' + sender;
    bubble.textContent = text;
    chatWindow.appendChild(bubble);
}

/* build a product recommendation card */
function buildCard(product, reason) {
    const card = document.createElement('article');
    card.className = 'scent-rec-card';
    card.innerHTML = `
        <figure class="scent-rec-img ${product.feeling}-bg">
            <img src="${product.img}" alt="${product.name}">
        </figure>
        <section class="scent-rec-info">
            <p class="scent-rec-feeling">
                <span class="feeling-dot ${product.feeling}-dot"></span>
                ${product.feeling.toUpperCase()}
            </p>
            <h2 class="scent-rec-name">${product.name}</h2>
            <p class="scent-rec-reason">${reason}</p>
            <p class="scent-rec-price">$${product.price} <span class="price-size">12ml</span></p>
            <a href="${product.link}" class="btn-view">View →</a>
        </section>
    `;
    return card;
}


/* Ask OpenAI to pick 3 oils based on user feeling */

async function getRecommendations(message) {
    const names = products.map(p => p.name).join(', ');
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + OPENAI_API_KEY
        },
        body: JSON.stringify({
            model: 'gpt-4o-mini',
            max_tokens: 300,
            messages: [
                { role: 'system', content: `You are a scent advisor. Pick 3 oils from: ${names}. Respond in JSON only: [{"name":"...","reason":"..."}]` },
                { role: 'user', content: message }
            ]
        })
    });
    const data = await response.json();
    return JSON.parse(data.choices[0].message.content);
}


/* runs when user clicks send or presses enter */
async function handleSend() {
    const message = userInput.value.trim();
    if (!message) return;

    addMessage(message, 'user');
    userInput.value = '';
    sendButton.disabled = true;
    addMessage('Finding the right oils for you...', 'assistant');

    try {
        const recommendations = await getRecommendations(message);
        chatWindow.lastChild.remove();
        addMessage('Based on how you feel, these oils may help:', 'assistant');

        resultsArea.innerHTML = '';
        resultsArea.hidden = false;
        recommendations.forEach(rec => {
            const product = products.find(p => p.name === rec.name);
            if (product) resultsArea.appendChild(buildCard(product, rec.reason));
        });
    } catch (err) {
        chatWindow.lastChild.remove();
        addMessage('Something went wrong — please try again.', 'assistant');
    }

    sendButton.disabled = false;
}

/* event listeners */
sendButton.addEventListener('click', handleSend);
userInput.addEventListener('keydown', e => { if (e.key === 'Enter') handleSend(); });

/* first message shown on load */
addMessage('Describe how you feel and I\'ll find the right oil for you.', 'assistant');