
document.addEventListener("DOMContentLoaded", function() {
    const userActions = document.getElementById("userActions");
    const fullName = localStorage.getItem("fullName");

    if (fullName) {
        // Nếu đã đăng nhập
        userActions.innerHTML = `
            <span>Xin chào, <b>${fullName}</b></span>
            <button id="logoutBtn" class="btn-logout">Đăng xuất</button>
        `;
        
        document.getElementById("logoutBtn").addEventListener("click", () => {
            localStorage.removeItem("token");
            localStorage.removeItem("fullName");
            location.reload(); 
        });
    }
});
