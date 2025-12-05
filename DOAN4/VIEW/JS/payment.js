const API_VNPAY = "http://localhost:5136/api/Payment/vnpay-create";

document.addEventListener("DOMContentLoaded", () => {
    const btnVnpay = document.getElementById("btnVnpay");

    btnVnpay.addEventListener("click", handleVnPayCheckout);
});

async function handleVnPayCheckout() {
    const orderId = localStorage.getItem("currentOrderId");
    const token = localStorage.getItem("token");

    if (!orderId) {
        alert("Không tìm thấy Order. Vui lòng đặt vé lại.");
        window.location.href = "booking.html";
        return;
    }

    try {
        const res = await fetch(API_VNPAY, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(orderId)
        });

        if (!res.ok) {
            const err = await res.text();
            throw new Error(err);
        }

        const paymentUrl = await res.text(); 
        console.log("Redirecting to:", paymentUrl);

        window.location.href = paymentUrl;  

    } catch (error) {
        console.error(error);
        alert("Lỗi tạo URL thanh toán VNPAY: " + error.message);
    }
}
