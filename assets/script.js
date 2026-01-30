// Data
// Data
const products = [
    {
        id: 1,
        nameEn: "Mini Cookies Nutella",
        nameAr: "ميني كوكيز نوتيلا",
        price: 37,
        type: "sweets",
        img: "assets/img/minicookies.jpeg",
        images: [
            "assets/img/minicookies.jpeg",
            "assets/img/mini.jpeg"
        ],
        descEn: "Mini cookies stuffed with rich Nutella.",
        descAr: "كوكيز صغيرة محشوة بالنوتيلا الغنية."
    },
    {
        id: 2,
        nameEn: "Mini Cookies Kinder",
        nameAr: "ميني كوكيز كيندر",
        price: 37,
        type: "sweets",
        img: "assets/img/minicookies.jpeg",
        images: [
            "assets/img/minicookies.jpeg",
            "assets/img/mini.jpeg"
        ],
        descEn: "Mini cookies loaded with Kinder chocolate chunks.",
        descAr: "كوكيز صغيرة مليئة بقطع كيندر."
    },
    {
        id: 3,
        nameEn: "Date Cake",
        nameAr: "كيكة التمر",
        price: 120,
        type: "sweets",
        img: "assets/img/datecake.jpeg",
        images: [
            "assets/img/datecake.jpeg",
            "assets/img/date1.jpeg",
            "assets/img/date2.jpeg"
        ],
        descEn: "Signature date cake topped with toffee sauce.",
        descAr: "كيكة التمر المميزة مغطاة بصوص التوفي."
    },
    {
        id: 4,
        nameEn: "Lemon Cake",
        nameAr: "كيكة الليمون",
        price: 140,
        type: "sweets",
        img: "assets/img/lemoncake.jpeg",
        images: [
            "assets/img/lemoncake.jpeg",
            "assets/img/lemon2.jpeg",
        ],
        descEn: "Zesty lemon cake with a fresh citrus glaze.",
        descAr: "كيكة الليمون المنعشة مع طبقة من السيروب."
    },
    {
        id: 5,
        nameEn: "Ice Cream - Small",
        nameAr: "آيس كريم - صغير",
        price: 140,
        type: "icecream",
        img: "assets/img/icecream.jpeg",
        images: [
            "assets/img/icecream.jpeg",
        ],
        descEn: "Selection of premium ice cream flavors (Small Box).",
        descAr: "تشكيلة من نكهات الآيس كريم الفاخرة (صندوق صغير)."
    },
    {
        id: 6,
        nameEn: "Ice Cream - Large",
        nameAr: "آيس كريم - كبير",
        price: 220,
        type: "icecream",
        img: "assets/img/icecream.jpeg",
        images: [
            "assets/img/icecream.jpeg",
        ],
        descEn: "Selection of premium ice cream flavors (Large Box).",
        descAr: "تشكيلة من نكهات الآيس كريم الفاخرة (صندوق كبير)."
    },
    {
        id: 7,
        nameEn: "Za'atar Babka",
        nameAr: "بابكا الزعتر",
        price: 120,
        type: "bakery",
        img: "assets/img/babka.jpeg",
        images: [
            "assets/img/babka.jpeg",
        ],
        descEn: "Savory babka swirled with aromatic za'atar.",
        descAr: "بابكا مخبوزة مع الزعتر الفاخر."
    }
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
    addedToCart: { en: "Added to cart!", ar: "تمت الإضافة!" },
    modalAdd: { en: "Add to Order", ar: "أضف للطلب" }
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

// Modal & Slider State
let currentModalId = null;
let currentSlideIndex = 0;
let modalImages = [];

// ... [Existing render function updates] ...
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

        // Make image and name clickable to open modal
        card.innerHTML = `
            <div class="img-box" onclick="openModal(${p.id})">
                <img src="${p.img}" id="img-${p.id}" alt="${name}">
            </div>
            <h3 class="product-name" onclick="openModal(${p.id})" style="cursor:pointer">${name}</h3>
            <p class="product-price">Ð ${p.price}</p>
            <button class="add-btn" onclick="add(${p.id}, event)">
                <i class="fas fa-plus"></i>
                ${btn}
            </button>
        `;
        grid.appendChild(card);
    });
}

// Modal Logic
function openModal(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;

    currentModalId = id;

    // Setup Images (Use array if exists, else fallback to single img)
    modalImages = product.images && product.images.length > 0 ? product.images : [product.img];
    currentSlideIndex = 0;

    // Populate Content
    const name = lang === "en" ? product.nameEn : product.nameAr;
    const desc = lang === "en" ? (product.descEn || "Delicious treat from Brylo.") : (product.descAr || "حلوى لذيذة من بريلو.");

    document.getElementById("modalTitle").innerText = name;
    document.getElementById("modalPrice").innerText = "Ð " + product.price;
    document.getElementById("modalDesc").innerText = desc;

    // Update Add Button Text
    const addBtn = document.getElementById("modalAddBtn");
    addBtn.querySelector("span").innerText = dict.modalAdd[lang];
    addBtn.onclick = (e) => {
        add(id, e);
        closeModal(); // Optional: Close on add or keep open? User request didn't specify, but closing feels smoother or showing toast.
        // Let's call showToast() inside add() which is already there, so we might keep modal open or close it. 
        // I'll keep it open so they can see the gallery, unless they want to browse more.
        // Actually, let's close it for better flow.
        closeModal();
    };

    updateSlider();

    document.getElementById("productModal").classList.add("active");
}

function closeModal() {
    document.getElementById("productModal").classList.remove("active");
}

function slide(direction) {
    currentSlideIndex += direction;
    if (currentSlideIndex >= modalImages.length) currentSlideIndex = 0;
    if (currentSlideIndex < 0) currentSlideIndex = modalImages.length - 1;
    updateSlider();
}

function updateSlider() {
    const container = document.getElementById("modalSlider");
    const dotsContainer = document.getElementById("sliderDots");

    // Render Slides
    container.innerHTML = modalImages.map((img, index) => `
        <img src="${img}" class="slide-item ${index === currentSlideIndex ? 'active' : ''}">
    `).join("");

    // Render Dots
    if (modalImages.length > 1) {
        dotsContainer.innerHTML = modalImages.map((_, index) => `
            <div class="slider-dot ${index === currentSlideIndex ? 'active' : ''}" onclick="goToSlide(${index})"></div>
        `).join("");
    } else {
        dotsContainer.innerHTML = "";
    }
}

function goToSlide(index) {
    currentSlideIndex = index;
    updateSlider();
}

// Close modal on outside click
document.getElementById("productModal").addEventListener("click", (e) => {
    if (e.target.classList.contains("modal-overlay")) closeModal();
});

// ... [Existing filter, toast, ripple logic] ...


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
