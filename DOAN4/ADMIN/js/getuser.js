// Lấy phần tử user-details
const userNameEl = document.querySelector(".user-details .user-name");
const userRoleEl = document.querySelector(".user-details .user-role");

// Lấy dữ liệu từ localStorage
const storedName = localStorage.getItem("fullName");
const storedRole = localStorage.getItem("role");

// Cập nhật nội dung nếu có dữ liệu
if(storedName) userNameEl.textContent = storedName;
if(storedRole) userRoleEl.textContent = storedRole;
