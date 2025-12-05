const API_SHOWTIME = "http://localhost:5136/api/Showtime/seats";
const API_ORDER = "http://localhost:5136/api/Booking/create-order";

let showtimeIdGlobal = null;
let selectedSeatIds = [];
let seats = [];
let baseTicketPrice = 50000;

// -------------------- Load thông tin ghế --------------------
async function loadSeats() {
    const params = new URLSearchParams(window.location.search);
    const showtimeId = params.get("showtimeId");
    showtimeIdGlobal = showtimeId;

    if (!showtimeId) return;

    try {
        const res = await fetch(`${API_SHOWTIME}/${showtimeId}`);
        const data = await res.json();

        seats = data.seats;
        baseTicketPrice = data.baseTicketPrice || 50000;

        document.getElementById("movieInfo").innerHTML = `
            <p><strong>Phim:</strong> ${data.movieTitle}</p>
            <p><strong>Giờ chiếu:</strong> ${new Date(data.startTime).toLocaleString('vi-VN', { 
                weekday:'long', year:'numeric', month:'2-digit', day:'2-digit', hour:'2-digit', minute:'2-digit'
            })}</p>
            <p><strong>Phòng:</strong> ${data.roomName}</p>
        `;

        renderSeats(data.rowCount, data.columnCount, seats);
        updateTotalPrice();

    } catch (err) {
        console.error("Lỗi fetch API:", err);
    }
}

// -------------------- Render ghế --------------------
function renderSeats(rows, cols, seats) {
    const container = document.getElementById("seatContainer");
    container.innerHTML = "";

    let html = `<div class="seat-grid" style="display: grid; grid-template-columns: repeat(${cols}, 40px); gap: 8px;">`;

    seats.forEach(seat => {
        let seatClass = '';
        if (!seat.isAvailable) seatClass = 'booked'; // ghế đã đặt
        else seatClass = seat.seatType === 'VIP' ? 'vip available' : 'normal available';

        html += `
            <div class="seat ${seatClass}"
                 data-seat="${seat.seatCode}"
                 data-id="${seat.id}">
                ${seat.seatCode}
            </div>`;
    });

    html += `</div>`;
    container.innerHTML = html;

    // -------------------- Sự kiện click chọn ghế --------------------
    const seatElements = container.querySelectorAll('.seat.available');
    seatElements.forEach(el => {
        el.addEventListener('click', () => {
            const seatId = parseInt(el.dataset.id);
            el.classList.toggle('selected');

            if (selectedSeatIds.includes(seatId)) {
                selectedSeatIds = selectedSeatIds.filter(id => id !== seatId);
            } else {
                selectedSeatIds.push(seatId);
            }

            updateTotalPrice();
        });
    });
}

// -------------------- Cập nhật tổng tiền --------------------
function updateTotalPrice() {
    let total = 0;
    selectedSeatIds.forEach(id => {
        const seat = seats.find(s => s.id === id);
        if (seat) {
            let price = baseTicketPrice;
            if (seat.seatType === "VIP") price += 10000;
            total += price;
        }
    });
    document.getElementById("totalPrice").textContent = total.toLocaleString();
}

// -------------------- Đặt vé --------------------
async function createOrder() {
    if (!showtimeIdGlobal || selectedSeatIds.length === 0) {
        alert("Vui lòng chọn ghế trước khi đặt vé.");
        return;
    }

    const token = localStorage.getItem("token");

    try {
        const res = await fetch(API_ORDER, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                showTimeId: parseInt(showtimeIdGlobal),
                seatIds: selectedSeatIds
            })
        });

        if (!res.ok) {
            const errMsg = await res.text();
            throw new Error(errMsg);
        }

        const data = await res.json();
        localStorage.setItem("currentOrderId", data.orderId);
        window.location.href = "shop.html";

        selectedSeatIds = [];
        loadSeats(); // reload ghế để cập nhật ghế đã đặt
    } catch (err) {
        console.error(err);
        alert("Đặt vé thất bại: " + err.message);
    }
}

// -------------------- Sự kiện nút Đặt vé --------------------
document.addEventListener("DOMContentLoaded", () => {
    const btnBook = document.getElementById("btnBook");
    if (btnBook) {
        btnBook.addEventListener("click", createOrder);
    }
});

// Load ghế khi mở trang
loadSeats();
