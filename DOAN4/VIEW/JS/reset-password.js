// Lấy query string từ URL
const params = new URLSearchParams(window.location.search);
const emailFromUrl = params.get("email");
const tokenFromUrl = params.get("token");

// Điền vào form nếu có
if (emailFromUrl) document.getElementById("email").value = emailFromUrl;
if (tokenFromUrl) document.getElementById("token").value = tokenFromUrl;

// Xử lý submit form
document.getElementById("resetPasswordForm").addEventListener("submit", async function(e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const token = document.getElementById("token").value;
    const newPassword = document.getElementById("newPassword").value;
    const messageDiv = document.getElementById("message");

    try {
        const response = await fetch("http://localhost:5136/api/account/reset-password", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, token, newPassword })
        });

        if (response.ok) {
            messageDiv.style.color = "green";
            messageDiv.textContent = "Mật khẩu đã được đặt lại thành công!";
            window.location.href = "login.html";
        } else {
            const errorText = await response.text();
            messageDiv.style.color = "red";
            messageDiv.textContent = "Lỗi: " + errorText;
        }
    } catch (error) {
        messageDiv.style.color = "red";
        messageDiv.textContent = "Có lỗi xảy ra: " + error.message;
    }
});
