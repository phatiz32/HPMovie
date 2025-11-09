// Shop Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Sample products data
    const products = [
        {
            id: 1,
            name: "Combo Bắp Nước Siêu Tiết Kiệm",
            category: "popcorn",
            price: 75000,
            image: "images/shop/combo1.jpg",
            description: "1 bắp lớn + 2 nước ngọt",
            features: [
                "Bắp lớn thơm ngon",
                "2 nước ngọt 500ml",
                "Tiết kiệm 20% so với mua lẻ",
                "Áp dụng cho tất cả các rạp"
            ]
        },
        {
            id: 2,
            name: "Combo Đôi Lãng Mạn",
            category: "popcorn",
            price: 120000,
            image: "images/shop/combo2.jpg",
            description: "2 bắp vừa + 2 nước + 1 snack",
            features: [
                "2 bắp vừa",
                "2 nước ngọt 500ml",
                "1 snack khoai tây",
                "Hoàn hảo cho cặp đôi"
            ]
        },
        {
            id: 3,
            name: "Áo Thun Spider-Man",
            category: "merchandise",
            price: 150000,
            image: "images/shop/spiderman-tshirt.jpg",
            description: "Áo thun cotton in hình Spider-Man",
            features: [
                "Chất liệu cotton 100%",
                "Co giãn 4 chiều",
                "In hình chất lượng cao",
                "Size M, L, XL"
            ]
        },
        {
            id: 4,
            name: "Mũ Batman",
            category: "merchandise",
            price: 80000,
            image: "images/shop/batman-cap.jpg",
            description: "Mũ lưỡi trai Batman chính hãng",
            features: [
                "Chất liệu vải cao cấp",
                "Điều chỉnh kích thước",
                "Logo Batman thêu tinh xảo",
                "Phù hợp mọi lứa tuổi"
            ]
        },
        {
            id: 5,
            name: "Voucher Giảm 50%",
            category: "voucher",
            price: 200000,
            image: "images/shop/voucher50.jpg",
            description: "Voucher giảm 50% cho 1 vé xem phim",
            features: [
                "Giảm 50% giá vé",
                "Áp dụng mọi suất chiếu",
                "Thời hạn 3 tháng",
                "Có thể tặng người thân"
            ]
        },
        {
            id: 6,
            name: "Figure Iron Man",
            category: "collectibles",
            price: 350000,
            image: "images/shop/ironman-figure.jpg",
            description: "Figure Iron Man phiên bản giới hạn",
            features: [
                "Chiều cao 15cm",
                "Chất liệu nhựa ABS",
                "15 điểm khớp cử động",
                "Kèm đế đứng và vũ khí"
            ]
        },
        {
            id: 7,
            name: "Combo Gia Đình",
            category: "popcorn",
            price: 199000,
            image: "images/shop/family-combo.jpg",
            description: "2 bắp lớn + 4 nước + 2 snack",
            features: [
                "2 bắp lớn",
                "4 nước ngọt 500ml",
                "2 snack tự chọn",
                "Tiết kiệm 30%"
            ]
        },
        {
            id: 8,
            name: "Túi Tote Avengers",
            category: "merchandise",
            price: 120000,
            image: "images/shop/avengers-tote.jpg",
            description: "Túi tote in hình Avengers",
            features: [
                "Chất liệu canvas",
                "In hình độ phân giải cao",
                "Quai đeo chắc chắn",
                "Kích thước 40x35cm"
            ]
        }
    ];

    // DOM Elements
    const categoryBtns = document.querySelectorAll('.category-btn');
    const sortProducts = document.getElementById('sortProducts');
    const productsGrid = document.getElementById('productsGrid');
    const productModal = document.getElementById('productModal');
    const cartSidebar = document.getElementById('cartSidebar');
    const cartToggle = document.getElementById('cartToggle');
    const closeCart = document.querySelector('.close-cart');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    const cartCount = document.getElementById('cartCount');

    // Cart state
    let cart = JSON.parse(localStorage.getItem('cinemax_cart')) || [];

    // Initialize
    renderProducts(products);
    updateCartUI();
    setupEventListeners();

    function setupEventListeners() {
        // Category filter
        categoryBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                categoryBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                filterProducts();
            });
        });

        // Sort products
        sortProducts.addEventListener('change', filterProducts);

        // Cart toggle
        cartToggle.addEventListener('click', toggleCart);
        closeCart.addEventListener('click', toggleCart);

        // Close modal when clicking outside
        productModal.addEventListener('click', function(e) {
            if (e.target === productModal) {
                closeModal();
            }
        });
    }

    function filterProducts() {
        const activeCategory = document.querySelector('.category-btn.active').dataset.category;
        const sortBy = sortProducts.value;

        let filteredProducts = products;

        // Filter by category
        if (activeCategory !== 'all') {
            filteredProducts = products.filter(product => product.category === activeCategory);
        }

        // Sort products
        switch (sortBy) {
            case 'newest':
                filteredProducts.sort((a, b) => b.id - a.id);
                break;
            case 'price-low':
                filteredProducts.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                filteredProducts.sort((a, b) => b.price - a.price);
                break;
            case 'popular':
            default:
                // Default sort by ID (simulating popularity)
                filteredProducts.sort((a, b) => a.id - b.id);
                break;
        }

        renderProducts(filteredProducts);
    }

    function renderProducts(productsToRender) {
        productsGrid.innerHTML = '';

        if (productsToRender.length === 0) {
            productsGrid.innerHTML = `
                <div class="no-products">
                    <p>Không tìm thấy sản phẩm phù hợp.</p>
                </div>
            `;
            return;
        }

        productsToRender.forEach(product => {
            const productCard = createProductCard(product);
            productsGrid.appendChild(productCard);
        });
    }

    function createProductCard(product) {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <div class="product-category">${getCategoryName(product.category)}</div>
                <h3 class="product-name">${product.name}</h3>
                <p class="product-desc">${product.description}</p>
                <p class="product-price">${formatPrice(product.price)}<sup>đ</sup></p>
                <div class="product-actions">
                    <button class="btn-add-cart" data-id="${product.id}">Thêm giỏ hàng</button>
                    <button class="btn-buy-now" data-id="${product.id}">Mua ngay</button>
                </div>
            </div>
        `;

        // Add event listeners
        card.querySelector('.btn-add-cart').addEventListener('click', function(e) {
            e.stopPropagation();
            addToCart(product.id);
        });

        card.querySelector('.btn-buy-now').addEventListener('click', function(e) {
            e.stopPropagation();
            addToCart(product.id);
            toggleCart();
        });

        card.addEventListener('click', function() {
            openProductModal(product);
        });

        return card;
    }

    function openProductModal(product) {
        document.getElementById('modalProductName').textContent = product.name;
        document.getElementById('modalProductImage').src = product.image;
        document.getElementById('modalProductPrice').textContent = `${formatPrice(product.price)}đ`;
        document.getElementById('modalProductDesc').textContent = product.description;
        
        const featuresList = document.getElementById('modalProductFeatures');
        featuresList.innerHTML = product.features.map(feature => 
            `<li>${feature}</li>`
        ).join('');

        // Reset quantity
        document.getElementById('productQty').value = 1;

        // Update modal buttons
        const addToCartBtn = document.getElementById('addToCart');
        const buyNowBtn = document.getElementById('buyNow');
        
        addToCartBtn.onclick = function() {
            const quantity = parseInt(document.getElementById('productQty').value);
            addToCart(product.id, quantity);
            closeModal();
        };

        buyNowBtn.onclick = function() {
            const quantity = parseInt(document.getElementById('productQty').value);
            addToCart(product.id, quantity);
            closeModal();
            toggleCart();
        };

        // Quantity controls
        setupQuantityControls();

        // Show modal
        productModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    function setupQuantityControls() {
        const decreaseBtn = document.getElementById('decreaseQty');
        const increaseBtn = document.getElementById('increaseQty');
        const quantityInput = document.getElementById('productQty');

        decreaseBtn.addEventListener('click', function() {
            let value = parseInt(quantityInput.value);
            if (value > 1) {
                quantityInput.value = value - 1;
            }
        });

        increaseBtn.addEventListener('click', function() {
            let value = parseInt(quantityInput.value);
            if (value < 10) {
                quantityInput.value = value + 1;
            }
        });

        quantityInput.addEventListener('change', function() {
            let value = parseInt(this.value);
            if (value < 1) this.value = 1;
            if (value > 10) this.value = 10;
        });
    }

    function closeModal() {
        productModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    function addToCart(productId, quantity = 1) {
        const product = products.find(p => p.id === productId);
        if (!product) return;

        const existingItem = cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: quantity
            });
        }

        saveCart();
        updateCartUI();
        showNotification('Đã thêm sản phẩm vào giỏ hàng!');
    }

    function removeFromCart(productId) {
        cart = cart.filter(item => item.id !== productId);
        saveCart();
        updateCartUI();
    }

    function updateCartItemQuantity(productId, newQuantity) {
        const item = cart.find(item => item.id === productId);
        if (item) {
            if (newQuantity <= 0) {
                removeFromCart(productId);
            } else {
                item.quantity = newQuantity;
                saveCart();
                updateCartUI();
            }
        }
    }

    function saveCart() {
        localStorage.setItem('cinemax_cart', JSON.stringify(cart));
    }

    function updateCartUI() {
        // Update cart count
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;

        // Update cart items
        cartItems.innerHTML = '';

        if (cart.length === 0) {
            cartItems.innerHTML = `
                <div class="empty-cart">
                    <p>Giỏ hàng của bạn đang trống</p>
                </div>
            `;
            cartTotal.innerHTML = '0<sup>đ</sup>';
            return;
        }

        let total = 0;

        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;

            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">${formatPrice(item.price)}đ</div>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn-small decrease" data-id="${item.id}">-</button>
                        <input type="number" class="cart-item-qty" value="${item.quantity}" min="1" data-id="${item.id}">
                        <button class="quantity-btn-small increase" data-id="${item.id}">+</button>
                    </div>
                </div>
                <button class="remove-item" data-id="${item.id}">×</button>
            `;

            cartItems.appendChild(cartItem);
        });

        // Update total
        cartTotal.innerHTML = `${formatPrice(total)}<sup>đ</sup>`;

        // Add event listeners to cart items
        setupCartItemEvents();
    }

    function setupCartItemEvents() {
        // Decrease quantity
        document.querySelectorAll('.decrease').forEach(btn => {
            btn.addEventListener('click', function() {
                const productId = parseInt(this.dataset.id);
                const item = cart.find(item => item.id === productId);
                if (item) {
                    updateCartItemQuantity(productId, item.quantity - 1);
                }
            });
        });

        // Increase quantity
        document.querySelectorAll('.increase').forEach(btn => {
            btn.addEventListener('click', function() {
                const productId = parseInt(this.dataset.id);
                const item = cart.find(item => item.id === productId);
                if (item) {
                    updateCartItemQuantity(productId, item.quantity + 1);
                }
            });
        });

        // Quantity input change
        document.querySelectorAll('.cart-item-qty').forEach(input => {
            input.addEventListener('change', function() {
                const productId = parseInt(this.dataset.id);
                const newQuantity = parseInt(this.value);
                if (!isNaN(newQuantity) && newQuantity > 0) {
                    updateCartItemQuantity(productId, newQuantity);
                }
            });
        });

        // Remove item
        document.querySelectorAll('.remove-item').forEach(btn => {
            btn.addEventListener('click', function() {
                const productId = parseInt(this.dataset.id);
                removeFromCart(productId);
            });
        });

        // Checkout button
        document.querySelector('.btn-checkout').addEventListener('click', function() {
            if (cart.length === 0) {
                alert('Giỏ hàng của bạn đang trống!');
                return;
            }
            alert('Chức năng thanh toán đang được phát triển!');
            // In real application, redirect to checkout page
        });
    }

    function toggleCart() {
        cartSidebar.classList.toggle('active');
    }

    function showNotification(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #4CAF50;
            color: white;
            padding: 15px 20px;
            border-radius: 5px;
            z-index: 1004;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        `;

        document.body.appendChild(notification);

        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    function getCategoryName(category) {
        const categories = {
            popcorn: 'Combo bắp nước',
            merchandise: 'Đồ lưu niệm',
            voucher: 'Voucher ưu đãi',
            collectibles: 'Đồ sưu tầm'
        };
        return categories[category] || category;
    }

    function formatPrice(price) {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
});