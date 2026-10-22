// DATA MODELS
const productsData = [
    {
        id: 'bag-01',
        name: 'Túi Canvas Grand Studio Tote',
        category: 'canvas-bag',
        categoryLabel: 'Túi Canvas',
        price: 450000,
        priceFormatted: '450.000 đ',
        badge: 'grand',
        rating: 5.0,
        reviewsCount: 84,
        isNew: true,
        isBestseller: true,
        colors: [
            { name: 'Khaki Beige', hex: '#E2D3C1', image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800&auto=format&fit=crop' },
            { name: 'Warm Taupe', hex: '#8C7A6B', image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=800&auto=format&fit=crop' },
            { name: 'Mocha Dark', hex: '#5A4D3A', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=800&auto=format&fit=crop' }
        ],
        specs: {
            dimensions: 'W:380mm\nD:120mm\nH:420mm',
            structure: 'Canvas 14oz\nQuai da bò thật',
            finish: 'Mộc tự nhiên'
        },
        story: {
            feat1Title: 'Engineered for Daily Utility',
            feat1Desc: 'Vải Canvas 14oz mật độ cao chống sờn rách kết hợp đường chỉ may kép giấu mép tinh tế.',
            feat1Img: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=800&auto=format&fit=crop',

            feat2Title: 'Water-Repellent & High Resilience',
            feat2Desc: 'Lòng túi rộng rãi tích hợp ngăn chống sốc Laptop 15.6 inch kèm lớp lót kháng nước.',
            feat2Img: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=800&auto=format&fit=crop',

            feat3Title: 'Minimalist Silhouette',
            feat3Desc: 'Phom đứng dáng gọn gàng, phù hợp hoàn hảo cho cả môi trường công sở lẫn dạo phố.',
            feat3Img: 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800&auto=format&fit=crop'
        },
        pairings: [
            { title: 'Chính diện', img: 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=400&auto=format&fit=crop' },
            { title: 'Góc nghiêng 45°', img: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=400&auto=format&fit=crop' },
            { title: 'Phối đồ Dạo phố', img: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=400&auto=format&fit=crop' },
            { title: 'Chi tiết quai da', img: 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=400&auto=format&fit=crop' }
        ]
    },
    {
        id: 'jacket-01',
        name: 'Áo Khoác Dù Essential Windbreaker',
        category: 'jacket',
        categoryLabel: 'Áo Khoác Dù',
        price: 680000,
        priceFormatted: '680.000 đ',
        badge: 'essential',
        rating: 4.9,
        reviewsCount: 112,
        isNew: true,
        isBestseller: true,
        colors: [
            { name: 'Sand Cream', hex: '#EFE6D5', image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=800&auto=format&fit=crop' },
            { name: 'Earth Brown', hex: '#6E5C4F', image: 'https://images.unsplash.com/photo-1548883354-7622d03aca27?q=80&w=800&auto=format&fit=crop' }
        ],
        specs: {
            dimensions: 'Size: S, M, L, XL\nPhom Wide Boxy',
            structure: 'Vải dù 2 lớp\nTrượt nước Microfiber',
            finish: 'Khóa dán Velcro & YKK'
        },
        story: {
            feat1Title: 'Engineered for Daily Utility',
            feat1Desc: 'Công nghệ vải dù cản gió Microfiber thoáng khí, không gây hầm nóng.',
            feat1Img: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=800&auto=format&fit=crop',

            feat2Title: 'Water-Repellent & High Resilience',
            feat2Desc: 'Lớp phủ bề mặt trượt nước hạt sen chống bám bụi và mưa nhẹ rào.',
            feat2Img: 'https://images.unsplash.com/photo-1548883354-7622d03aca27?q=80&w=800&auto=format&fit=crop',

            feat3Title: 'Minimalist Silhouette',
            feat3Desc: 'Nón trùm giấu cổ cùng dây rút bo gấu linh hoạt theo dáng người.',
            feat3Img: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=800&auto=format&fit=crop'
        },
        pairings: [
            { title: 'Nhìn từ trước', img: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=400&auto=format&fit=crop' },
            { title: 'Nhìn từ sau', img: 'https://images.unsplash.com/photo-1548883354-7622d03aca27?q=80&w=400&auto=format&fit=crop' },
            { title: 'Góc nghiêng', img: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=400&auto=format&fit=crop' },
            { title: 'Cận cảnh nón', img: 'https://images.unsplash.com/photo-1548883354-7622d03aca27?q=80&w=400&auto=format&fit=crop' }
        ]
    },
    {
        id: 'cargo-01',
        name: 'Quần Túi Hộp Urban Cargo Pants',
        category: 'cargo-pants',
        categoryLabel: 'Quần Túi Hộp',
        price: 520000,
        priceFormatted: '520.000 đ',
        badge: 'utility',
        rating: 4.8,
        reviewsCount: 52,
        isNew: true,
        isBestseller: true,
        colors: [
            { name: 'Olive Earth', hex: '#6E5C4F', image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=800&auto=format&fit=crop' },
            { name: 'Sand Khaki', hex: '#D2BC9B', image: 'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?q=80&w=800&auto=format&fit=crop' }
        ],
        specs: {
            dimensions: 'Size: S, M, L, XL\nPhom Wide Leg',
            structure: 'Kaki Cotton Ripstop\nĐàn hồi co giãn nhẹ',
            finish: '4 Túi hộp xếp gấp'
        },
        story: {
            feat1Title: 'Engineered for Daily Utility',
            feat1Desc: 'Túi hộp 3D gấp viền nam tỏi tiện dụng, đường chỉ may dằn 3 kim siêu chắc.',
            feat1Img: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=800&auto=format&fit=crop',

            feat2Title: 'Water-Repellent & High Resilience',
            feat2Desc: 'Chất kaki Ripstop chống xước, chịu ma sát tốt thích hợp di chuyển nhiều.',
            feat2Img: 'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?q=80&w=800&auto=format&fit=crop',

            feat3Title: 'Minimalist Silhouette',
            feat3Desc: 'Dây rút gấu biến tấu linh hoạt giữa ống suông wide-leg và jogger.',
            feat3Img: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=800&auto=format&fit=crop'
        },
        pairings: [
            { title: 'Ống suông', img: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=400&auto=format&fit=crop' },
            { title: 'Bo gấu Jogger', img: 'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?q=80&w=400&auto=format&fit=crop' },
            { title: 'Góc nghiêng túi', img: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=400&auto=format&fit=crop' },
            { title: 'Cận cảnh nắp túi', img: 'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?q=80&w=400&auto=format&fit=crop' }
        ]
    },
    {
        id: 'bag-02',
        name: 'Túi Canvas Crossbody Mini',
        category: 'canvas-bag',
        categoryLabel: 'Túi Canvas',
        price: 320000,
        priceFormatted: '320.000 đ',
        badge: 'compact',
        rating: 4.9,
        reviewsCount: 38,
        isNew: false,
        isBestseller: false,
        colors: [
            { name: 'Warm Taupe', hex: '#8C7A6B', image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=800&auto=format&fit=crop' }
        ],
        specs: {
            dimensions: 'W:220mm\nD:70mm\nH:180mm',
            structure: 'Canvas 12oz\nDây đeo điều chỉnh',
            finish: 'Khóa kéo YKK mạ đồng'
        },
        story: {
            feat1Title: 'Engineered for Daily Utility',
            feat1Desc: 'Nhỏ gọn vừa vặn ví tiền, điện thoại và vật dụng cá nhân.',
            feat1Img: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=800&auto=format&fit=crop',
            feat2Title: 'Water-Repellent & High Resilience',
            feat2Desc: 'Lót dù trượt nước bảo vệ đồ đạc an toàn.',
            feat2Img: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=800&auto=format&fit=crop',
            feat3Title: 'Minimalist Silhouette',
            feat3Desc: 'Dây đeo tăng giảm độ dài tiện lợi.',
            feat3Img: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=800&auto=format&fit=crop'
        },
        pairings: [
            { title: 'Nhìn từ trước', img: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=400&auto=format&fit=crop' },
            { title: 'Đeo chéo', img: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=400&auto=format&fit=crop' }
        ]
    }
];

let reviewsData = [
    {
        id: 'rev-1',
        author: 'Minh Thảo',
        productBought: 'Túi Canvas Grand Studio Tote',
        category: 'canvas-bag',
        stars: 5,
        date: '2 ngày trước',
        verified: true,
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop',
        comment: 'Túi siêu dày dặn, phom đứng rất đẹp. Mình đựng vừa laptop 15.6 inch mà quai da đeo êm vai lắm. Rất hài lòng với màu Khaki!',
        image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=300&auto=format&fit=crop'
    },
    {
        id: 'rev-2',
        author: 'Hoàng Nam',
        productBought: 'Áo Khoác Dù Essential Windbreaker',
        category: 'jacket',
        stars: 5,
        date: '1 tuần trước',
        verified: true,
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop',
        comment: 'Áo mặc đi mưa nhẹ rất Ok, nước đọng thành hạt trượt xuống luôn. Phom rộng boxy mặc vừa cá tính vừa thoải mái.',
        image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=300&auto=format&fit=crop'
    },
    {
        id: 'rev-3',
        author: 'Khánh Linh',
        productBought: 'Quần Túi Hộp Urban Cargo Pants',
        category: 'cargo-pants',
        stars: 5,
        date: '2 tuần trước',
        verified: true,
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop',
        comment: 'Chất kaki dày dặn chuẩn Ripstop, túi hộp may rộng rãi đựng đồ tiện cực. Đóng gói hộp rất thơm và cẩn thận.',
        image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=300&auto=format&fit=crop'
    }
];
