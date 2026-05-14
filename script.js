/**
 * Data Arrays
 * Easy to update - just add new objects to these arrays!
 */

// Products Data
const products = [
    {
        id: 1,
        name: "عجانة لولبية إيطالية",
        description: "عجانة احترافية مخصصة للكميات الكبيرة، تتحمل العمل الشاق وتعطي عجينة متجانسة بفضل تصميمها الدقيق والمحرك القوي.",
        image: "المعدات/1.jpeg"
    },
    {
        id: 2,
        name: "فرن دوار احترافي",
        description: "فرن دوار عالي الجودة لخبز جميع أنواع المخبوزات والحلويات بكفاءة وتوزيع حراري مثالي لضمان لون ذهبي موحد ومثالي.",
        image: "المعدات/2.jpeg"
    },
    {
        id: 3,
        name: "فرادة عجين متطورة",
        description: "فرادة عجين سريعة لعمل طبقات العجين للكرواسون والباتيه بدقة عالية وسهولة في الاستخدام والتنظيف المستمر.",
        image: "المعدات/3.jpeg"
    }
];


// WhatsApp Settings
const WHATSAPP_NUMBER = "966545791974";

// Offers Data
const offers = [
    "الصور/1.jpeg",
    "الصور/2.jpeg",
    "الصور/2.png",
    "الصور/4.jpeg",
    "الصور/5.jpeg",
    "الصور/ChatGPT Image 12 مايو 2026، 02_53_39 ص.png",
    "الصور/ChatGPT Image 2 مايو 2026، 02_32_59 ص.png",
    "الصور/عدل_لي_في_هذه_الصورة_202605020157.jpeg"
];


/**
 * DOM Initialization
 */
document.addEventListener('DOMContentLoaded', () => {
    // Set Current Year in Footer
    const yearEl = document.getElementById('currentYear');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // Render Data
    renderProducts();
    renderOffers();

    // Initialize UI Components
    initNavbar();
    initScrollAnimations();

    // Welcome Screen Logic
    const welcomeScreen = document.getElementById('welcome-screen');
    const enterBtn = document.getElementById('enter-site-btn');
    
    // Check if user already entered during this session (Persistent)
    if (localStorage.getItem('siteEntered') === 'true') {
        if (welcomeScreen) {
            welcomeScreen.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    } else {
        if (welcomeScreen) {
            document.body.style.overflow = 'hidden';
            
            enterBtn.addEventListener('click', () => {
                localStorage.setItem('siteEntered', 'true');
                welcomeScreen.style.opacity = '0';
                setTimeout(() => {
                    welcomeScreen.style.display = 'none';
                    document.body.style.overflow = 'auto';
                }, 800);
            });
        }
    }

    // Theme Toggle Logic
    const themeToggleBtn = document.getElementById('theme-toggle');
    if (themeToggleBtn) {
        const themeIcon = themeToggleBtn.querySelector('i');
        
        // Check saved theme
        if (localStorage.getItem('theme') === 'dark') {
            document.body.classList.add('dark-mode');
            themeIcon.classList.replace('fa-moon', 'fa-sun');
        }

        themeToggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            if (document.body.classList.contains('dark-mode')) {
                themeIcon.classList.replace('fa-moon', 'fa-sun');
                localStorage.setItem('theme', 'dark');
            } else {
                themeIcon.classList.replace('fa-sun', 'fa-moon');
                localStorage.setItem('theme', 'light');
            }
        });
    }

    // Page Loader Logic (Ultra-fast)
    const loader = document.querySelector('.page-loader');
    if (loader) {
        loader.classList.add('hidden');
    }
});

/**
 * Play About Us Video
 */
window.playVideo = function() {
    const thumbnail = document.getElementById('video-thumbnail');
    const iframe = document.getElementById('youtube-iframe');
    
    if (thumbnail && iframe) {
        thumbnail.style.display = 'none';
        iframe.style.display = 'block';
    }
}

/**
 * Render Offers dynamically
 */
function renderOffers() {
    const container = document.getElementById('offers-container');
    if (!container) return;

    // Check if we are on home page to limit items
    const path = window.location.pathname;
    const isHomePage = path.endsWith('index.html') || path.endsWith('/') || path === '';
    const itemsToShow = isHomePage ? offers.slice(0, 4) : offers;

    let html = '';
    itemsToShow.forEach((imagePath, index) => {
        const delay = (index % 4) * 0.1;
        
        html += `
            <div class="offer-card slide-up shine-effect" style="transition-delay: ${delay}s">
                <div class="discount-badge">توفير 15%</div>
                <div class="offer-img-wrapper" onclick="openLightbox('${imagePath}', 'عرض خاص')">
                    <img src="${imagePath}" alt="عرض خاص" class="offer-image" loading="lazy">
                    <div class="overlay-zoom"><i class="fa-solid fa-magnifying-glass-plus"></i></div>
                </div>
                <div class="offer-content">
                    <button class="btn btn-whatsapp btn-block" onclick="openLightbox('${imagePath}', 'عرض خاص')">
                        <i class="fa-solid fa-eye"></i> عرض التفاصيل
                    </button>
                </div>
            </div>
        `;
    });
    container.innerHTML = html;
}

window.orderOffer = function(imagePath) {
    const message = `مرحباً شركة الوكيل، أود الاستفسار عن العرض الخاص الموضح في هذه الصورة: ${window.location.origin}/${imagePath}`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank');
}

/**
 * Render Products dynamically
 */
function renderProducts() {
    const container = document.getElementById('products-container');
    if (!container) return;

    // Check if we are on home page to limit items
    const path = window.location.pathname;
    const isHomePage = path.endsWith('index.html') || path.endsWith('/') || path === '';
    const itemsToShow = isHomePage ? products.slice(0, 3) : products;

    let html = '';
    itemsToShow.forEach((product, index) => {
        // Add staggered delay for animation
        const delay = (index % 3) * 0.1;
        
        html += `
            <div class="product-card slide-up shine-effect" style="transition-delay: ${delay}s">
                <div class="product-img-wrapper">
                    <img src="${product.image}" alt="${product.name}" class="product-image" loading="lazy">
                </div>
                <div class="product-content">
                    <h3 class="product-title">${product.name}</h3>
                    <p class="product-desc">${product.description}</p>
                    <div class="product-actions" style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                        <button class="btn btn-whatsapp" onclick="orderProduct(${product.id})">
                            <i class="fa-brands fa-whatsapp"></i> اطلب
                        </button>
                        <button class="btn btn-secondary" onclick="addToCart('${product.name}', '${product.image}', ${product.id})">
                            <i class="fa-solid fa-cart-plus"></i> السلة
                        </button>
                    </div>
                </div>
            </div>
        `;
    });
    container.innerHTML = html;
}

window.orderProduct = function(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const message = `مرحباً شركة الوكيل، أود الاستفسار عن المنتج: ${product.name}`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
}

/**
 * Navbar Logic
 */
function initNavbar() {
    const header = document.querySelector('.header');
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links a');

    // Sticky Header on Scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        updateActiveLink();
    });

    // Mobile Menu Toggle
    mobileToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = mobileToggle.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.replace('fa-bars', 'fa-times');
        } else {
            icon.classList.replace('fa-times', 'fa-bars');
        }
    });

    // Close Mobile Menu on Link Click
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = mobileToggle.querySelector('i');
            if (icon) icon.classList.replace('fa-times', 'fa-bars');
        });
    });

    // Function to update active nav link
    function updateActiveLink() {
        const path = window.location.pathname;
        const page = path.split("/").pop();
        
        links.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            
            // Check if current page matches link href
            if (href === page || (href === 'index.html' && !page) || (href === 'index.html' && page === '')) {
                link.classList.add('active');
            }
            
            // Special case for homepage anchor links if they still exist
            if (href.startsWith('#') && (!page || page === 'index.html')) {
                // Keep existing anchor logic if needed, but we are moving to multi-page
            }
        });
    }
}

/**
 * Scroll Animations (Intersection Observer)
 */
function initScrollAnimations() {
    const selectors = ['.fade-in', '.slide-up', '.zoom-in', '.fade-right', '.fade-left'];
    const elements = document.querySelectorAll(selectors.join(', '));
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    elements.forEach(element => {
        observer.observe(element);
    });
}

/**
 * Sound Logic
 */
const clickSound = new Audio('https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3');

function playClickSound() {
    clickSound.currentTime = 0;
    clickSound.play().catch(e => {});
}

document.addEventListener('click', (e) => {
    if (e.target.closest('button') || e.target.closest('a') || e.target.closest('.control-btn') || e.target.closest('.social-card')) {
        playClickSound();
    }
});

/**
 * Shopping Cart Logic (User-specific)
 */
const getUserCartKey = () => {
    const email = localStorage.getItem('userEmail');
    return email ? `cart_${email}` : 'cart_guest';
};

let cart = JSON.parse(localStorage.getItem(getUserCartKey())) || [];

window.addToCart = function(name, image, id = null) {
    cart.push({ name, image, id });
    localStorage.setItem(getUserCartKey(), JSON.stringify(cart));
    updateCartUI();
    
    // Visual feedback
    const btn = event.target.closest('.btn');
    if (btn) {
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fa-solid fa-check"></i> تم الإضافة';
        setTimeout(() => btn.innerHTML = originalText, 2000);
    }
};

window.removeFromCart = function(index) {
    cart.splice(index, 1);
    localStorage.setItem(getUserCartKey(), JSON.stringify(cart));
    updateCartUI();
};

window.logout = function() {
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    window.location.href = 'login.html';
};

window.toggleCart = function() {
    const sidebar = document.getElementById('cart-sidebar');
    if (sidebar) sidebar.classList.toggle('active');
};

function updateCartUI() {
    const container = document.querySelector('.cart-items');
    const badge = document.querySelector('.cart-badge');
    if (!container) return;

    container.innerHTML = cart.length === 0 ? '<p style="text-align:center; padding: 20px;">السلة فارغة</p>' : '';
    
    cart.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
            <img src="${item.image}" class="cart-item-img">
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <span class="remove-item" onclick="removeFromCart(${index})"><i class="fa-solid fa-trash"></i> حذف</span>
            </div>
        `;
        container.appendChild(div);
    });

    if (badge) badge.textContent = cart.length;
}

// Initial UI update
document.addEventListener('DOMContentLoaded', updateCartUI);

/**
 * Lightbox Logic
 */
window.openLightbox = function(image, name, id = null) {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox) return;

    lightbox.querySelector('.lightbox-img').src = image;
    lightbox.querySelector('.lightbox-title').textContent = name;
    
    const actions = lightbox.querySelector('.lightbox-actions');
    actions.innerHTML = `
        <button class="btn btn-secondary" onclick="addToCart('${name}', '${image}', ${id}); closeLightbox();">
            <i class="fa-solid fa-cart-plus"></i> إضافة للسلة
        </button>
        <button class="btn btn-whatsapp" onclick="${id ? `orderProduct(${id})` : `orderOffer('${image}')`}; closeLightbox();">
            <i class="fa-brands fa-whatsapp"></i> اطلب الآن
        </button>
    `;

    lightbox.classList.add('active');
};

window.closeLightbox = function() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) lightbox.classList.remove('active');
};
