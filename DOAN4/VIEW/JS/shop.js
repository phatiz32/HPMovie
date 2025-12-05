const API_COMBO = "http://localhost:5136/api/Combo?PageSize=5&PageNumber=1";
const API_ADD_TO_ORDER = "http://localhost:5136/api/Combo/AddToOrder";

const currentOrderId = localStorage.getItem("currentOrderId");

if (!currentOrderId) {
    alert("Không tìm thấy order. Vui lòng đặt vé trước.");
    window.location.href = "booking.html";
}

let comboSelections = {}; // { comboId: quantity }

// -------------------- Load Combo --------------------
async function loadCombos() {
    const container = document.getElementById("productsGrid");
    container.innerHTML = "<p>Đang tải...</p>";

    try {
        const res = await fetch(API_COMBO);
        if (!res.ok) throw new Error("Lỗi fetch API Combo");

        const data = await res.json();
        const activeCombos = data.items.filter(c => c.isActive);

        if (activeCombos.length === 0) {
            container.innerHTML = "<p>Không có combo nào.</p>";
            return;
        }

        let html = "";

        activeCombos.forEach(combo => {
            html += `
                <div class="product-card">
                    <img src="http://localhost:5136${combo.imageUrl}" alt="${combo.name}" class="product-image" />
                    <h3 class="product-name">${combo.name}</h3>
                    <p class="product-desc">${combo.description}</p>
                    <p class="product-price">${combo.price.toLocaleString()} VND</p>

                    <label>Số lượng:</label>
                    <input type="number" class="combo-qty" 
                        data-id="${combo.id}" 
                        data-price="${combo.price}"
                        min="0" 
                        value="0"
                    />
                </div>
            `;
        });

        container.innerHTML = html;

        document.querySelectorAll(".combo-qty").forEach(input => {
            input.addEventListener("input", updateTotalPrice);
        });

        document.getElementById("btnAddAll").addEventListener("click", addAllComboToOrder);

    } catch (err) {
        console.error(err);
        container.innerHTML = "<p>Không thể tải combo.</p>";
    }
}

// -------------------- Tính tổng tiền real-time --------------------
function updateTotalPrice() {
    comboSelections = {};
    let total = 0;

    document.querySelectorAll(".combo-qty").forEach(input => {
        const qty = parseInt(input.value);
        const comboId = parseInt(input.dataset.id);
        const price = parseInt(input.dataset.price);

        if (qty > 0) {
            comboSelections[comboId] = qty;
            total += qty * price;
        }
    });

    document.getElementById("totalComboPrice").textContent = total.toLocaleString();
}

// -------------------- Thêm tất cả combo đã chọn vào order --------------------
async function addAllComboToOrder() {
    if (Object.keys(comboSelections).length === 0) {
        alert("Bạn chưa chọn combo nào!");
        return;
    }

    const token = localStorage.getItem("token");

    const body = Object.entries(comboSelections).map(([comboId, quantity]) => ({
        comboId: parseInt(comboId),
        quantity: quantity
    }));

    try {
        const res = await fetch(`${API_ADD_TO_ORDER}?bookingOrderId=${currentOrderId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(body)
        });

        if (!res.ok) {
            const err = await res.text();
            throw new Error(err);
        }

        alert("Thêm combo thành công!");
        window.location.href = "payment.html"; // chuyển trang thanh toán

    } catch (err) {
        console.error(err);
        alert("Lỗi thêm combo: " + err.message);
    }
}

// -------------------- Start --------------------
document.addEventListener("DOMContentLoaded", loadCombos);
