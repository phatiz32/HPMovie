const API_SHOWTIME = "http://localhost:5136/api/Showtime";

// -------------------- Tạo thanh chọn ngày --------------------
function renderDateSelector() {
    const container = document.getElementById("dateSelector");
    const today = new Date();
    const dayOfWeek = today.getDay();
    const totalDays = 13;
    const daysToSunday = 7 - dayOfWeek;
    for (let i = 0; i <= totalDays; i++) {
        const d = new Date();
        d.setDate(today.getDate() + i);

        const dateStr = d.toISOString().split("T")[0]; // yyyy-mm-dd

        const item = document.createElement("div");
        item.classList.add("date-item");
        if (i === 0) item.classList.add("active");

        item.dataset.date = dateStr;

        item.innerHTML = `
            <div>${d.getDate()}/${d.getMonth() + 1}</div>
            <small>${["CN","T2","T3","T4","T5","T6","T7"][d.getDay()]}</small>
        `;

        item.onclick = () => {
            document.querySelectorAll(".date-item").forEach(el => el.classList.remove("active"));
            item.classList.add("active");

            loadShowtimes(dateStr);
        };

        container.appendChild(item);
    }
    
    loadShowtimes(today.toISOString().split("T")[0]);
}

renderDateSelector();


async function loadShowtimes(date) {
    const cinemaList = document.getElementById("cinemaList");
    cinemaList.innerHTML = `<p>Đang tải lịch chiếu...</p>`;

    try {
        const res = await fetch(`${API_SHOWTIME}/${date}`);
        const data = await res.json();

        renderMovies(data);
    } catch (err) {
        cinemaList.innerHTML = `<p>Lỗi tải dữ liệu.</p>`;
        console.error(err);
    }
}

// -------------------- Render lịch chiếu --------------------
function renderMovies(data) {
    const container = document.getElementById("cinemaList");
    container.innerHTML = "";

    if (!data || data.length === 0) {
        container.innerHTML = `<p>Không có suất chiếu nào vào ngày này.</p>`;
        return;
    }

    data.forEach(movie => {
        const item = document.createElement("div");
        item.classList.add("movie-item");
        const poster = `http://localhost:5136/uploads/${movie.posterUrl}`;
        const times = movie.showTime
            .map(t => {
                const time = new Date(t.startTime);
                const formatted = `${time.getHours().toString().padStart(2, "0")}:${time.getMinutes().toString().padStart(2, "0")}`;

                return `<span class="showtime" data-id="${t.id}" onclick="goToSeatPage(${t.id})">${formatted}</span>`;
            })
            .join("");


        item.innerHTML = `
            <div class="movie-info">
                <img src="${poster}" alt="${movie.movieTitle}" class="movie-poster">
                <div>
                    <h3>${movie.movieTitle}</h3>
                </div>
            </div>
            <div class="showtimes">${times}</div>
        `;

        container.appendChild(item);
    });
}
function goToSeatPage(showtimeId) {
    window.location.href = `booking.html?showtimeId=${showtimeId}`;
}

