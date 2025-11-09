// movie.js

const API_BASE = "http://localhost:5136/api/Movie";

// Elements
const movieTableBody = document.querySelector("#movieTable tbody");
const searchInput = document.getElementById("searchMovieInput");
const btnAddMovie = document.getElementById("btnAddMovie");
const movieFormContainer = document.getElementById("movieFormContainer");
const movieFormTitle = document.getElementById("movieFormTitle");
const movieForm = document.getElementById("movieForm");
const btnCancelMovie = document.getElementById("btnCancelMovie");

let editingMovieId = null;

// Load danh sách phim
async function loadMovies(searchName = "") {
    try {
        const url = new URL(API_BASE);
        url.searchParams.append("SearchName", searchName);

        const res = await fetch(url, {
            headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
        });
        const data = await res.json();
        renderMovieTable(data.items);
    } catch (err) {
        console.error(err);
        alert("Không thể tải danh sách phim!");
    }
}

// Render dữ liệu vào bảng
function renderMovieTable(movies) {
    movieTableBody.innerHTML = movies.map(m => `
        <tr data-id="${m.id}">
            <td>${m.id}</td>
            <td>${m.title}</td>
            <td>${m.genre}</td>
            <td>${m.status}</td>
            <td>${new Date(m.releaseDate).toLocaleDateString()}</td>
            <td>
                <button class="btnEdit">Sửa</button>
            </td>
        </tr>
    `).join("");

    document.querySelectorAll(".btnEdit").forEach(btn => {
        btn.addEventListener("click", e => {
            const movieId = e.target.closest("tr").dataset.id;
            showEditMovieForm(movieId);
        });
    });
}

// Thêm phim
btnAddMovie.addEventListener("click", () => {
    editingMovieId = null;
    movieFormTitle.textContent = "Thêm Phim";
    movieForm.reset();
    movieFormContainer.style.display = "block";
});

// Hủy form
btnCancelMovie.addEventListener("click", () => {
    movieFormContainer.style.display = "none";
});

// Submit form
movieForm.addEventListener("submit", async e => {
    e.preventDefault();
    const formData = new FormData(movieForm);

    try {
        let url = API_BASE;
        let method = "POST";

        if (editingMovieId) {
            url = `${API_BASE}/${editingMovieId}`;
            method = "PUT";
        }

        const res = await fetch(url, {
            method,
            headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` },
            body: formData
        });

        if (!res.ok) throw new Error("Lưu phim thất bại!");

        alert(editingMovieId ? "Cập nhật thành công!" : "Thêm phim thành công!");
        movieFormContainer.style.display = "none";
        loadMovies(searchInput.value);
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
});

// Sửa phim
async function showEditMovieForm(movieId) {
    try {
        const res = await fetch(`${API_BASE}/${movieId}`, {
            headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
        });
        const movie = await res.json();
        editingMovieId = movieId;

        movieFormTitle.textContent = "Sửa Phim";
        movieForm.elements["title"].value = movie.title;
        movieForm.elements["genre"].value = movie.genre;
        movieForm.elements["status"].value = movie.status;
        movieForm.elements["releaseDate"].value = movie.releaseDate.split("T")[0];
        movieForm.elements["trailerUrl"].value = movie.trailerUrl || "";

        movieFormContainer.style.display = "block";
    } catch (err) {
        console.error(err);
        alert("Lấy thông tin phim thất bại!");
    }
}

// Tìm kiếm
searchInput.addEventListener("input", e => loadMovies(e.target.value));

// Load lần đầu
loadMovies();
