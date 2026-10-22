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
            { name: 'Khaki Beige', hex: '#E2D3C1', image: 'assets/images/products/bag-khaki.jpg' },
            { name: 'Warm Taupe', hex: '#8C7A6B', image: 'assets/images/products/bag-taupe.jpg' }
        ],
        specs: {
            dimensions: 'W:380mm\nD:120mm\nH:420mm',
            structure: 'Canvas 14oz\nQuai da bò thật',
            finish: 'Mộc tự nhiên'
        },
        story: {
            feat1Title: 'Engineered for Daily Utility',
            feat1Desc: 'Vải Canvas 14oz mật độ cao chống sờn rách.',
            feat1Img: 'assets/images/products/feat1.jpg',
            feat2Title: 'Water-Repellent & Resilience',
            feat2Desc: 'Lòng túi rộng có ngăn laptop 15.6 inch.',
            feat2Img: 'assets/images/products/feat2.jpg',
            feat3Title: 'Minimalist Silhouette',
            feat3Desc: 'Phom đứng phom phác tối giản tinh tế.',
            feat3Img: 'assets/images/products/feat3.jpg'
        },
        pairings: [
            { title: 'Chính diện', img: 'assets/images/products/bag-khaki.jpg' },
            { title: 'Phối đồ Dạo phố', img: 'assets/images/products/bag-taupe.jpg' }
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
        comment: 'Túi siêu dày dặn, phom đứng rất đẹp. Đựng vừa laptop 15.6 inch!'
    }
];