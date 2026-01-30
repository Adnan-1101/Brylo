// Data
const products = [
    { id: 1, nameEn: "Nutella Cookies", nameAr: "كوكيز نوتيلا", price: 37, type: "sweets", img: "https://images.unsplash.com/photo-1590080874088-e564811771ce?w=400" },
    { id: 2, nameEn: "Kinder Cookies", nameAr: "كوكيز كيندر", price: 37, type: "sweets", img: "https://images.unsplash.com/photo-1618930165806-38299238318e?w=400" },
    { id: 3, nameEn: "Date Cake", nameAr: "كيكة التمر", price: 120, type: "sweets", img: "https://images.unsplash.com/photo-1542826438-bd32f43d626f?w=400" },
    { id: 4, nameEn: "Vanilla Scoop", nameAr: "فانيلا سكوب", price: 25, type: "icecream", img: "https://images.unsplash.com/photo-1560008581-09826d1de69e?w=400" },
    { id: 5, nameEn: "Chocolate Cone", nameAr: "مخروط الشوكولاتة", price: 30, type: "icecream", img: "https://images.unsplash.com/photo-1580915411954-282cb1b0d780?w=400" },
    { id: 6, nameEn: "Croissant", nameAr: "كرواسون", price: 15, type: "bakery", img: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400" },
    { id: 7, nameEn: "Blueberry Muffin", nameAr: "مافن التوت", price: 22, type: "bakery", img: "https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=400" },
    { id: 8, nameEn: "Strawberry Gelato", nameAr: "جيلاتو الفراولة", price: 28, type: "icecream", img: "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=400" }
];

const dict = {
    logo: { en: "BRYLO", ar: "بريلو" },
    heroTitle: { en: "Taste the Magic ✨", ar: "تذوق السحر ✨" },
    heroSubtitle: { en: "Artisan sweets crafted with love, baked fresh daily for your delight", ar: "حلويات مصنوعة بحب، طازجة يومياً لسعادتك" },
    sweets: { en: "Sweets", ar: "حلويات" },
    icecream: { en: "Ice Cream", ar: "آيس كريم" },
    bakery: { en: "Bakery", ar: "مخبز" },
    add: { en: "ADD TO CART", ar: "أضف للسلة" },
    yourCart: { en: "Your Cart", ar: "سلتك" },
    empty: { en: "Your cart is empty", ar: "السلة فارغة" },
    total: { en: "Total", ar: "المجموع" },
    checkout: { en: "SECURE CHECKOUT", ar: "الدفع الآمن" },
    settings: { en: "Settings", ar: "الإعدادات" },
    feedback: { en: "Send Feedback", ar: "إرسال ملاحظات" },
    favorites: { en: "My Favorites", ar: "المفضلة" },
    orders: { en: "Order History", ar: "سجل الطلبات" },
    privacy: { en: "Privacy Policy", ar: "الخصوصية" },
    addedToCart: { en: "Added to cart!", ar: "تمت الإضافة!" }
};

let lang = "en";
let cart = [];
let filterType = "sweets";

// Initialize tab indicator
function updateTabIndicator() {
    const activeBtn = document.querySelector('.cat-btn.active');
    const indicator = document.getElementById('tabIndicator');
    if (activeBtn && indicator) {
        indicator.style.width = activeBtn.offsetWidth + 'px';
        indicator.style.left = activeBtn.offsetLeft + 'px';
    }
}

// Logic
function render() {
    const grid = document.getElementById("grid");
    grid.innerHTML = "";
    const items = products.filter(p => p.type === filterType);

    items.forEach((p, index) => {
        const name = lang === "en" ? p.nameEn : p.nameAr;
        const btn = dict.add[lang];

        const card = document.createElement("div");
        card.className = "product-card";
        card.style.animationDelay = `${index * 0.1}s`;
        card.innerHTML = `
            <div class="img-box"><img src="${p.img}" id="img-${p.id}" alt="${name}"></div>
            <h3 class="product-name">${name}</h3>
            <p class="product-price">Ð ${p.price}</p>
            <button class="add-btn" onclick="add(${p.id}, event)">
                <i class="fas fa-plus"></i>
                ${btn}
            </button>
        `;
        grid.appendChild(card);
    });
}

function filter(type, el) {
    filterType = type;
    document.querySelectorAll(".cat-btn").forEach(b => b.classList.remove("active"));
    el.classList.add("active");
    updateTabIndicator();
    render();
}

function showToast() {
    const toast = document.getElementById('toast');
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2000);
}

function createRipple(event, element) {
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = event.clientX - rect.left - size / 2 + 'px';
    ripple.style.top = event.clientY - rect.top - size / 2 + 'px';
    element.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
}

function add(id, event) {
    const prod = products.find(p => p.id === id);
    cart.push(prod);

    const countEl = document.getElementById("cart-count");
    countEl.innerText = cart.length;
    countEl.style.animation = 'none';
    countEl.offsetHeight; // Trigger reflow
    countEl.style.animation = 'pulse 0.5s ease';

    // Fly Animation with improved physics
    const img = document.getElementById(`img-${id}`);
    const cartIcon = document.getElementById("cart-trigger");

    const clone = img.cloneNode(true);
    clone.className = "flying-img";
    document.body.appendChild(clone);

    const start = img.getBoundingClientRect();
    const end = cartIcon.getBoundingClientRect();

    clone.style.top = start.top + "px";
    clone.style.left = start.left + "px";
    clone.style.width = start.width + "px";
    clone.style.height = start.height + "px";
    clone.style.transition = "all 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)";

    // Trigger move with arc effect
    requestAnimationFrame(() => {
        clone.style.top = end.top + "px";
        clone.style.left = end.left + "px";
        clone.style.width = "30px";
        clone.style.height = "30px";
        clone.style.opacity = "0";
        clone.style.transform = "rotate(360deg)";
    });

    setTimeout(() => {
        clone.remove();
        showToast();
    }, 700);

    updateCart();
}

function updateCart() {
    const list = document.getElementById("cartList");
    if (cart.length === 0) {
        list.innerHTML = `
            <div class="cart-empty">
                <i class="fas fa-shopping-basket"></i>
                <p>${dict.empty[lang]}</p>
            </div>
        `;
        document.getElementById("totalPrice").innerText = "Ð 0";
        return;
    }

    let total = 0;
    list.innerHTML = cart.map((item, index) => {
        total += item.price;
        const name = lang === "en" ? item.nameEn : item.nameAr;
        return `
            <div class="cart-item" style="animation-delay: ${index * 0.1}s">
                <img src="${item.img}" alt="${name}">
                <div class="cart-item-info">
                    <div class="cart-item-name">${name}</div>
                    <div class="cart-item-price">Ð ${item.price}</div>
                </div>
            </div>
        `;
    }).join("");
    document.getElementById("totalPrice").innerText = "Ð " + total;
}

// Drawer & Language Logic
function toggleCart() {
    closeDrawers();
    setTimeout(() => {
        document.getElementById("cartDrawer").classList.add("active");
        document.getElementById("overlay").classList.add("active");
    }, 50);
}

function toggleSettings() {
    closeDrawers();
    setTimeout(() => {
        document.getElementById("settingsDrawer").classList.add("active");
        document.getElementById("overlay").classList.add("active");
    }, 50);
}

function closeDrawers() {
    document.querySelectorAll(".drawer").forEach(d => d.classList.remove("active"));
    document.getElementById("overlay").classList.remove("active");
}

function switchLang() {
    lang = lang === "en" ? "ar" : "en";
    document.body.setAttribute("dir", lang === "en" ? "ltr" : "rtl");

    // UI Update with smooth transition
    const toggle = document.getElementById("langSwitch");
    toggle.setAttribute("data-active", lang);

    document.getElementById("opt-en").classList.toggle("active");
    document.getElementById("opt-ar").classList.toggle("active");

    // Text Update with fade effect
    document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.getAttribute("data-i18n");
        if (dict[key]) {
            el.style.opacity = 0;
            setTimeout(() => {
                el.innerText = dict[key][lang];
                el.style.opacity = 1;
            }, 150);
        }
    });

    setTimeout(() => {
        render();
        updateCart();
        updateTabIndicator();
    }, 200);
}

// Handle keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeDrawers();
});

// Initialize
window.addEventListener('load', () => {
    render();
    setTimeout(updateTabIndicator, 100);
});

window.addEventListener('resize', updateTabIndicator);
