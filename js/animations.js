// Hiệu ứng Zoom / Đổi ảnh Gallery khi Hover hoặc Click
function initGalleryInteractions() {
    document.querySelectorAll('.gallery-thumb').forEach(thumb => {
        thumb.addEventListener('click', function() {
            const mainImg = document.getElementById('detail-main-img');
            if (mainImg) {
                mainImg.style.opacity = '0.3';
                setTimeout(() => {
                    mainImg.src = this.dataset.src;
                    mainImg.style.opacity = '1';
                }, 150);
            }
            document.querySelectorAll('.gallery-thumb').forEach(t => t.classList.remove('ring-2', 'ring-tan'));
            this.classList.add('ring-2', 'ring-tan');
        });
    });
}

// Ripple Effect khi click vào nút icon
function applyIconRipple(element) {
    element.classList.add('scale-95');
    setTimeout(() => element.classList.remove('scale-95'), 150);
}