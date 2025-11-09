// Home Page Specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Sample data for movies, cinemas and news
    const nowShowingMovies = [
        {
            id: 1,
            title: "Avengers: Endgame",
            poster: "images/movies/avengers.jpg",
            duration: "181 phút",
            rating: 4.8,
            genre: "Hành động, Phiêu lưu"
        },
        {
            id: 2,
            title: "Spider-Man: No Way Home",
            poster: "images/movies/spiderman.jpg",
            duration: "148 phút",
            rating: 4.7,
            genre: "Hành động, Phiêu lưu"
        },
        {
            id: 3,
            title: "The Batman",
            poster: "images/movies/batman.jpg",
            duration: "176 phút",
            rating: 4.5,
            genre: "Hành động, Tội phạm"
        },
        {
            id: 4,
            title: "Dune",
            poster: "images/movies/dune.jpg",
            duration: "155 phút",
            rating: 4.6,
            genre: "Khoa học viễn tưởng"
        }
    ];
    
    const upcomingMovies = [
        {
            id: 5,
            title: "Black Panther: Wakanda Forever",
            poster: "images/movies/black-panther.jpg",
            releaseDate: "15/11/2023",
            genre: "Hành động, Phiêu lưu"
        },
        {
            id: 6,
            title: "Avatar: The Way of Water",
            poster: "images/movies/avatar.jpg",
            releaseDate: "22/12/2023",
            genre: "Khoa học viễn tưởng"
        },
        {
            id: 7,
            title: "Indiana Jones 5",
            poster: "images/movies/indiana-jones.jpg",
            releaseDate: "30/06/2024",
            genre: "Phiêu lưu"
        },
        {
            id: 8,
            title: "The Marvels",
            poster: "images/movies/marvels.jpg",
            releaseDate: "28/07/2024",
            genre: "Hành động, Phiêu lưu"
        }
    ];
    
    const featuredCinemas = [
        {
            id: 1,
            name: "CineMax Royal City",
            location: "72A Nguyễn Trãi, Thanh Xuân, Hà Nội",
            image: "images/cinemas/royal-city.jpg"
        },
        {
            id: 2,
            name: "CineMax Vincom Center",
            location: "191 Bà Triệu, Hai Bà Trưng, Hà Nội",
            image: "images/cinemas/vincom.jpg"
        },
        {
            id: 3,
            name: "CineMax Aeon Mall",
            location: "27 Cổ Linh, Long Biên, Hà Nội",
            image: "images/cinemas/aeon.jpg"
        },
        {
            id: 4,
            name: "CineMax Tràng Tiền",
            location: "35 Tràng Tiền, Hoàn Kiếm, Hà Nội",
            image: "images/cinemas/trang-tien.jpg"
        }
    ];
    
    const featuredNews = [
        {
            id: 1,
            title: "Ưu đãi đặc biệt cho học sinh, sinh viên",
            excerpt: "Giảm 30% giá vé cho tất cả học sinh, sinh viên vào các ngày trong tuần.",
            image: "images/news/student-offer.jpg",
            date: "15/10/2023"
        },
        {
            id: 2,
            title: "Combo bắp nước siêu tiết kiệm",
            excerpt: "Chỉ 75.000 VNĐ cho 1 bắp lớn và 2 nước ngọt.",
            image: "images/news/combo-offer.jpg",
            date: "10/10/2023"
        },
        {
            id: 3,
            title: "CineMax mở rạp mới tại Times City",
            excerpt: "Rạp chiếu phim hiện đại với 10 phòng chiếu tiêu chuẩn quốc tế.",
            image: "images/news/new-cinema.jpg",
            date: "05/10/2023"
        },
        {
            id: 4,
            title: "Chương trình thành viên VIP",
            excerpt: "Tích điểm đổi quà và nhận ưu đãi đặc biệt khi trở thành thành viên VIP.",
            image: "images/news/vip-member.jpg",
            date: "01/10/2023"
        }
    ];
    
    // Render now showing movies
    const nowShowingContainer = document.getElementById('now-showing-movies');
    nowShowingMovies.forEach(movie => {
        const movieCard = createMovieCard(movie, true);
        nowShowingContainer.appendChild(movieCard);
    });
    
    // Render upcoming movies
    const upcomingContainer = document.getElementById('upcoming-movies');
    upcomingMovies.forEach(movie => {
        const movieCard = createMovieCard(movie, false);
        upcomingContainer.appendChild(movieCard);
    });
    
    // Render featured cinemas
    const cinemasContainer = document.getElementById('featured-cinemas');
    featuredCinemas.forEach(cinema => {
        const cinemaCard = createCinemaCard(cinema);
        cinemasContainer.appendChild(cinemaCard);
    });
    
    // Render featured news
    const newsContainer = document.getElementById('featured-news');
    featuredNews.forEach(news => {
        const newsCard = createNewsCard(news);
        newsContainer.appendChild(newsCard);
    });
    
    // Helper functions to create cards
    function createMovieCard(movie, isNowShowing) {
        const card = document.createElement('div');
        card.className = 'movie-card';
        card.innerHTML = `
            <img src="${movie.poster}" alt="${movie.title}" class="movie-poster">
            <div class="movie-info">
                <h3 class="movie-title">${movie.title}</h3>
                <p class="movie-duration">${isNowShowing ? movie.duration : `Khởi chiếu: ${movie.releaseDate}`}</p>
                <p class="movie-genre">${movie.genre}</p>
                ${isNowShowing ? `
                <div class="movie-rating">
                    <span class="rating-stars">★★★★★</span>
                    <span class="rating-value">${movie.rating}/5</span>
                </div>
                <a href="booking.html?movie=${movie.id}" class="btn-book">Đặt vé</a>
                ` : ''}
            </div>
        `;
        return card;
    }
    
    function createCinemaCard(cinema) {
        const card = document.createElement('div');
        card.className = 'cinema-card';
        card.innerHTML = `
            <img src="${cinema.image}" alt="${cinema.name}" class="cinema-image">
            <div class="cinema-info">
                <h3 class="cinema-name">${cinema.name}</h3>
                <p class="cinema-location">${cinema.location}</p>
                <a href="cinema-details.html?id=${cinema.id}" class="btn-book">Xem chi tiết</a>
            </div>
        `;
        return card;
    }
    
    function createNewsCard(news) {
        const card = document.createElement('div');
        card.className = 'news-card';
        card.innerHTML = `
            <img src="${news.image}" alt="${news.title}" class="news-image">
            <div class="news-info">
                <h3 class="news-title">${news.title}</h3>
                <p class="news-date">${news.date}</p>
                <p class="news-excerpt">${news.excerpt}</p>
                <a href="news-details.html?id=${news.id}" class="btn-book">Xem chi tiết</a>
            </div>
        `;
        return card;
    }
});