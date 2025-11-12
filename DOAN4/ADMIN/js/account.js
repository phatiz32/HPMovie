const API_ACCOUNT = "http://localhost:5136/api/AccountManager";

const staffTableBody = document.getElementById("staffTableBody");
const btnAddStaff = document.getElementById("btnAddStaff");
const staffFormContainer = document.getElementById("staffFormContainer");
const staffForm = document.getElementById("staffForm");
const btnCancelStaff = document.getElementById("btnCancelStaff");
const btnImportExcel = document.getElementById("btnImportExcel");
const staffExcelFile = document.getElementById("staffExcelFile");

// Hiển thị form thêm nhân viên
btnAddStaff.addEventListener("click", () => {
    staffFormContainer.style.display = "block";
});

// Hủy form
btnCancelStaff.addEventListener("click", () => {
    staffFormContainer.style.display = "none";
});

// Tạo tài khoản nhân viên
staffForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const dto = {
        fullName: document.getElementById("staffName").value,
        email: document.getElementById("staffEmail").value,
        password: document.getElementById("staffPassword").value,
        dateofbirth:document.getElementById("birthDay").value,
        phonenumber:document.getElementById("phoneNumber").value

    };

    try {
        const token = localStorage.getItem("token"); // nếu có token admin
        const res = await fetch(`${API_ACCOUNT}/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(dto)
        });

        if (!res.ok) {
            const err = await res.text();
            throw new Error(err);
        }

        alert("Tạo nhân viên thành công!");
        staffFormContainer.style.display = "none";
        staffForm.reset();
        loadStaffs(); // reload danh sách
    } catch (err) {
        alert("Lỗi: " + err.message);
    }
});

// Import Excel
btnImportExcel.addEventListener("click", async () => {
    if (!staffExcelFile.files.length) {
        alert("Vui lòng chọn file Excel!");
        return;
    }

    const formData = new FormData();
    formData.append("File", staffExcelFile.files[0]);

    try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${API_ACCOUNT}/import-account`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`
            },
            body: formData
        });

        if (!res.ok) {
            const err = await res.text();
            throw new Error(err);
        }

        alert("Import Excel thành công!");
        staffExcelFile.value = "";
        loadStaffs();
    } catch (err) {
        alert("Lỗi: " + err.message);
    }
});
const API_GET_STAFF = "http://localhost:5136/api/AccountManager/staff";
// Hàm load danh sách staff
async function loadStaff() {
    try {
        const token = localStorage.getItem("token"); // nếu có auth
        const res = await fetch(API_GET_STAFF, {
            headers: {
                "Authorization": token ? `Bearer ${token}` : ""
            }
        });

        if (!res.ok) throw new Error("Không thể tải danh sách nhân viên.");

        const staffList = await res.json();

        if (!staffList || staffList.length === 0) {
            staffTableBody.innerHTML = `<tr><td colspan="4" style="text-align:center;">Không có nhân viên nào</td></tr>`;
            return;
        }
        console.log(staffList);
        staffTableBody.innerHTML = staffList.map(staff => `
            <tr>
                <td>${staff.fullName}</td>
                <td>${staff.email}</td>
                <td>${staff.phoneNumber || ""}</td>
                <td>
                    <button class="delete-btn" onclick="deleteStaff('${staff.id}')">
                        <i class='bx bx-trash'></i> Xóa
                    </button>
                </td>
            </tr>
        `).join("");
    } catch (err) {
        console.error(err);
        staffTableBody.innerHTML = `<tr><td colspan="4" style="text-align:center;">Lỗi khi tải dữ liệu</td></tr>`;
    }
}
// Xóa nhân viên
async function deleteStaff(accountId) {
    if (!confirm("Bạn có chắc muốn xóa nhân viên này không?")) return;

    try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${API_ACCOUNT}/${accountId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if (!res.ok) {
            const err = await res.text();
            throw new Error(err);
        }

        alert("Xóa nhân viên thành công!");
        loadStaff(); // reload lại danh sách
    } catch (err) {
        alert("Lỗi khi xóa: " + err.message);
    }
}


window.addEventListener("DOMContentLoaded", loadStaff);
