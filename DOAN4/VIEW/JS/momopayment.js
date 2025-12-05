const API_MOMO = "http://localhost:5136/api/Payment/Create-momo";

document.addEventListener("DOMContentLoaded", () => {
    const btnMomo = document.getElementById("btnMomo");

    if (btnMomo) {
        btnMomo.addEventListener("click", handleMomoCheckout);
    }
});

async function handleMomoCheckout() {
    const orderId = localStorage.getItem("currentOrderId");
    const token = localStorage.getItem("token");

    if (!orderId) {
        alert("Không tìm thấy Order. Vui lòng đặt vé lại.");
        window.location.href = "booking.html";
        return;
    }

    try {
        const res = await fetch(API_MOMO, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(orderId)  // Backend nhận int
        });

        if (!res.ok) {
            const err = await res.text();
            throw new Error(err);
        }

        const data = await res.json();
        console.log("MOMO PAY URL:", data.paymentUrl);

        window.location.href = data.paymentUrl; // Điều hướng sang MOMO

    } catch (error) {
        console.error(error);
        alert("Lỗi tạo URL thanh toán MOMO: " + error.message);
    }
}
