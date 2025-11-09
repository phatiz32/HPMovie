// js/register.js

document.addEventListener("DOMContentLoaded", function () {
    const registerForm = document.getElementById("registerForm");

    registerForm.addEventListener("submit", async function (e) {
        e.preventDefault(); // chặn reload trang

        // Xóa thông báo lỗi cũ nếu có
        const oldError = document.querySelector(".form-error");
        if (oldError) oldError.remove();

        // Lấy dữ liệu từ form
        const fullName = document.getElementById("fullName").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const email = document.getElementById("email").value.trim();
        const birth = document.getElementById("Birthday").value;
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;

        // Kiểm tra password và confirmPassword
        if (password !== confirmPassword) {
            showError("Mật khẩu và xác nhận mật khẩu không khớp.");
            return;
        }
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=<>?{}[\]~]).{8,}$/;
        if (!passwordRegex.test(password)) {
            showError("Mật khẩu phải có ít nhất 8 ký tự, gồm:\n- 1 chữ hoa\n- 1 chữ số\n- 1 ký tự đặc biệt (như !@#$%^&*)");
            return;
        }


        // Tạo object gửi lên API
        const registerData = {
            FullName: fullName,
            PhoneNumber: phone,
            Email: email,
            DateOfBirth: birth,
            Password: password, 
            ConfirmPassword: confirmPassword
        };

        try {
            const response = await fetch("http://localhost:5136/api/account/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(registerData)
            });

            if (!response.ok) {
                let errorMessage = "";
                const bodyText = await response.text();
                errorMessage=bodyText;
                showError(errorMessage);
                return;
            }
 
            // Nếu đăng ký thành công
            const result = await response.json();
            alert("Đăng ký thành công! Chào mừng " + result.fullName);
            localStorage.setItem("token", result.token);
            localStorage.setItem("fullName", result.fullName);
            localStorage.setItem("role", result.role);
            if (result.role === "Admin") {
            window.location.href = "../ADMIN/admin.html";
        } else {
            window.location.href = "index.html";
        }
        } catch (error) {
            showError("Có lỗi xảy ra: " + error.message);
        }
    });

    // Hàm hiển thị lỗi - ĐÃ SỬA
    function showError(message) {
        const div = document.createElement("div");
        div.className = "form-error";
        div.style.color = "#d32f2f";
        div.style.backgroundColor = "#ffebee";
        div.style.padding = "12px 16px";
        div.style.marginBottom = "20px";
        div.style.borderRadius = "4px";
        div.style.border = "1px solid #ef5350";
        div.style.fontSize = "14px";
        div.style.lineHeight = "1.5";
        div.style.whiteSpace = "pre-line"; // Quan trọng: giữ nguyên xuống dòng với \n
        
        // Sử dụng textContent thay vì innerHTML để tránh vấn đề HTML encoding
        div.textContent = message;

        const form = document.getElementById("registerForm");
        form.prepend(div);

        // Tự động scroll đến lỗi
        div.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
});