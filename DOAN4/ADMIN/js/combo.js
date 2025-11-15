const apiBase = "http://localhost:5136/api/Combo";
const token = localStorage.getItem("token");

const toggleBtn = document.getElementById("toggleCreateForm");
const createForm = document.getElementById("createComboForm");
const tbody = document.getElementById("comboTableBody");

const prevBtn = document.getElementById("prevPage");
const nextBtn = document.getElementById("nextPage");
const currentPageSpan = document.getElementById("currentPage");

let currentPage = 1;
const pageSize = 5; 
let totalPages = 1;

toggleBtn.addEventListener("click", () => {
    createForm.style.display = createForm.style.display === "none" ? "block" : "none";
});

async function loadCombo(page = 1) {
    try {
        const res = await fetch(`${apiBase}?PageNumber=${page}&Pagesize=${pageSize}`);
        const data = await res.json();

        const items = data.items;
        const totalItems = data.totalItems;
        totalPages = Math.ceil(totalItems / pageSize);

        tbody.innerHTML = "";

        items.forEach(c => {
            tbody.innerHTML += `
                <tr>
                    <td><img src="http://localhost:5136${c.imageUrl}" width="70"></td>
                    <td>${c.name}</td>
                    <td>${c.price.toLocaleString()}₫</td>
                    <td>${c.description}</td>
                    <td>
                        <input type="checkbox" class="statusToggle" data-id="${c.id}" ${c.isActive ? "checked" : ""}>
                    </td>
                </tr>
            `;
        });

        currentPage = page;
        currentPageSpan.textContent = currentPage;

        prevBtn.disabled = currentPage === 1;
        nextBtn.disabled = currentPage === totalPages;

        // **Gắn sự kiện toggle trạng thái sau khi render**
        document.querySelectorAll(".statusToggle").forEach(checkbox => {
            checkbox.addEventListener("change", async (e) => {
                const comboId = e.target.dataset.id;
                const status = e.target.checked;

                const formData = new FormData();
                formData.append("status", status);

                try {
                    const res2 = await fetch(`${apiBase}/${comboId}`, {
                        method: "PUT",
                        headers: {
                            "Authorization": `Bearer ${token}`
                        },
                        body: formData
                    });

                    if (!res2.ok) {
                        alert("Cập nhật trạng thái thất bại!");
                        e.target.checked = !status; // revert checkbox
                    } else {
                        console.log("Cập nhật trạng thái thành công");
                    }
                } catch (err) {
                    console.error("Update status error:", err);
                    e.target.checked = !status; // revert checkbox
                }
            });
        });

    } catch (err) {
        console.error("Load combo error:", err);
    }
}


// Thêm combo
document.getElementById("btnAddCombo").addEventListener("click", async () => {
    const name = document.getElementById("comboName").value;
    const description = document.getElementById("comboDescription").value;
    const price = document.getElementById("comboPrice").value;
    const file = document.getElementById("comboImage").files[0];

    if (!name || !description || !price || !file) {
        alert("Vui lòng nhập đầy đủ thông tin!");
        return;
    }

    const formData = new FormData();
    formData.append("Name", name);
    formData.append("Description", description);
    formData.append("Price", price);
    formData.append("formFile", file);

    try {
        const res = await fetch(apiBase, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`
            },
            body: formData
        });

        if (!res.ok) {
            alert("Thêm combo thất bại");
            return;
        }

        alert("Thêm combo thành công!");
        createForm.style.display = "none";
        loadCombo(currentPage); // reload trang hiện tại
    } catch (error) {
        console.error("Error creating combo:", error);
    }
});

prevBtn.addEventListener("click", () => {
    if (currentPage > 1) loadCombo(currentPage - 1);
});
nextBtn.addEventListener("click", () => {
    if (currentPage < totalPages) loadCombo(currentPage + 1);
});
// Gắn sự kiện toggle trạng thái sau khi load combo
document.querySelectorAll(".statusToggle").forEach(checkbox => {
    checkbox.addEventListener("change", async (e) => {
        const comboId = e.target.dataset.id;
        const status = e.target.checked;

        try {
            const res = await fetch(`${apiBase}/${comboId}`, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                body: new FormData() // tạo form data để gửi
            });

            // Thêm status vào formData
            const formData = new FormData();
            formData.append("status", status);

            const res2 = await fetch(`${apiBase}/${comboId}`, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                body: formData
            });

            if (!res2.ok) {
                alert("Cập nhật trạng thái thất bại!");
                e.target.checked = !status; // revert checkbox
            } else {
                console.log("Cập nhật trạng thái thành công");
            }
        } catch (err) {
            console.error("Update status error:", err);
            e.target.checked = !status; // revert checkbox
        }
    });
});

loadCombo(1);
