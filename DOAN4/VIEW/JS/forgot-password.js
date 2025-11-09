document.getElementById("forgotPasswordForm").addEventListener("submit", async function(e) {
    e.preventDefault(); // ngăn reload trang

    const email = document.getElementById("email").value;
    const messageDiv = document.getElementById("message");

    try {
        const response = await fetch("http://localhost:5136/api/account/forgot-password", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email })
        });

        if (response.ok) {
            messageDiv.style.color = "green";
            messageDiv.textContent = "Email đặt lại mật khẩu đã được gửi!";
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
