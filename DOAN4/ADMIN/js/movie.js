const API_BASE = "http://localhost:5136/api/Movie";

// Elements
const movieTableBody = document.querySelector("#movieTable tbody");
const searchInput = document.getElementById("searchMovieInput");
const btnAddMovie = document.getElementById("btnAddMovie");
const movieFormContainer = document.getElementById("movieFormContainer");
const movieFormTitle = document.getElementById("movieFormTitle");
const movieForm = document.getElementById("movieForm");
const btnCancelMovie = document.getElementById("btnCancelMovie");

const statusLabel = document.getElementById("statusLabel");
const statusSelect = document.getElementById("statusSelect");

let editingMovieId = null;

// Load danh sách phim
async function loadMovies(searchName = "", pageNumber = 1, pageSize = 3) {
    try {
        const url = new URL(API_BASE);
        url.searchParams.append("SearchName", searchName);
        url.searchParams.append("PageNumber", pageNumber);
        url.searchParams.append("PageSize", pageSize);

        const res = await fetch(url, {
            headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
        });
        const data = await res.json();
        renderMovieTable(data.items);
        renderPagination(data.pageNumber, data.totalPages, searchName);
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

// Pagination
function renderPagination(currentPage, totalPages, searchName) {
    const paginationContainer = document.getElementById("pagination");
    paginationContainer.innerHTML = "";
    for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement("button");
        btn.textContent = i;
        if (i === currentPage) btn.classList.add("active");
        btn.addEventListener("click", () => loadMovies(searchName, i));
        paginationContainer.appendChild(btn);
    }
}

// Thêm phim
btnAddMovie.addEventListener("click", () => {
    editingMovieId = null;
    movieFormTitle.textContent = "Thêm Phim";
    movieForm.reset();
    statusLabel.style.display = "none";
    statusSelect.style.display = "none";
    movieFormContainer.style.display = "block";
});

// Hủy form
btnCancelMovie.addEventListener("click", () => {
    movieFormContainer.style.display = "none";
});

// Submit form (Thêm/Sửa)
movieForm.addEventListener("submit", async e => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("Title", movieForm.elements["title"].value);
    formData.append("Genre", movieForm.elements["genre"].value);
    formData.append("Duration", movieForm.elements["duration"].value);
    formData.append("ReleaseDate", movieForm.elements["releaseDate"].value);
    formData.append("AgeLimit", movieForm.elements["agelimit"].value);
    formData.append("Language", movieForm.elements["language"].value);
    formData.append("Director", movieForm.elements["director"].value);
    formData.append("Actor", movieForm.elements["actor"].value);
    formData.append("TrailerUrl", movieForm.elements["trailerUrl"].value);

    const posterFile = movieForm.elements["posterFile"].files[0];
    if (posterFile) formData.append("PosterFile", posterFile);

    // Chỉ thêm status khi đang sửa
    if (editingMovieId && statusSelect.style.display !== "none") {
        formData.append("Status", statusSelect.value);
    }

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

        if (!res.ok) {
            const msg = await res.text();
            throw new Error(msg || "Lưu phim thất bại!");
        }

        alert(editingMovieId ? "Cập nhật thành công!" : "Thêm phim thành công!");
        movieFormContainer.style.display = "none";
        loadMovies(searchInput.value);
    } catch (err) {
        console.error(err);
        alert("Lỗi: " + err.message);
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
        movieForm.elements["duration"].value = movie.duration;
        movieForm.elements["releaseDate"].value = movie.releaseDate.split("T")[0];
        movieForm.elements["agelimit"].value = movie.ageLimit;
        movieForm.elements["language"].value = movie.language;
        movieForm.elements["director"].value = movie.director;
        movieForm.elements["actor"].value = movie.actor;
        movieForm.elements["trailerUrl"].value = movie.trailerUrl || "";

        // Hiển thị status khi sửa
        statusLabel.style.display = "block";
        statusSelect.style.display = "block";
        statusSelect.value = movie.status;

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
