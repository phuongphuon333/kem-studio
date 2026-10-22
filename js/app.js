// GLOBAL APP STATE
let currentSection = 'home';
let currentCategory = 'all';
let selectedProduct = null;
let activeColorIndex = 0;
let selectedSize = 'M';
let cart = JSON.parse(localStorage.getItem('kem_cart')) || [];
let wishlist = JSON.parse(localStorage.getItem('kem_wishlist')) || [];

// INITIALIZATION
window.addEventListener('DOMContentLoaded', () => {
    renderHomeSections();
    renderShopProducts();
    renderReviewsPage();
    updateCartBadge();
    updateWishlistBadge();
});

// ROUTING
function showSection(sectionId, category = 'all') {
    currentSection = sectionId;
    currentCategory = category;

    document.getElementById('section-home').classList.add('hidden');
    document.getElementById('section-shop').classList.add('hidden');
    document.getElementById('section-detail').classList.add('hidden');
    document.getElementById('section-reviews').classList.add('hidden');

    const targetSection = document.getElementById(`section-${sectionId}`);
    if (targetSection) targetSection.classList.remove('hidden');

    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (sectionId === 'shop') filterCategory(category);
    if (sectionId === 'reviews') renderReviewsPage();
}

function scrollToStory() {
    showSection('home');
    setTimeout(() => {
        const storyElem = document.getElementById('story-section');
        if (storyElem) storyElem.scrollIntoView({ behavior: 'smooth' });
    }, 100);
}

function toggleMobileMenu() {
    document.getElementById('mobile-menu').classList.toggle('hidden');
}

// RENDER HOME SECTIONS
function renderHomeSections() {
    const newArrivals = productsData.filter(p => p.isNew);
    document.getElementById('home-new-arrivals').innerHTML = newArrivals.map(p => createProductCardHTML(p)).join('');

    const bestsellers = productsData.filter(p => p.isBestseller);
    document.getElementById('home-bestsellers-grid').innerHTML = bestsellers.map(p => createProductCardHTML(p)).join('');

    document.getElementById('home-just-for-you-grid').innerHTML = productsData.slice(0, 2).map(p => createProductCardHTML(p)).join('');

    document.getElementById('home-reviews-preview').innerHTML = reviewsData.slice(0, 3).map(r => `
        <div class="bg-white p-5 rounded-2xl border border-cream-200 space-y-3 shadow-sm">
            <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                    <img src="${r.avatar}" class="w-8 h-8 rounded-full object-cover">
                    <div>
                        <h4 class="text-xs font-bold text-cream-900">${r.author}</h4>
                        <span class="text-[9px] text-green-700 font-semibold bg-green-50 px-1.5 py-0.5 rounded">Verified Buyer</span>
                    </div>
                </div>
                <span class="text-yellow-500 text-xs">★★★★★</span>
            </div>
            <p class="text-xs text-cream-800 italic">"${r.comment}"</p>
            <span class="block text-[10px] text-tan font-semibold">${r.productBought}</span>
        </div>
    `).join('');
}

// PRODUCT CARD GENERATOR
function createProductCardHTML(p) {
    const isWishlist = wishlist.includes(p.id);
    return `
        <div class="bg-white rounded-3xl p-4 border border-cream-200/80 shadow-sm hover:shadow-md transition space-y-3 flex flex-col justify-between group">
            <div>
                <div class="relative h-64 rounded-2xl overflow-hidden bg-cream-100 cursor-pointer mb-3">
                    <img src="${p.colors[0].image}" onclick="openProductDetail('${p.id}')" class="w-full h-full object-cover group-hover:scale-105 transition duration-500">
                    ${p.isNew ? `<span class="absolute top-3 left-3 bg-cream-900 text-white text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full">NEW</span>` : ''}
                    <button onclick="toggleWishlist('${p.id}')" class="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 hover:bg-white flex items-center justify-center text-cream-900 transition shadow">
                        <i class="${isWishlist ? 'fa-solid text-red-500' : 'fa-regular'} fa-heart text-xs"></i>
                    </button>
                </div>
                <div class="flex items-center justify-between text-[11px] text-tan font-semibold mb-1">
                    <span>${p.categoryLabel}</span>
                    <span>⭐ ${p.rating} (${p.reviewsCount})</span>
                </div>
                <h3 onclick="openProductDetail('${p.id}')" class="serif-title text-base font-bold text-cream-900 hover:text-tan cursor-pointer transition line-clamp-1">
                    ${p.name}
                </h3>
                <p class="text-xs font-bold text-cream-900 mt-1">${p.priceFormatted}</p>
            </div>

            <button onclick="openProductDetail('${p.id}')" class="w-full py-2.5 bg-cream-100 hover:bg-cream-900 hover:text-white text-cream-900 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1">
                Xem Chi Tiết <i class="fa-solid fa-arrow-right text-[10px]"></i>
            </button>
        </div>
    `;
}

// SHOP CATEGORY FILTER
function renderShopProducts() {
    filterCategory(currentCategory);
}

function filterCategory(category) {
    currentCategory = category;

    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('bg-cream-900', 'text-cream-50');
        btn.classList.add('bg-cream-200', 'text-cream-900');
    });

    const activeBtn = document.getElementById(`tab-${category}`);
    if (activeBtn) {
        activeBtn.classList.remove('bg-cream-200', 'text-cream-900');
        activeBtn.classList.add('bg-cream-900', 'text-cream-50');
    }

    const container = document.getElementById('shop-products-grid');
    const filtered = category === 'all' ? productsData : productsData.filter(p => p.category === category);

    container.innerHTML = filtered.map(p => createProductCardHTML(p)).join('');
}

// OPEN PRODUCT DETAIL PAGE
function openProductDetail(productId) {
    selectedProduct = productsData.find(p => p.id === productId);
    if (!selectedProduct) return;
    activeColorIndex = 0;
    selectedSize = 'M';

    renderProductDetailCard();
    renderPairingsSection();
    showSection('detail');
}

// RENDER SINGLE FRAME PRODUCT CARD
function renderProductDetailCard() {
    const container = document.getElementById('product-detail-card');
    const p = selectedProduct;
    const activeColor = p.colors[activeColorIndex];

    container.innerHTML = `
        <!-- 1. COLOR SWATCHES & MAIN IMAGE -->
        <div class="space-y-6">
            <div class="flex flex-col items-center space-y-3">
                <span class="text-xs uppercase tracking-widest text-cream-800 font-semibold">available finish</span>
                <div class="flex items-center space-x-3">
                    ${p.colors.map((color, index) => `
                        <button 
                            onclick="changeDetailColor(${index})"
                            style="background-color: ${color.hex};"
                            class="w-7 h-7 rounded-full border-2 border-white shadow-md transition-all transform ${index === activeColorIndex ? 'ring-2 ring-cream-900 scale-125' : 'hover:scale-110 opacity-80'}"
                            title="${color.name}">
                        </button>
                    `).join('')}
                </div>
                <div class="pt-1">
                    <span class="px-6 py-1 rounded-full border border-cream-800 text-cream-900 text-xs font-medium uppercase tracking-wider">
                        ${p.badge}
                    </span>
                </div>
            </div>

            <div class="flex justify-center items-center py-2">
                <div class="relative w-full max-w-md h-80 sm:h-96 rounded-2xl overflow-hidden bg-cream-100/50 flex items-center justify-center p-4">
                    <img id="detail-main-img" src="${activeColor.image}" alt="${p.name}" class="max-h-full object-contain transition-all duration-300">
                </div>
            </div>
        </div>

        <!-- 2. SPECIFICATIONS GRID INSIDE FRAME -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-center py-6 border-t border-b border-cream-200">
            <div class="space-y-1">
                <span class="block text-xs uppercase tracking-wider text-cream-800 font-semibold">category</span>
                <p class="text-sm font-semibold text-cream-900">${p.categoryLabel}</p>
            </div>
            <div class="space-y-1 border-l border-cream-200/60 pl-2">
                <span class="block text-xs uppercase tracking-wider text-cream-800 font-semibold">dimensions</span>
                <p class="text-xs font-medium text-cream-900 leading-snug whitespace-pre-line">${p.specs.dimensions}</p>
            </div>
            <div class="space-y-1 border-l border-cream-200/60 pl-2">
                <span class="block text-xs uppercase tracking-wider text-cream-800 font-semibold">structure</span>
                <p class="text-xs font-medium text-cream-900 leading-snug whitespace-pre-line">${p.specs.structure}</p>
            </div>
            <div class="space-y-1 border-l border-cream-200/60 pl-2">
                <span class="block text-xs uppercase tracking-wider text-cream-800 font-semibold">finish</span>
                <p class="text-xs font-medium text-cream-900 leading-snug whitespace-pre-line">${p.specs.finish}</p>
            </div>
        </div>

        <!-- 3. ADD TO CART BLOCK INSIDE FRAME -->
        <div class="pt-8 border-t border-cream-200 space-y-6">
            <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <span class="text-xs text-tan block">Màu đang chọn: <strong class="text-cream-900">${activeColor.name}</strong></span>
                    <span class="serif-title text-3xl font-bold text-cream-900">${p.priceFormatted}</span>
                </div>

                <div class="flex items-center gap-2">
                    <span class="text-xs uppercase font-bold text-cream-800">Size:</span>
                    <div class="flex gap-1.5">
                        ${['S', 'M', 'L', 'XL'].map(sz => `
                            <button onclick="selectSize('${sz}')" class="size-btn w-9 h-9 rounded-xl border text-xs font-bold transition ${selectedSize === sz ? 'bg-cream-900 text-white border-cream-900' : 'bg-cream-50 text-cream-900 border-cream-200 hover:border-tan'}">
                                ${sz}
                            </button>
                        `).join('')}
                    </div>
                </div>
            </div>

            <button onclick="addToCart()" class="w-full py-4 bg-cream-900 hover:bg-tan text-white rounded-2xl font-semibold text-sm transition shadow-lg flex items-center justify-center gap-2">
                <i class="fa-solid fa-bag-shopping"></i> Thêm Vào Túi Hàng
            </button>
        </div>

        <!-- 4. DESIGN STORY 01, 02, 03 -->
        ${p.story ? `
            <div class="space-y-10">
                <div class="text-center space-y-1">
                    <span class="text-xs font-bold uppercase tracking-widest text-tan">Craftsmanship & Story</span>
                    <h2 class="serif-title text-2xl font-bold text-cream-900">Chi Tiết & Câu Chuyện Thiết Kế</h2>
                </div>

                <!-- BLOCK 01 -->
                <div class="pt-6 border-t border-cream-200 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                    <div class="rounded-2xl overflow-hidden h-60 bg-cream-100">
                        <img src="${p.story.feat1Img}" class="w-full h-full object-cover">
                    </div>
                    <div class="space-y-2">
                        <span class="serif-title text-3xl font-bold text-tan">01</span>
                        <h3 class="serif-title text-xl font-bold text-cream-900">${p.story.feat1Title}</h3>
                        <p class="text-xs sm:text-sm text-cream-800 leading-relaxed">${p.story.feat1Desc}</p>
                    </div>
                </div>

                <!-- BLOCK 02 -->
                <div class="pt-6 border-t border-cream-200 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                    <div class="space-y-2 md:order-1 order-2">
                        <span class="serif-title text-3xl font-bold text-tan">02</span>
                        <h3 class="serif-title text-xl font-bold text-cream-900">${p.story.feat2Title}</h3>
                        <p class="text-xs sm:text-sm text-cream-800 leading-relaxed">${p.story.feat2Desc}</p>
                    </div>
                    <div class="rounded-2xl overflow-hidden h-60 bg-cream-100 md:order-2 order-1">
                        <img src="${p.story.feat2Img}" class="w-full h-full object-cover">
                    </div>
                </div>

                <!-- BLOCK 03 -->
                <div class="pt-6 border-t border-cream-200 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                    <div class="rounded-2xl overflow-hidden h-60 bg-cream-100">
                        <img src="${p.story.feat3Img}" class="w-full h-full object-cover">
                    </div>
                    <div class="space-y-2">
                        <span class="serif-title text-3xl font-bold text-tan">03</span>
                        <h3 class="serif-title text-xl font-bold text-cream-900">${p.story.feat3Title}</h3>
                        <p class="text-xs sm:text-sm text-cream-800 leading-relaxed">${p.story.feat3Desc}</p>
                    </div>
                </div>
            </div>
        ` : ''}
    `;
}

// RENDER PAIRINGS
function renderPairingsSection() {
    const container = document.getElementById('pairing-grid-container');
    const p = selectedProduct;

    container.innerHTML = p.pairings.map(item => `
        <div class="bg-white rounded-2xl p-2.5 text-center space-y-2 border border-cream-200 hover:border-tan transition shadow-sm">
            <div class="h-32 rounded-xl overflow-hidden bg-cream-100">
                <img src="${item.img}" class="w-full h-full object-cover">
            </div>
            <span class="block text-[11px] text-cream-900 font-semibold">${item.title}</span>
        </div>
    `).join('');
}

function changeDetailColor(index) {
    activeColorIndex = index;
    renderProductDetailCard();
}

function selectSize(sz) {
    selectedSize = sz;
    renderProductDetailCard();
}

// REVIEWS PAGE RENDER & FILTERS
function renderReviewsPage() {
    filterReviews('all');
}

function filterReviews(category) {
    document.querySelectorAll('.rev-btn').forEach(btn => {
        btn.classList.remove('bg-cream-900', 'text-white');
        btn.classList.add('bg-cream-200', 'text-cream-900');
    });

    const activeBtn = document.getElementById(`rev-tab-${category}`);
    if(activeBtn) {
        activeBtn.classList.remove('bg-cream-200', 'text-cream-900');
        activeBtn.classList.add('bg-cream-900', 'text-white');
    }

    const container = document.getElementById('full-reviews-list');
    const filtered = category === 'all' ? reviewsData : reviewsData.filter(r => r.category === category);

    container.innerHTML = filtered.map(r => `
        <div class="bg-white rounded-3xl p-6 border border-cream-200 shadow-sm space-y-4">
            <div class="flex items-start justify-between">
                <div class="flex items-center gap-3">
                    <img src="${r.avatar}" class="w-10 h-10 rounded-full object-cover">
                    <div>
                        <h4 class="text-sm font-bold text-cream-900">${r.author}</h4>
                        <div class="flex items-center gap-2">
                            <span class="text-yellow-500 text-xs">★★★★★</span>
                            <span class="text-[10px] text-green-700 bg-green-50 font-bold px-2 py-0.5 rounded-full">Đã mua hàng</span>
                        </div>
                    </div>
                </div>
                <span class="text-xs text-cream-800">${r.date}</span>
            </div>

            <p class="text-xs sm:text-sm text-cream-800 leading-relaxed">"${r.comment}"</p>

            ${r.image ? `
                <div class="w-24 h-24 rounded-2xl overflow-hidden bg-cream-100 border border-cream-200">
                    <img src="${r.image}" class="w-full h-full object-cover">
                </div>
            ` : ''}

            <div class="pt-2 border-t border-cream-100 flex items-center justify-between text-xs text-cream-800">
                <span>Sản phẩm: <strong class="text-cream-900">${r.productBought}</strong></span>
                <button class="hover:text-tan transition"><i class="fa-regular fa-thumbs-up mr-1"></i> Hữu ích</button>
            </div>
        </div>
    `).join('');
}

function openWriteReviewModal() {
    document.getElementById('write-review-modal').classList.remove('hidden');
}

function closeWriteReviewModal() {
    document.getElementById('write-review-modal').classList.add('hidden');
}

function submitNewReview(e) {
    e.preventDefault();
    const author = document.getElementById('rev-author').value;
    const productBought = document.getElementById('rev-product-select').value;
    const stars = parseInt(document.getElementById('rev-stars').value);
    const comment = document.getElementById('rev-text').value;

    reviewsData.unshift({
        id: 'rev-' + Date.now(),
        author,
        productBought,
        category: 'canvas-bag',
        stars,
        date: 'Vừa xong',
        verified: true,
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop',
        comment
    });

    closeWriteReviewModal();
    showToast("Cảm ơn bạn đã gửi đánh giá!");
    filterReviews('all');
}

// WISHLIST LOGIC
function toggleWishlist(productId) {
    if(wishlist.includes(productId)) {
        wishlist = wishlist.filter(id => id !== productId);
        showToast("Đã xóa khỏi danh sách yêu thích");
    } else {
        wishlist.push(productId);
        showToast("Đã thêm vào danh sách yêu thích");
    }
    localStorage.setItem('kem_wishlist', JSON.stringify(wishlist));
    updateWishlistBadge();
    renderHomeSections();
    if(currentSection === 'shop') renderShopProducts();
}

function updateWishlistBadge() {
    const badge = document.getElementById('wishlist-badge');
    if(wishlist.length > 0) {
        badge.innerText = wishlist.length;
        badge.classList.remove('hidden');
    } else {
        badge.classList.add('hidden');
    }
}

function toggleWishlistDrawer() {
    showToast(`Bạn có ${wishlist.length} sản phẩm trong danh sách yêu thích`);
}

// CART LOGIC
function addToCart() {
    if (!selectedProduct) return;
    const color = selectedProduct.colors[activeColorIndex];
    const cartKey = `${selectedProduct.id}-${color.name}-${selectedSize}`;
    const existing = cart.find(i => i.key === cartKey);

    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({
            key: cartKey,
            id: selectedProduct.id,
            name: selectedProduct.name,
            price: selectedProduct.price,
            colorName: color.name,
            size: selectedSize,
            image: color.image,
            quantity: 1
        });
    }

    saveCart();
    showToast(`Đã thêm "${selectedProduct.name}" vào túi!`);
    toggleCartDrawer(true);
}

function updateQuantity(key, delta) {
    const item = cart.find(i => i.key === key);
    if(!item) return;

    item.quantity += delta;
    if(item.quantity <= 0) {
        cart = cart.filter(i => i.key !== key);
    }
    saveCart();
    renderCartItems();
}

function saveCart() {
    localStorage.setItem('kem_cart', JSON.stringify(cart));
    updateCartBadge();
}

function updateCartBadge() {
    const badge = document.getElementById('cart-badge');
    const total = cart.reduce((sum, item) => sum + item.quantity, 0);

    if(total > 0) {
        badge.innerText = total;
        badge.classList.remove('hidden');
    } else {
        badge.classList.add('hidden');
    }
}

function toggleCartDrawer(forceOpen = false) {
    const drawer = document.getElementById('cart-drawer');
    if(forceOpen) drawer.classList.remove('hidden');
    else drawer.classList.toggle('hidden');

    if(!drawer.classList.contains('hidden')) renderCartItems();
}

function renderCartItems() {
    const container = document.getElementById('cart-items-container');
    if(cart.length === 0) {
        container.innerHTML = `
            <div class="text-center py-16 text-mocha space-y-3">
                <i class="fa-solid fa-basket-shopping text-4xl opacity-40"></i>
                <p class="text-sm font-medium">Túi hàng của bạn đang trống</p>
            </div>
        `;
        document.getElementById('cart-subtotal').innerText = '0 đ';
        document.getElementById('cart-total').innerText = '0 đ';
        document.getElementById('btn-checkout-trigger').disabled = true;
        return;
    }

    document.getElementById('btn-checkout-trigger').disabled = false;
    let subtotal = 0;

    container.innerHTML = cart.map(item => {
        const total = item.price * item.quantity;
        subtotal += total;
        return `
            <div class="flex gap-4 p-3 bg-white rounded-xl border border-cream-200">
                <img src="${item.image}" class="w-16 h-16 rounded-lg object-cover bg-cream-100">
                <div class="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                        <h4 class="text-xs font-bold text-cream-900 truncate">${item.name}</h4>
                        <span class="text-[10px] text-tan">Màu: ${item.colorName} | Size: ${item.size}</span>
                    </div>
                    <div class="flex items-center justify-between text-xs mt-2">
                        <span class="font-bold text-cream-900">${total.toLocaleString('vi-VN')} đ</span>
                        <div class="flex items-center gap-2 bg-cream-100 rounded-lg px-2 py-1">
                            <button onclick="updateQuantity('${item.key}', -1)" class="font-bold px-1 text-cream-800">-</button>
                            <span class="font-semibold text-xs">${item.quantity}</span>
                            <button onclick="updateQuantity('${item.key}', 1)" class="font-bold px-1 text-cream-800">+</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    document.getElementById('cart-subtotal').innerText = subtotal.toLocaleString('vi-VN') + ' đ';
    document.getElementById('cart-total').innerText = subtotal.toLocaleString('vi-VN') + ' đ';
}

// CHECKOUT & TOAST LOGIC
function openCheckoutModal() {
    if(cart.length === 0) return;
    toggleCartDrawer();
    document.getElementById('checkout-modal').classList.remove('hidden');
}

function closeCheckoutModal() {
    document.getElementById('checkout-modal').classList.add('hidden');
}

function handleOrderSubmit(e) {
    e.preventDefault();
    cart = [];
    saveCart();
    closeCheckoutModal();
    showToast("Đặt hàng thành công! KEM Studio sẽ liên hệ sớm.");
    showSection('home');
}

function handleSearch(e) {
    if (e.key === 'Enter') executeSearch();
}

function executeSearch() {
    const query = document.getElementById('global-search-input').value.toLowerCase();
    if (!query) return;
    showSection('shop', 'all');
    showToast(`Đã tìm kiếm với từ khóa: "${query}"`);
}

function showToast(msg) {
    const toast = document.getElementById('toast-notification');
    document.getElementById('toast-message').innerText = msg;
    toast.classList.remove('translate-y-20', 'opacity-0', 'pointer-events-none');
    setTimeout(() => {
        toast.classList.add('translate-y-20', 'opacity-0', 'pointer-events-none');
    }, 3000);
}