document.addEventListener("DOMContentLoaded", function () {
    if (localStorage.getItem("role") !== "Admin") {
        document.querySelectorAll(".admin-only").forEach(item => {
            item.style.display = "none";
        });
    }
});
