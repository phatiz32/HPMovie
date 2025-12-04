const API_BASE = "http://localhost:5136/api/Movie";
const IMAGE_BASE = "http://localhost:5136/uploads/";

const nowShowingContainer = document.getElementById("now-showing-movies");
const upcomingContainer = document.getElementById("upcoming-movies");
const nowShowingCount = document.getElementById("nowShowingCount");
const upcomingCount = document.getElementById("upcomingCount");

const searchInput = document.getElementById("movieSearch");
const searchBtn = document.getElementById("searchBtn");

const genreCheckboxes = document.querySelectorAll("input[name='genre']");

let currentTab = "showing";     
let currentSearch = "";
let currentGenres = [];            
let pageNumber = 1;
let pageSize = 20;                

async function fetchMovies() {

    let genreParam = currentGenres.length > 0 ? currentGenres[0] : ""; 
    const url = `${API_BASE}?PageNumber=${pageNumber}&Pagesize=${pageSize}` +
                `&Genre=${genreParam}` +
                `&SearchName=${currentSearch}` +
                `&Status=${currentTab}`;

    console.log("CALL API:", url);

    const res = await fetch(url);
    if (!res.ok) {
        console.error("Lỗi API");
        return null;
    }

    return await res.json();
}

async function loadMovies() {
    const data = await fetchMovies();
    if (!data) return;

    const movies = data.items;
    const total = data.toTalItems;

    if (currentTab === "showing") {
        nowShowingContainer.innerHTML = "";
        nowShowingCount.textContent = total;
        movies.forEach(m => nowShowingContainer.innerHTML += createMovieCard(m));
    } else {
        upcomingContainer.innerHTML = "";
        upcomingCount.textContent = total;
        movies.forEach(m => upcomingContainer.innerHTML += createMovieCard(m));
    }
}

function createMovieCard(movie) {
    return `
        <div class="movie-card">
            <div class="movie-poster">
                <img src="${IMAGE_BASE}${movie.posterUrl}" alt="${movie.title}">
            </div>
            <div class="movie-info">
                <h3>${movie.title}</h3>
                <p>${movie.genre}</p>
                <a href="movie-detail.html?id=${movie.id}" class="btn-detail">Xem chi tiết</a>
            </div>
        </div>
    `;
}

document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.addEventListener("click", () => {

        document.querySelector(".tab-btn.active").classList.remove("active");
        btn.classList.add("active");

        document.querySelector(".tab-content.active").classList.remove("active");
        document.getElementById(btn.dataset.tab).classList.add("active");

        currentTab = btn.dataset.tab === "now-showing" ? "showing" : "comingsoon";

        loadMovies();
    });
});

searchBtn.addEventListener("click", () => {
    currentSearch = searchInput.value.trim();
    loadMovies();
});

searchInput.addEventListener("keyup", e => {
    if (e.key === "Enter") {
        currentSearch = searchInput.value.trim();
        loadMovies();
    }
});


genreCheckboxes.forEach(cb => {
    cb.addEventListener("change", () => {
        currentGenres = Array.from(genreCheckboxes)
                             .filter(c => c.checked)
                             .map(c => c.value);

        loadMovies();
    });
});
// Debounce khi gõ tìm kiếm
let typingTimer;
const debounceTime = 300; // 300ms

searchInput.addEventListener("input", () => {
    clearTimeout(typingTimer);

    typingTimer = setTimeout(() => {
        currentSearch = searchInput.value.trim();
        pageNumber = 1;
        loadMovies();
    }, debounceTime);
});

loadMovies();
