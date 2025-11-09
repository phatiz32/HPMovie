// Movies Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Enhanced movie data
    const moviesData = {
        'now-showing': [
            {
                id: 1,
                title: "Avengers: Endgame",
                category: "now-showing",
                poster: "images/movies/avengers.jpg",
                duration: "181 phút",
                rating: 4.8,
                genre: "Hành động, Phiêu lưu",
                releaseDate: "26/04/2019",
                director: "Anthony Russo, Joe Russo",
                cast: "Robert Downey Jr., Chris Evans, Mark Ruffalo",
                synopsis: "Sau sự kiện tàn phá của Thanos, vũ trụ đang trong tình trạng đổ nát. Với sự giúp đỡ của những đồng minh còn lại, Avengers phải tập hợp lại một lần nữa để đảo ngược hành động của Thanos và khôi phục lại trật tự cho vũ trụ.",
                genres: ["action", "sci-fi"],
                featured: true,
                trailerUrl: "#"
            },
            {
                id: 2,
                title: "Spider-Man: No Way Home",
                category: "now-showing",
                poster: "images/movies/spiderman.jpg",
                duration: "148 phút",
                rating: 4.7,
                genre: "Hành động, Phiêu lưu",
                releaseDate: "17/12/2021",
                director: "Jon Watts",
                cast: "Tom Holland, Zendaya, Benedict Cumberbatch",
                synopsis: "Với danh tính của Spider-Man đã bị lộ, Peter Parker yêu cầu sự giúp đỡ từ Doctor Strange. Khi một câu thần chú trở nên tồi tệ, những kẻ thù nguy hiểm từ các thế giới khác bắt đầu xuất hiện, buộc Peter phải khám phá ý nghĩa thực sự của việc trở thành Spider-Man.",
                genres: ["action", "sci-fi"],
                featured: true,
                trailerUrl: "#"
            },
            {
                id: 3,
                title: "The Batman",
                category: "now-showing",
                poster: "images/movies/batman.jpg",
                duration: "176 phút",
                rating: 4.5,
                genre: "Hành động, Tội phạm",
                releaseDate: "04/03/2022",
                director: "Matt Reeves",
                cast: "Robert Pattinson, Zoë Kravitz, Paul Dano",
                synopsis: "Khi một kẻ giết người hàng loạt nhắm vào giới thượng lưu của Gotham với một loạt các âm mưu độc ác, Batman phải điều tra vụ việc và phơi bày sự tham nhũng đã kết nối với gia đình mình.",
                genres: ["action", "drama"],
                featured: false,
                trailerUrl: "#"
            },
            {
                id: 4,
                title: "Dune",
                category: "now-showing",
                poster: "images/movies/dune.jpg",
                duration: "155 phút",
                rating: 4.6,
                genre: "Khoa học viễn tưởng",
                releaseDate: "22/10/2021",
                director: "Denis Villeneuve",
                cast: "Timothée Chalamet, Rebecca Ferguson, Oscar Isaac",
                synopsis: "Paul Atreides, một thiếu niên tài năng sinh ra với một vận mệnh vĩ đại vượt quá sự hiểu biết của anh, phải đến hành tinh sa mạc nguy hiểm nhất trong vũ trụ để đảm bảo tương lai cho gia đình và người dân của mình.",
                genres: ["sci-fi", "drama"],
                featured: false,
                trailerUrl: "#"
            },
            {
                id: 13,
                title: "Black Adam",
                category: "now-showing",
                poster: "images/movies/black-adam.jpg",
                duration: "125 phút",
                rating: 4.2,
                genre: "Hành động, Siêu anh hùng",
                releaseDate: "21/10/2022",
                director: "Jaume Collet-Serra",
                cast: "Dwayne Johnson, Aldis Hodge, Pierce Brosnan",
                synopsis: "Gần 5.000 năm sau khi được ban cho sức mạnh toàn năng của các vị thần Ai Cập và bị cầm tù, Black Adam được giải phóng khỏi ngôi mộ trần gian của mình.",
                genres: ["action", "sci-fi"],
                featured: false,
                trailerUrl: "#"
            }
        ],
        'upcoming': [
            {
                id: 5,
                title: "Black Panther: Wakanda Forever",
                category: "upcoming",
                poster: "images/movies/black-panther.jpg",
                duration: "161 phút",
                rating: 0,
                genre: "Hành động, Phiêu lưu",
                releaseDate: "15/11/2023",
                director: "Ryan Coogler",
                cast: "Letitia Wright, Lupita Nyong'o, Danai Gurira",
                synopsis: "Các nhân vật hoàng gia của Wakanda chiến đấu để bảo vệ quốc gia của họ khỏi sự can thiệp của thế giới sau cái chết của Vua T'Challa.",
                genres: ["action", "sci-fi"],
                featured: true,
                trailerUrl: "#"
            },
            {
                id: 6,
                title: "Avatar: The Way of Water",
                category: "upcoming",
                poster: "images/movies/avatar.jpg",
                duration: "192 phút",
                rating: 0,
                genre: "Khoa học viễn tưởng",
                releaseDate: "22/12/2023",
                director: "James Cameron",
                cast: "Sam Worthington, Zoe Saldana, Sigourney Weaver",
                synopsis: "Jake Sully sống với gia đình mới tìm thấy trên thế giới của người Na'vi và khám phá những vùng biển của Pandora, gặp gỡ các sinh vật dưới nước và các bộ tộc khác.",
                genres: ["sci-fi", "action"],
                featured: true,
                trailerUrl: "#"
            },
            {
                id: 7,
                title: "Indiana Jones 5",
                category: "upcoming",
                poster: "images/movies/indiana-jones.jpg",
                duration: "0 phút",
                rating: 0,
                genre: "Phiêu lưu",
                releaseDate: "30/06/2024",
                director: "James Mangold",
                cast: "Harrison Ford, Phoebe Waller-Bridge, Mads Mikkelsen",
                synopsis: "Cuộc phiêu lưu mới của nhà khảo cổ học nổi tiếng Indiana Jones.",
                genres: ["action", "adventure"],
                featured: false,
                trailerUrl: "#"
            },
            {
                id: 8,
                title: "The Marvels",
                category: "upcoming",
                poster: "images/movies/marvels.jpg",
                duration: "0 phút",
                rating: 0,
                genre: "Hành động, Phiêu lưu",
                releaseDate: "28/07/2024",
                director: "Nia DaCosta",
                cast: "Brie Larson, Teyonah Parris, Iman Vellani",
                synopsis: "Carol Danvers, Monica Rambeau và Kamala Khan phải cùng nhau hợp tác để cứu vũ trụ khi các khả năng của họ bị trộn lẫn.",
                genres: ["action", "sci-fi"],
                featured: false,
                trailerUrl: "#"
            },
            {
                id: 9,
                title: "Transformers: Rise of the Beasts",
                category: "upcoming",
                poster: "images/movies/transformers.jpg",
                duration: "127 phút",
                rating: 0,
                genre: "Khoa học viễn tưởng, Hành động",
                releaseDate: "09/06/2023",
                director: "Steven Caple Jr.",
                cast: "Anthony Ramos, Dominique Fishback, Luna Lauren Velez",
                synopsis: "Cuộc phiêu lưu mới trong vũ trụ Transformers đưa khán giả đến những năm 1990 và giới thiệu Maximals, Predacons và Terrorcons.",
                genres: ["sci-fi", "action"],
                featured: true,
                trailerUrl: "#"
            },
            {
                id: 10,
                title: "The Little Mermaid",
                category: "upcoming",
                poster: "images/movies/little-mermaid.jpg",
                duration: "135 phút",
                rating: 0,
                genre: "Hoạt hình, Gia đình",
                releaseDate: "26/05/2023",
                director: "Rob Marshall",
                cast: "Halle Bailey, Jonah Hauer-King, Melissa McCarthy",
                synopsis: "Phiên bản người đóng của câu chuyện cổ tích về nàng tiên cá Ariel, người khao khát được khám phá thế giới trên mặt đất.",
                genres: ["animation", "romance"],
                featured: false,
                trailerUrl: "#"
            },
            {
                id: 11,
                title: "Fast X",
                category: "upcoming",
                poster: "images/movies/fastx.jpg",
                duration: "141 phút",
                rating: 0,
                genre: "Hành động, Phiêu lưu",
                releaseDate: "19/05/2023",
                director: "Louis Leterrier",
                cast: "Vin Diesel, Michelle Rodriguez, Jason Momoa",
                synopsis: "Dom Toretto và gia đình của anh phải đối mặt với kẻ thù nguy hiểm nhất mà họ từng gặp.",
                genres: ["action", "adventure"],
                featured: true,
                trailerUrl: "#"
            },
            {
                id: 12,
                title: "The Flash",
                category: "upcoming",
                poster: "images/movies/flash.jpg",
                duration: "144 phút",
                rating: 0,
                genre: "Hành động, Khoa học viễn tưởng",
                releaseDate: "16/06/2023",
                director: "Andy Muschietti",
                cast: "Ezra Miller, Michael Keaton, Sasha Calle",
                synopsis: "Barry Allen sử dụng sức mạnh siêu tốc để thay đổi quá khứ, nhưng tương lai thay đổi mà anh tạo ra trở nên nguy hiểm.",
                genres: ["action", "sci-fi"],
                featured: false,
                trailerUrl: "#"
            }
        ]
    };

    // DOM Elements
    const genreFilter = document.getElementById('genreFilter');
    const timeFilter = document.getElementById('timeFilter');
    const sortFilter = document.getElementById('sortFilter');
    const movieSearch = document.getElementById('movieSearch');
    const searchBtn = document.getElementById('searchBtn');
    const tabBtns = document.querySelectorAll('.tab-btn');
    const nowShowingContainer = document.getElementById('now-showing-movies');
    const upcomingContainer = document.getElementById('upcoming-movies');
    const nowShowingCount = document.getElementById('nowShowingCount');
    const upcomingCount = document.getElementById('upcomingCount');
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    const movieModal = document.getElementById('movieModal');
    const filterTags = document.querySelectorAll('.filter-tag');

    // State
    let currentTab = 'now-showing';
    let currentGenre = 'all';
    let currentTime = 'all';
    let currentSort = 'popular';
    let currentSearch = '';
    let currentPage = 1;
    const itemsPerPage = 8;
    let allMovies = [];
    let filteredMovies = [];

    // Initialize
    initializeMovies();
    setupEventListeners();
    renderMovies();

    function initializeMovies() {
        // Combine all movies for search and filtering
        allMovies = [...moviesData['now-showing'], ...moviesData['upcoming']];
        
        // Initialize counts
        updateMovieCounts();
    }

    function setupEventListeners() {
        // Tab switching
        tabBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                tabBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                currentTab = this.dataset.tab;
                currentPage = 1;
                
                // Ẩn/hiện đúng tab content
                document.querySelectorAll('.tab-content').forEach(content => {
                    content.classList.remove('active');
                });
                document.getElementById(currentTab).classList.add('active');
                
                renderMovies();
            });
        });

        // Filter changes
        genreFilter.addEventListener('change', function() {
            currentGenre = this.value;
            currentPage = 1;
            updateFilterTags();
            renderMovies();
        });

        timeFilter.addEventListener('change', function() {
            currentTime = this.value;
            currentPage = 1;
            renderMovies();
        });

        sortFilter.addEventListener('change', function() {
            currentSort = this.value;
            currentPage = 1;
            renderMovies();
        });

        // Search
        searchBtn.addEventListener('click', performSearch);
        movieSearch.addEventListener('input', function() {
            if (this.value.trim() === '') {
                currentSearch = '';
                currentPage = 1;
                renderMovies();
            }
        });
        movieSearch.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });

        // Load more
        loadMoreBtn.addEventListener('click', function() {
            currentPage++;
            renderMovies(true);
        });

        // Filter tags
        filterTags.forEach(tag => {
            tag.addEventListener('click', function() {
                const genre = this.dataset.genre;
                currentGenre = genre;
                currentPage = 1;
                
                // Update genre filter dropdown
                genreFilter.value = genre;
                
                // Update active state of tags
                filterTags.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                
                renderMovies();
            });
        });

        // Modal close
        document.querySelector('.close-modal').addEventListener('click', closeModal);
        movieModal.addEventListener('click', function(e) {
            if (e.target === movieModal) {
                closeModal();
            }
        });
    }

    function updateFilterTags() {
        filterTags.forEach(tag => {
            if (tag.dataset.genre === currentGenre) {
                tag.classList.add('active');
            } else {
                tag.classList.remove('active');
            }
        });
    }

    function performSearch() {
        currentSearch = movieSearch.value.trim().toLowerCase();
        currentPage = 1;
        renderMovies();
    }

    function renderMovies(append = false) {
        // Get movies for current tab
        let movies = moviesData[currentTab];
        
        // Apply filters
        movies = filterMovies(movies);
        
        // Apply search
        if (currentSearch) {
            movies = movies.filter(movie => 
                movie.title.toLowerCase().includes(currentSearch) ||
                movie.genre.toLowerCase().includes(currentSearch) ||
                movie.director.toLowerCase().includes(currentSearch) ||
                movie.cast.toLowerCase().includes(currentSearch)
            );
        }

        // Apply sorting
        movies = sortMovies(movies);

        // Store filtered movies
        filteredMovies = movies;

        // Update counts
        updateMovieCounts();

        // Pagination
        const startIndex = 0;
        const endIndex = currentPage * itemsPerPage;
        const moviesToShow = movies.slice(startIndex, endIndex);

        if (!append) {
            if (currentTab === 'now-showing') {
                nowShowingContainer.innerHTML = '';
            } else {
                upcomingContainer.innerHTML = '';
            }
        }

        const container = currentTab === 'now-showing' ? nowShowingContainer : upcomingContainer;

        if (moviesToShow.length === 0 && !append) {
            container.innerHTML = `
                <div class="no-results">
                    <h3>🎬 Không tìm thấy phim phù hợp</h3>
                    <p>Vui lòng thử lại với bộ lọc khác hoặc từ khóa tìm kiếm khác.</p>
                </div>
            `;
            loadMoreBtn.style.display = 'none';
            return;
        }

        moviesToShow.forEach(movie => {
            const movieCard = createMovieCard(movie);
            container.appendChild(movieCard);
        });

        // Show/hide load more button
        loadMoreBtn.style.display = endIndex >= movies.length ? 'none' : 'block';
    }

    function filterMovies(movies) {
        let filtered = movies;

        // Genre filter
        if (currentGenre !== 'all') {
            filtered = filtered.filter(movie => 
                movie.genres.includes(currentGenre)
            );
        }

        // Time filter (already handled by tab)
        if (currentTime !== 'all') {
            filtered = filtered.filter(movie => 
                movie.category === currentTime
            );
        }

        return filtered;
    }

    function sortMovies(movies) {
        switch (currentSort) {
            case 'rating':
                return movies.sort((a, b) => b.rating - a.rating);
            case 'newest':
                return movies.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));
            case 'oldest':
                return movies.sort((a, b) => new Date(a.releaseDate) - new Date(b.releaseDate));
            case 'popular':
            default:
                return movies.sort((a, b) => {
                    if (a.featured && !b.featured) return -1;
                    if (!a.featured && b.featured) return 1;
                    return b.rating - a.rating;
                });
        }
    }

    function updateMovieCounts() {
        // Cập nhật count cho cả hai tabs
        const nowShowingMovies = filterMovies(moviesData['now-showing']);
        const upcomingMovies = filterMovies(moviesData['upcoming']);
        
        // Áp dụng search nếu có
        let nowShowingFiltered = nowShowingMovies;
        let upcomingFiltered = upcomingMovies;
        
        if (currentSearch) {
            nowShowingFiltered = nowShowingMovies.filter(movie => 
                movie.title.toLowerCase().includes(currentSearch) ||
                movie.genre.toLowerCase().includes(currentSearch) ||
                movie.director.toLowerCase().includes(currentSearch) ||
                movie.cast.toLowerCase().includes(currentSearch)
            );
            
            upcomingFiltered = upcomingMovies.filter(movie => 
                movie.title.toLowerCase().includes(currentSearch) ||
                movie.genre.toLowerCase().includes(currentSearch) ||
                movie.director.toLowerCase().includes(currentSearch) ||
                movie.cast.toLowerCase().includes(currentSearch)
            );
        }
        
        nowShowingCount.textContent = nowShowingFiltered.length;
        upcomingCount.textContent = upcomingFiltered.length;
    }

    function createMovieCard(movie) {
        if (movie.category === 'upcoming') {
            return createUpcomingMovieCard(movie);
        }
        
        return createNowShowingMovieCard(movie);
    }

    function createNowShowingMovieCard(movie) {
        const card = document.createElement('div');
        card.className = 'movie-card';
        card.innerHTML = `
            <img src="${movie.poster}" alt="${movie.title}" class="movie-poster">
            <div class="movie-info">
                <div class="movie-category">Đang chiếu</div>
                <h3 class="movie-title">${movie.title}</h3>
                <div class="movie-meta">
                    <span class="movie-duration">⏱️ ${movie.duration}</span>
                    <span class="movie-rating">
                        <span class="rating-stars">${getStarRating(movie.rating)}</span>
                        <span class="rating-value">${movie.rating}/5</span>
                    </span>
                </div>
                <p class="movie-genre">${movie.genre}</p>
                <div class="movie-actions">
                    <a href="booking.html?movie=${movie.id}" class="btn-book">🎫 Đặt vé</a>
                    <button class="btn-trailer" data-movie="${movie.id}">🎬 Trailer</button>
                </div>
            </div>
        `;

        // Add event listeners
        card.querySelector('.btn-trailer').addEventListener('click', function(e) {
            e.stopPropagation();
            showTrailer(movie);
        });

        card.addEventListener('click', function() {
            openMovieModal(movie);
        });

        return card;
    }

    function createUpcomingMovieCard(movie) {
        const card = document.createElement('div');
        card.className = 'movie-card upcoming';
        card.innerHTML = `
            <div class="coming-soon-badge">Sắp chiếu</div>
            <div class="notification-bell" data-movie="${movie.id}" title="Nhận thông báo">
                🔔
            </div>
            <img src="${movie.poster}" alt="${movie.title}" class="movie-poster">
            <div class="countdown-timer" data-release="${movie.releaseDate}">
                ${getCountdownText(movie.releaseDate)}
            </div>
            <div class="movie-info">
                <h3 class="movie-title">${movie.title}</h3>
                <div class="movie-meta">
                    <span class="movie-duration">⏱️ ${movie.duration}</span>
                    <span class="movie-release-date">
                        📅 ${movie.releaseDate}
                        <span class="release-date-highlight">${getDaysUntilRelease(movie.releaseDate)}</span>
                    </span>
                </div>
                <p class="movie-genre">${movie.genre}</p>
                <div class="movie-actions upcoming">
                    <button class="btn-remind" data-movie="${movie.id}">
                        <span>🔔 Nhắc tôi</span>
                    </button>
                    <button class="btn-detail" data-movie="${movie.id}">📖 Chi tiết</button>
                </div>
            </div>
        `;

        // Add event listeners for upcoming movies
        card.querySelector('.notification-bell').addEventListener('click', function(e) {
            e.stopPropagation();
            setNotification(movie);
        });

        card.querySelector('.btn-remind').addEventListener('click', function(e) {
            e.stopPropagation();
            toggleReminder(movie, this);
        });

        card.querySelector('.btn-detail').addEventListener('click', function(e) {
            e.stopPropagation();
            openMovieModal(movie);
        });

        card.addEventListener('click', function() {
            openMovieModal(movie);
        });

        return card;
    }

    function openMovieModal(movie) {
        // Update modal content
        document.getElementById('modalMovieTitle').textContent = movie.title;
        document.getElementById('modalMoviePoster').src = movie.poster;
        
        if (movie.category === 'now-showing') {
            document.getElementById('modalMovieRating').textContent = `⭐ ${movie.rating}/5`;
            document.getElementById('modalMovieRating').style.display = 'inline-block';
        } else {
            document.getElementById('modalMovieRating').style.display = 'none';
        }
        
        document.getElementById('modalMovieDuration').textContent = `⏱️ ${movie.duration}`;
        document.getElementById('modalMovieGenre').textContent = movie.genre;
        document.getElementById('modalMovieSynopsis').textContent = movie.synopsis;
        document.getElementById('modalMovieDirector').textContent = movie.director;
        document.getElementById('modalMovieCast').textContent = movie.cast;
        document.getElementById('modalMovieRelease').textContent = movie.releaseDate;
        document.getElementById('modalMovieGenres').textContent = movie.genres.map(genre => getGenreName(genre)).join(', ');

        // Update modal buttons
        const bookTicketBtn = document.getElementById('modalBookTicket');
        const watchTrailerBtn = document.getElementById('modalWatchTrailer');
        const remindMeBtn = document.getElementById('modalRemindMe');

        if (movie.category === 'now-showing') {
            bookTicketBtn.style.display = 'flex';
            bookTicketBtn.onclick = function() {
                window.location.href = `booking.html?movie=${movie.id}`;
            };
            watchTrailerBtn.style.display = 'flex';
            watchTrailerBtn.onclick = function() {
                showTrailer(movie);
            };
            remindMeBtn.style.display = 'none';
        } else {
            bookTicketBtn.style.display = 'none';
            watchTrailerBtn.style.display = 'flex';
            watchTrailerBtn.textContent = '🎬 Xem trailer';
            watchTrailerBtn.onclick = function() {
                showTrailer(movie);
            };
            remindMeBtn.style.display = 'flex';
            remindMeBtn.onclick = function() {
                toggleReminder(movie, this);
            };
        }

        // Show modal
        movieModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        movieModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    function showTrailer(movie) {
        alert(`🎬 Trình chiếu trailer cho phim: ${movie.title}\n\nTrong ứng dụng thực tế, đây sẽ là video trailer được nhúng từ YouTube hoặc Vimeo.`);
    }

    function setNotification(movie) {
        alert(`🔔 Đã đăng ký nhận thông báo khi phim "${movie.title}" khởi chiếu!\n\nBạn sẽ nhận được email và thông báo khi phim bắt đầu công chiếu.`);
    }

    function toggleReminder(movie, button) {
        const isReminding = button.classList.contains('reminding');
        
        if (isReminding) {
            button.classList.remove('reminding');
            if (button.classList.contains('btn-remind-modal')) {
                button.innerHTML = '🔔 Nhắc tôi';
            } else {
                button.innerHTML = '<span>🔔 Nhắc tôi</span>';
            }
            alert(`🔕 Đã tắt nhắc nhở cho phim "${movie.title}"`);
        } else {
            button.classList.add('reminding');
            if (button.classList.contains('btn-remind-modal')) {
                button.innerHTML = '✅ Đã nhắc';
            } else {
                button.innerHTML = '<span>✅ Đã nhắc</span>';
            }
            alert(`🔔 Đã đặt nhắc nhở cho phim "${movie.title}"!\n\nBạn sẽ nhận được thông báo khi phim khởi chiếu.`);
        }
    }

    function getCountdownText(releaseDate) {
        const release = new Date(releaseDate.split('/').reverse().join('-'));
        const now = new Date();
        const diffTime = release - now;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays <= 0) {
            return '🎉 Sắp ra mắt!';
        } else if (diffDays === 1) {
            return '⏳ 1 ngày nữa';
        } else if (diffDays <= 7) {
            return `⏳ ${diffDays} ngày nữa`;
        } else if (diffDays <= 30) {
            return `⏳ ${Math.ceil(diffDays / 7)} tuần nữa`;
        } else {
            return `⏳ ${Math.ceil(diffDays / 30)} tháng nữa`;
        }
    }

    function getDaysUntilRelease(releaseDate) {
        const release = new Date(releaseDate.split('/').reverse().join('-'));
        const now = new Date();
        const diffTime = release - now;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays <= 0) {
            return 'Sắp chiếu!';
        } else if (diffDays === 1) {
            return '1 ngày';
        } else {
            return `${diffDays} ngày`;
        }
    }

    function getStarRating(rating) {
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 >= 0.5;
        const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
        
        return '★'.repeat(fullStars) + (halfStar ? '½' : '') + '☆'.repeat(emptyStars);
    }

    function getGenreName(genre) {
        const genres = {
            'action': 'Hành động',
            'comedy': 'Hài',
            'drama': 'Drama',
            'horror': 'Kinh dị',
            'sci-fi': 'Khoa học viễn tưởng',
            'romance': 'Lãng mạn',
            'animation': 'Hoạt hình',
            'adventure': 'Phiêu lưu'
        };
        return genres[genre] || genre;
    }
    
});