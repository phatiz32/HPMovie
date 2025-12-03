const API_BASE = "http://localhost:5136/api/Movie";
const nowShowingContainer = document.getElementById("now-showing-movies");

async function loadShowingMovies() {
    try {
        const response = await fetch(`${API_BASE}/showing-movie`);

        if (!response.ok) {
            console.error("Lỗi API:", response.status);
            return;
        }

        const movies = await response.json();
        renderMovies(movies);

    } catch (error) {
        console.error("Lỗi khi fetch API:", error);
    }
}

function renderMovies(movies) {
    nowShowingContainer.innerHTML = "";

    movies.forEach(movie => {
        const movieCard = document.createElement("div");
        movieCard.classList.add("movie-card");

        movieCard.innerHTML = `
            <img src="http://localhost:5136/uploads/${movie.posterUrl}" alt="${movie.title}">
            <h3>${movie.title}</h3>
            <p>Thể loại: ${movie.genre}</p>
            <p>Thời lượng: ${movie.duration} phút</p>
            <a href="movie-detail.html?id=${movie.id}" class="btn-primary">Xem chi tiết</a>
        `;
        nowShowingContainer.appendChild(movieCard);
    });
}
const upcomingContainer = document.getElementById("upcoming-movies");

async function loadComingMovies() {
    try {
        const response = await fetch(`${API_BASE}/coming-movie`);

        if (!response.ok) {
            console.error("Lỗi API:", response.status);
            return;
        }

        const movies = await response.json();
        renderComingMovies(movies);

    } catch (error) {
        console.error("Lỗi khi fetch API:", error);
    }
}

function renderComingMovies(movies) {
    upcomingContainer.innerHTML = "";

    movies.forEach(movie => {
        const movieCard = document.createElement("div");
        movieCard.classList.add("movie-card");

        movieCard.innerHTML = `
            <img src="http://localhost:5136/uploads/${movie.posterUrl}" alt="${movie.title}">
            <h3>${movie.title}</h3>
            <p>Thể loại: ${movie.genre}</p>
            <p>Thời lượng: ${movie.duration} phút</p>
            <a href="movie-detail.html?id=${movie.id}" class="btn-primary">Xem chi tiết</a>
        `;

        upcomingContainer.appendChild(movieCard);
    });
}

loadShowingMovies();
loadComingMovies();