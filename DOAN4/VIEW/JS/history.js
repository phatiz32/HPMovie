const API_HISTORY = "http://localhost:5136/api/Booking/history";

document.addEventListener("DOMContentLoaded", loadBookingHistory);

async function loadBookingHistory() {
    const container = document.getElementById("historyContainer");

    // Hiển thị loading
    container.innerHTML = "<p>Đang tải lịch sử đặt vé...</p>";

    const token = localStorage.getItem("token");

    if (!token) {
        container.innerHTML = "<p>Bạn cần đăng nhập để xem lịch sử đặt vé.</p>";
        return;
    }

    try {
        const res = await fetch(API_HISTORY, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if (!res.ok) {
            container.innerHTML = "<p>Lỗi tải dữ liệu lịch sử.</p>";
            return;
        }

        const data = await res.json();

        if (data.length === 0) {
            container.innerHTML = "<p>Không có lịch sử đặt vé.</p>";
            return;
        }

        let html = "";

        data.forEach(item => {
            const seats = item.seats.join(", ");
            const combos = item.comboName.length > 0 ? item.comboName.join(", ") : "Không có";
            const date = new Date(item.startTime).toLocaleString("vi-VN");
            const paidAt = new Date(item.paidAt).toLocaleString("vi-VN");

            html += `
                <div class="history-card">
                    <h3>${item.movieTitle}</h3>
                    <p><strong>Giờ chiếu:</strong> ${date}</p>
                    <p><strong>Phòng:</strong> ${item.room}</p>
                    <p><strong>Ghế:</strong> ${seats}</p>
                    <p><strong>Combo:</strong> ${combos}</p>
                    <p><strong>Tổng tiền:</strong> ${item.totalAmount.toLocaleString()} VNĐ</p>
                    <p><strong>Thanh toán lúc:</strong> ${paidAt}</p>
                </div>
            `;
        });

        container.innerHTML = html;

    } catch (error) {
        console.error(error);
        container.innerHTML = "<p>Lỗi tải lịch sử đặt vé.</p>";
    }
}
