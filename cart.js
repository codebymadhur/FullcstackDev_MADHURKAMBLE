// Cart page logic for WeebCart
const PRODUCTS = [
    {
        id: 'prod1',
        name: 'Anime Hoodie',
        price: 49
    },
    {
        id: 'prod2',
        name: 'Manga Mug',
        price: 19
    },
    {
        id: 'prod3',
        name: 'Chibi Plushie',
        price: 29
    },
    {
        id: 'prod4',
        name: 'Otaku Poster',
        price: 15
    }
];

function getCart() {
    try {
        return JSON.parse(localStorage.getItem('cart') || '{}');
    } catch { return {}; }
}
function setCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}
function updateCartCount() {
    const cart = getCart();
    let count = Object.values(cart).reduce((a, b) => a + b, 0);
    document.querySelectorAll('#cart-count').forEach(el => el.textContent = count);
}
function renderCart() {
    const cart = getCart();
    const items = document.getElementById('cart-items');
    const empty = document.getElementById('cart-empty');
    items.innerHTML = '';
    let hasItems = false;
    let total = 0;
    PRODUCTS.forEach(prod => {
        if (cart[prod.id]) {
            hasItems = true;
            total += prod.price * cart[prod.id];
            const li = document.createElement('li');
            li.innerHTML = `${prod.name} x${cart[prod.id]} - $${prod.price * cart[prod.id]} <button onclick=\"removeFromCart('${prod.id}')\">Remove</button>`;
            items.appendChild(li);
        }
    });
    empty.style.display = hasItems ? 'none' : 'block';
    document.getElementById('checkout-btn').style.display = hasItems ? 'block' : 'none';
    if (hasItems) {
        const totalLi = document.createElement('li');
        totalLi.innerHTML = `<strong>Total: $${total}</strong>`;
        items.appendChild(totalLi);
    }
}
function removeFromCart(id) {
    const cart = getCart();
    if (cart[id]) {
        cart[id]--;
        if (cart[id] <= 0) delete cart[id];
        setCart(cart);
        renderCart();
    }
}
function checkout() {
    setCart({});
    renderCart();
    document.getElementById('payment-success').style.display = 'flex';
}
function returnToMain() {
    window.location.href = 'index.html';
}
window.onload = function() {
    renderCart();
    updateCartCount();
};
