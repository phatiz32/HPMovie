document.getElementById("loginForm").addEventListener("submit", async function (e) {
    e.preventDefault(); // chặn reload trang

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const loginData = { email, password };

    try {
        const response = await fetch("http://localhost:5136/api/account/login", { 
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(loginData)
        });

        const result = await response.json(); // parse JSON trả về

        if (!response.ok) {
            // Nếu server trả lỗi
            throw new Error(result.message || "Đăng nhập thất bại!");
        }

        // lưu token và thông tin user
        localStorage.setItem("token", result.token);
        localStorage.setItem("fullName", result.fullName);
        localStorage.setItem("role", result.role); // dùng result.role chứ không phải data.role

        alert("Đăng nhập thành công! Xin chào " + result.fullName);

        // chuyển hướng theo role
        if (result.role === "Admin") {
            window.location.href = "../ADMIN/admin.html";
        } else {
            window.location.href = "../ADMIN/payment.html";
        }

    } catch (error) {
        alert("Đăng nhập thất bại: " + error.message);
        console.error(error);
    }
});
