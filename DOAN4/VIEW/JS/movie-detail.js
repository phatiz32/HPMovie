const API_BASE = "http://localhost:5136/api/Movie";
const params =  new URLSearchParams(window.location.search);
const movieId = params.get("id");
if (!movieId) {
    alert("Không tìm thấy ID phim!");
}

async function loadMovieDetail() {
    try {
        const response = await fetch(`${API_BASE}/${movieId}`);

        if (!response.ok) {
            throw new Error("Không tìm thấy phim");
        }

        const movie = await response.json();

        const IMAGE_BASE = "http://localhost:5136/uploads/";

        document.querySelector(".movie-poster img").src = `${IMAGE_BASE}${movie.posterUrl}`;
        document.querySelector(".movie-info h2").textContent = movie.title;
        document.querySelector(".genre").textContent = movie.genre;
        document.querySelector(".duration").textContent = movie.duration + " phút";
        document.querySelector(".release-date").textContent = movie.releaseDate;
        document.querySelector(".age").textContent = movie.ageLimit;
        document.querySelector(".language").textContent = movie.language;
        document.querySelector(".director").textContent = movie.director;
        document.querySelector(".cast").textContent = movie.actor;
        document.querySelector(".status").textContent = movie.status;

        console.log(movie.trailerUrl);
        // Trailer
        if (movie.trailerUrl) {
            document.querySelector(".trailer-container iframe").src = movie.trailerUrl;
        }

    } catch (error) {
        console.error(error);
        document.body.innerHTML = "<h2>Không thể tải thông tin phim</h2>";
    }
}

document.addEventListener("DOMContentLoaded", () => {
    loadMovieDetail();
});

