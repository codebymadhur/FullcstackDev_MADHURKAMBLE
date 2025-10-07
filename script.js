// WeebCart SPA Shopping Cart and Product Logic
const PRODUCTS = [
    {
        id: 'prod1',
        name: 'Anime Hoodie',
        desc: 'Cozy up in style with this exclusive anime hoodie.',
        price: 49,
        img: 'Gemini_Generated_Image_24p38g24p38g24p3 (1).png'
    },
    {
        id: 'prod2',
        name: 'Manga Mug',
        desc: 'Enjoy your favorite drink with manga art.',
        price: 19,
        img: 'Gemini_Generated_Image_24p38g24p38g24p3 (2).png'
    },
    {
        id: 'prod3',
        name: 'Chibi Plushie',
        desc: 'Adorable plushie for every weeb collection.',
        price: 29,
        img: 'Gemini_Generated_Image_24p38g24p38g24p3 (3).png'
    },
    {
        id: 'prod4',
        name: 'Otaku Poster',
        desc: 'Decorate your room with vibrant anime art.',
        price: 15,
        img: 'Gemini_Generated_Image_24p38g24p38g24p3 (4).png'
    }
];

function renderProducts() {
    const list = document.getElementById('product-list');
    list.innerHTML = '';
    PRODUCTS.forEach((prod, i) => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.style.setProperty('--fade-delay', `${i * 120}ms`);
        card.innerHTML = `
                <img src="assets/${prod.img}" alt="${prod.name}" style="width:90px;height:90px;object-fit:contain;margin-bottom:0.5rem;border-radius:16px;box-shadow:0 2px 8px rgba(0,0,0,0.08);background:#f5f7fa;">
                <h3>${prod.name}</h3>
            <p>${prod.desc}</p>
            <div class="product-price">$${prod.price}</div>
            <button onclick="addToCart('${prod.id}')">Add to Cart</button>
        `;
        list.appendChild(card);
    });
}

function getCart() {
    try {
        return JSON.parse(localStorage.getItem('cart') || '{}');
    } catch { return {}; }
}
function setCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}
function showToast(msg) {
    const toast = document.getElementById('toast-message');
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    toast.style.display = 'block';
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => { toast.style.display = 'none'; }, 400);
    }, 1200);
}
function addToCart(id) {
    const cart = getCart();
    cart[id] = (cart[id] || 0) + 1;
    setCart(cart);
    showToast('Added to cart');
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
function updateCartCount() {
    const cart = getCart();
    let count = Object.values(cart).reduce((a, b) => a + b, 0);
    document.getElementById('cart-count').textContent = count;
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
function showCart() {
    document.getElementById('cart-sidebar').style.right = '0';
    document.getElementById('cart-toggle-arrow').style.right = '350px';
    document.getElementById('cart-arrow').style.transform = 'rotate(180deg)';
    renderCart();
}
function hideCart() {
    document.getElementById('cart-sidebar').style.right = '-350px';
    document.getElementById('cart-toggle-arrow').style.right = '0';
    document.getElementById('cart-arrow').style.transform = 'rotate(0deg)';
}
function toggleCart() {
    const sidebar = document.getElementById('cart-sidebar');
    if (sidebar.style.right === '0px') {
        hideCart();
    } else {
        showCart();
    }
}
function checkout() {
    document.getElementById('cart-sidebar').style.right = '-350px';
    setTimeout(() => {
        document.getElementById('payment-success').style.display = 'block';
    }, 400);
    setCart({});
    renderCart();
}
function closePaymentSuccess() {
    alert('Thank you for shopping with WeebCart!');
    document.getElementById('payment-success').style.display = 'none';
}
function scrollToProducts() {
    document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
}
window.onload = function() {
    renderProducts();
    updateCartCount();
    hideCart();
};
