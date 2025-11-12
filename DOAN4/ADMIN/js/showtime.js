const API_SHOWTIME = "http://localhost:5136/api/Showtime";
const API_MOVIE = "http://localhost:5136/api/Movie/active-movie";
const API_ROOM = "http://localhost:5136/api/Room/room";

const showtimeTableBody = document.getElementById("showtimeTableBody");
const btnLoadShowtime = document.getElementById("btnLoadShowtime");
const btnAddShowtime = document.getElementById("btnAddShowtime");
const showtimeFormContainer = document.getElementById("showtimeFormContainer");
const showtimeForm = document.getElementById("showtimeForm");
const movieSelect = document.getElementById("movieSelect");
const roomSelect = document.getElementById("roomSelect");
const showtimeDate = document.getElementById("showtimeDate");
const btnCancelShowtime = document.getElementById("btnCancelShowtime");


// ====== Hiển thị form thêm suất chiếu ======
btnAddShowtime.addEventListener("click", async () => {
    showtimeFormContainer.style.display = "block";
    await loadMovies();
    await loadRooms();
});

btnCancelShowtime.addEventListener("click", () => {
    showtimeFormContainer.style.display = "none";
});

// ====== Load danh sách phim ======
async function loadMovies() {
    const res = await fetch(API_MOVIE);
    const data = await res.json();
    movieSelect.innerHTML = data.map(m => `<option value="${m.id}">${m.title}</option>`).join("");
}

// ====== Load danh sách phòng ======
async function loadRooms() {
    const res = await fetch(API_ROOM);
    const data = await res.json();
    roomSelect.innerHTML = data.map(r => `<option value="${r.id}">${r.name}</option>`).join("");
}

// ====== Gửi yêu cầu tạo suất chiếu ======
showtimeForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const dto = {
        movieId: parseInt(movieSelect.value),
        roomId: parseInt(roomSelect.value),
        startTime: new Date(document.getElementById("startTime").value).toISOString(),
        baseTicketPrice: parseFloat(document.getElementById("baseTicketPrice").value)
    };
    console.log(dto);

    try {
        const token = localStorage.getItem("token"); // nếu bạn có token đăng nhập admin
        const res = await fetch(API_SHOWTIME, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(dto)
        });

        if (!res.ok) {
            const err = await res.text();
            throw new Error(err);
        }

        alert("Thêm suất chiếu thành công!");
        showtimeFormContainer.style.display = "none";
    } catch (err) {
        alert("Lỗi: " + err.message);
    }
});
// ====== API Lấy danh sách suất chiếu ======
async function loadShowtimes(pageNumber = 1, pageSize = 10) {
    const selectedDate= showtimeDate.value;
    const params= new URLSearchParams({
        pageNumber,
        pageSize
    });
    if(selectedDate){
        params.append("date",selectedDate);
    }
    try {
        const url = `${API_SHOWTIME}/get-all?${params.toString()}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error("Không thể tải danh sách suất chiếu.");

        const result = await res.json();
        console.log(result); // kiểm tra dữ liệu trả về

        const data = result.items || result.Items || [];

        if (data.length === 0) {
            showtimeTableBody.innerHTML = `<tr><td colspan="3" style="text-align:center;">Không có suất chiếu nào.</td></tr>`;
            return;
        }

        showtimeTableBody.innerHTML = data.map(st => `
            <tr>
                <td>${st.movie ? st.movie.title : "Không rõ"}</td>
                <td>${new Date(st.startTime).toLocaleString("vi-VN")}</td>
                <td>${st.room ? st.room.name : "Không rõ"}</td>
            </tr>
        `).join("");

    } catch (err) {
        console.error(err);
        alert("Lỗi khi tải danh sách suất chiếu: " + err.message);
    }
}

// ====== Gắn sự kiện tải khi nhấn nút "Tải suất chiếu" ======
btnLoadShowtime.addEventListener("click", async () => {
    await loadShowtimes();
});

// ====== Tải danh sách ngay khi trang load ======
window.addEventListener("DOMContentLoaded", async () => {
    await loadShowtimes();
});


