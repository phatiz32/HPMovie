// News Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Sample news data
    const newsData = [
        {
            id: 1,
            title: "CineMax chính thức khai trương rạp chiếu mới tại Times City",
            category: "news",
            image: "images/news/cinema-opening.jpg",
            excerpt: "Rạp chiếu phim hiện đại với 10 phòng chiếu tiêu chuẩn quốc tế vừa được khai trương...",
            content: `
                <p>CineMax vừa chính thức khai trương rạp chiếu phim mới tại trung tâm thương mại Times City, mang đến cho khán giả Hà Nội một trải nghiệm điện ảnh đẳng cấp hoàn toàn mới.</p>
                
                <h3>Rạp chiếu hiện đại bậc nhất</h3>
                <p>Với tổng vốn đầu tư hơn 50 tỷ đồng, rạp chiếu mới được trang bị hệ thống công nghệ tiên tiến nhất:</p>
                <ul>
                    <li>10 phòng chiếu với sức chứa từ 100-200 ghế</li>
                    <li>Công nghệ âm thanh Dolby Atmos 7.1</li>
                    <li>Màn hình 4K độ phân giải cao</li>
                    <li>Ghế da có thể ngả lưng và sưởi ấm</li>
                </ul>
                
                <h3>Ưu đãi đặc biệt khai trương</h3>
                <p>Nhân dịp khai trương, CineMax dành tặng khán giả nhiều ưu đãi hấp dẫn:</p>
                <ul>
                    <li>Giảm 50% giá vé trong tuần đầu tiên</li>
                    <li>Combo bắp nước chỉ 50.000 VNĐ</li>
                    <li>Tặng voucher 100.000 VNĐ cho hóa đơn từ 300.000 VNĐ</li>
                </ul>
                
                <p>Rạp chiếu mới hứa hẹn sẽ trở thành điểm đến lý tưởng cho các tín đồ điện ảnh tại Hà Nội.</p>
            `,
            date: "15/11/2023",
            views: 1250,
            tags: ["khai trương", "times city", "ưu đãi"],
            featured: true
        },
        {
            id: 2,
            title: "Ưu đãi đặc biệt: Giảm 30% giá vé cho học sinh, sinh viên",
            category: "offers",
            image: "images/news/student-offer.jpg",
            excerpt: "Chương trình ưu đãi dành riêng cho học sinh, sinh viên với mức giảm 30% giá vé...",
            content: `
                <p>CineMax triển khai chương trình ưu đãi đặc biệt dành cho học sinh, sinh viên trên toàn quốc.</p>
                
                <h3>Chi tiết chương trình</h3>
                <p>Từ ngày 01/12/2023 đến hết ngày 31/12/2023, tất cả học sinh, sinh viên sẽ được hưởng các ưu đãi sau:</p>
                <ul>
                    <li>Giảm 30% giá vé tất cả các suất chiếu</li>
                    <li>Combo học sinh: 1 vé + 1 bắp + 1 nước chỉ 99.000 VNĐ</li>
                    <li>Miễn phí vé cho sinh viên có điểm trung bình từ 8.5 trở lên</li>
                </ul>
                
                <h3>Điều kiện áp dụng</h3>
                <p>Để nhận được ưu đãi, học sinh sinh viên cần xuất trình:</p>
                <ul>
                    <li>Thẻ học sinh/sinh viên còn hiệu lực</li>
                    <li>Hoặc giấy tờ chứng minh đang theo học</li>
                </ul>
                
                <p>Chương trình áp dụng cho tất cả các rạp CineMax trên toàn quốc.</p>
            `,
            date: "25/11/2023",
            views: 890,
            tags: ["học sinh", "sinh viên", "giảm giá"],
            featured: true
        },
        {
            id: 3,
            title: "Sự kiện đặc biệt: Đêm công chiếu phim 'Avatar: The Way of Water'",
            category: "events",
            image: "images/news/avatar-premiere.jpg",
            excerpt: "Đêm công chiếu độc quyền với sự tham gia của ê-kíp sản xuất và diễn viên chính...",
            content: `
                <p>CineMax tổ chức đêm công chiếu độc quyền cho bộ phim được mong đợi nhất năm - "Avatar: The Way of Water".</p>
                
                <h3>Thông tin sự kiện</h3>
                <ul>
                    <li><strong>Thời gian:</strong> 19:00, ngày 20/12/2023</li>
                    <li><strong>Địa điểm:</strong> Rạp CineMax Royal City</li>
                    <li><strong>Đặc biệt:</strong> Có sự tham gia của đạo diễn James Cameron</li>
                </ul>
                
                <h3>Chương trình đêm công chiếu</h3>
                <ul>
                    <li>18:00 - 19:00: Check-in và chụp hình tại thảm đỏ</li>
                    <li>19:00 - 19:30: Giao lưu với ê-kíp sản xuất</li>
                    <li>19:30 - 22:00: Chiếu phim</li>
                    <li>22:00 - 23:00: Tiệc sau buổi chiếu</li>
                </ul>
                
                <h3>Cách thức tham gia</h3>
                <p>Để có cơ hội tham dự đêm công chiếu, khán giả có thể:</p>
                <ul>
                    <li>Mua vé trực tiếp tại website với giá 500.000 VNĐ</li>
                    <li>Tham gia minigame trên fanpage CineMax</li>
                    <li>Đăng ký qua hotline 1800-xxxx</li>
                </ul>
            `,
            date: "10/11/2023",
            views: 1560,
            tags: ["công chiếu", "avatar", "sự kiện"],
            featured: true
        },
        {
            id: 4,
            title: "Review phim: 'The Batman' - Siêu anh hùng bóng đêm trở lại",
            category: "movies",
            image: "images/news/batman-review.jpg",
            excerpt: "Đánh giá chi tiết về phiên bản mới nhất của Người Dơi với sự thể hiện của Robert Pattinson...",
            content: "...",
            date: "05/11/2023",
            views: 2340,
            tags: ["review", "the batman", "siêu anh hùng"],
            featured: false
        },
        {
            id: 5,
            title: "Combo mùa đông: Bắp nước nóng - Ấm áp cùng CineMax",
            category: "offers",
            image: "images/news/winter-combo.jpg",
            excerpt: "Thưởng thức bắp nước nóng với giá ưu đãi chỉ trong mùa đông này...",
            content: "...",
            date: "01/11/2023",
            views: 670,
            tags: ["combo", "mùa đông", "bắp nước nóng"],
            featured: false
        },
        {
            id: 6,
            title: "CineMax hợp tác với Marvel Studios ra mắt bộ sưu tập đồ sưu tầm",
            category: "news",
            image: "images/news/marvel-collection.jpg",
            excerpt: "Bộ sưu tập figure và merchandise độc quyền từ Marvel Studios sẽ có mặt tại các rạp CineMax...",
            content: "...",
            date: "28/10/2023",
            views: 980,
            tags: ["marvel", "đồ sưu tầm", "merchandise"],
            featured: false
        }
    ];

    // DOM Elements
    const categoryBtns = document.querySelectorAll('.category-btn');
    const sortNews = document.getElementById('sortNews');
    const featuredNews = document.getElementById('featuredNews');
    const newsContainer = document.getElementById('newsContainer');
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    const newsletterForm = document.getElementById('newsletterForm');
    const newsModal = document.getElementById('newsModal');

    // State
    let currentCategory = 'all';
    let currentSort = 'newest';
    let currentPage = 1;
    const itemsPerPage = 6;

    // Initialize
    renderFeaturedNews();
    renderNews();
    setupEventListeners();

    function setupEventListeners() {
        // Category filter
        categoryBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                categoryBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                currentCategory = this.dataset.category;
                currentPage = 1;
                renderNews();
            });
        });

        // Sort news
        sortNews.addEventListener('change', function() {
            currentSort = this.value;
            currentPage = 1;
            renderNews();
        });

        // Load more
        loadMoreBtn.addEventListener('click', function() {
            currentPage++;
            renderNews(true);
        });

        // Newsletter form
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            subscribeNewsletter(email);
        });

        // Close modal when clicking outside
        newsModal.addEventListener('click', function(e) {
            if (e.target === newsModal) {
                closeModal();
            }
        });
    }

    function renderFeaturedNews() {
        const featuredItems = newsData.filter(news => news.featured);
        
        if (featuredItems.length === 0) return;

        const mainFeatured = featuredItems[0];
        const sideFeatured = featuredItems.slice(1, 3);

        featuredNews.innerHTML = `
            <div class="featured-main" data-id="${mainFeatured.id}">
                <img src="${mainFeatured.image}" alt="${mainFeatured.title}">
                <div class="featured-main-content">
                    <span class="featured-main-badge">${getCategoryName(mainFeatured.category)}</span>
                    <h3 class="featured-main-title">${mainFeatured.title}</h3>
                    <p class="featured-main-excerpt">${mainFeatured.excerpt}</p>
                    <div class="featured-main-meta">
                        <span>${mainFeatured.date}</span>
                        <span>${mainFeatured.views} lượt xem</span>
                    </div>
                </div>
            </div>
            <div class="featured-side">
                ${sideFeatured.map(news => `
                    <div class="featured-side-item" data-id="${news.id}">
                        <img src="${news.image}" alt="${news.title}">
                        <div class="featured-side-content">
                            <span class="featured-side-badge">${getCategoryName(news.category)}</span>
                            <h4 class="featured-side-title">${news.title}</h4>
                            <span class="featured-side-date">${news.date}</span>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;

        // Add click events to featured news
        featuredNews.querySelectorAll('.featured-main, .featured-side-item').forEach(element => {
            element.addEventListener('click', function() {
                const newsId = parseInt(this.dataset.id);
                const news = newsData.find(n => n.id === newsId);
                if (news) {
                    openNewsModal(news);
                }
            });
        });
    }

    function renderNews(append = false) {
        let filteredNews = newsData;

        // Filter by category
        if (currentCategory !== 'all') {
            filteredNews = filteredNews.filter(news => news.category === currentCategory);
        }

        // Sort news
        switch (currentSort) {
            case 'oldest':
                filteredNews.sort((a, b) => new Date(a.date) - new Date(b.date));
                break;
            case 'popular':
                filteredNews.sort((a, b) => b.views - a.views);
                break;
            case 'newest':
            default:
                filteredNews.sort((a, b) => new Date(b.date) - new Date(a.date));
                break;
        }

        // Exclude featured news
        filteredNews = filteredNews.filter(news => !news.featured);

        // Pagination
        const startIndex = 0;
        const endIndex = currentPage * itemsPerPage;
        const newsToShow = filteredNews.slice(startIndex, endIndex);

        if (!append) {
            newsContainer.innerHTML = '';
        }

        if (newsToShow.length === 0 && !append) {
            newsContainer.innerHTML = `
                <div class="no-news">
                    <p>Không có tin tức nào phù hợp với tiêu chí tìm kiếm.</p>
                </div>
            `;
            loadMoreBtn.style.display = 'none';
            return;
        }

        newsToShow.forEach(news => {
            const newsCard = createNewsCard(news);
            newsContainer.appendChild(newsCard);
        });

        // Show/hide load more button
        loadMoreBtn.style.display = endIndex >= filteredNews.length ? 'none' : 'block';
    }

    function createNewsCard(news) {
        const card = document.createElement('div');
        card.className = 'news-card';
        card.innerHTML = `
            <img src="${news.image}" alt="${news.title}">
            <div class="news-card-content">
                <span class="news-card-badge">${getCategoryName(news.category)}</span>
                <h3 class="news-card-title">${news.title}</h3>
                <p class="news-card-excerpt">${news.excerpt}</p>
                <div class="news-card-meta">
                    <span>${news.date}</span>
                    <span class="news-card-views">👁️ ${news.views}</span>
                </div>
            </div>
        `;

        card.addEventListener('click', function() {
            openNewsModal(news);
        });

        return card;
    }

    function openNewsModal(news) {
        // Update modal content
        document.getElementById('modalNewsTitle').textContent = news.title;
        document.getElementById('modalNewsDate').textContent = news.date;
        document.getElementById('modalNewsCategory').textContent = getCategoryName(news.category);
        document.getElementById('modalNewsViews').textContent = `${news.views} lượt xem`;
        document.getElementById('modalNewsContent').innerHTML = news.content;
        
        // Update tags
        const tagsContainer = document.getElementById('modalNewsTags');
        tagsContainer.innerHTML = `
            <h4>Tags</h4>
            <div class="tag-list">
                ${news.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
        `;

        // Add click events to tags
        tagsContainer.querySelectorAll('.tag').forEach(tag => {
            tag.addEventListener('click', function() {
                // In real application, this would filter news by tag
                alert(`Tìm kiếm tin tức với tag: ${this.textContent}`);
            });
        });

        // Setup share buttons
        setupShareButtons(news);

        // Show modal
        newsModal.style.display = 'block';
        document.body.style.overflow = 'hidden';

        // Increment view count (simulated)
        news.views++;
    }

    function setupShareButtons(news) {
        const shareUrl = window.location.href + '?news=' + news.id;
        const shareText = news.title;

        document.querySelector('.share-btn.facebook').onclick = function() {
            const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
            window.open(facebookUrl, '_blank');
        };

        document.querySelector('.share-btn.twitter').onclick = function() {
            const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
            window.open(twitterUrl, '_blank');
        };

        document.querySelector('.share-btn.copy-link').onclick = function() {
            navigator.clipboard.writeText(shareUrl).then(() => {
                alert('Đã sao chép link vào clipboard!');
            });
        };
    }

    function closeModal() {
        newsModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    function subscribeNewsletter(email) {
        // Simulate API call
        const submitBtn = newsletterForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Đang đăng ký...';
        submitBtn.disabled = true;

        setTimeout(() => {
            // In real application, this would be an API call
            console.log('Newsletter subscription:', email);
            alert('Đăng ký nhận tin thành công! Cảm ơn bạn đã quan tâm đến CineMax.');
            
            // Reset form
            newsletterForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    }

    function getCategoryName(category) {
        const categories = {
            news: 'Tin tức',
            offers: 'Ưu đãi',
            events: 'Sự kiện',
            movies: 'Tin phim'
        };
        return categories[category] || category;
    }
});