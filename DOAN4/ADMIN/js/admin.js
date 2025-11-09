
const loadRevenueBtn = document.getElementById('loadRevenueBtn');
const yearInput = document.getElementById('yearInput');

const loadRevenueByDayBtn = document.getElementById('loadRevenueByDayBtn');
const startDateInput = document.getElementById('startDate');
const endDateInput = document.getElementById('endDate');

// Hàm fetch dữ liệu an toàn
async function safeFetch(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const text = await response.text();
    if (!text) return []; // trả về mảng rỗng nếu server không có dữ liệu
    try {
        return JSON.parse(text);
    } catch (err) {
        console.error('Lỗi parse JSON:', err, 'Raw text:', text);
        throw new Error('Dữ liệu server không hợp lệ');
    }
}

// Load doanh thu theo năm (phim & tháng)
loadRevenueBtn.addEventListener('click', async () => {
    const year = yearInput.value;
    if (!year) return alert("Vui lòng nhập năm");

    await loadRevenueByMovie(year);
    await loadRevenueByMonth(year);
    await loadChartRevenueByMonth(year); 
});

// Load doanh thu theo ngày
loadRevenueByDayBtn.addEventListener('click', async () => {
    const startDate = startDateInput.value;
    const endDate = endDateInput.value;
    if (!startDate || !endDate) return alert("Vui lòng chọn khoảng thời gian");

    await loadRevenueByDay(startDate, endDate);
});

// --- Load doanh thu theo phim ---
async function loadRevenueByMovie(year) {
    const tableBody = document.querySelector('#revenueByMovieTable tbody');
    tableBody.innerHTML = '<tr><td colspan="4" style="text-align:center">Đang tải...</td></tr>';

    try {
        const data = await safeFetch(`http://localhost:5136/api/statistic/by-movie?year=${year}`);
        if (!data.length) {
            tableBody.innerHTML = '<tr><td colspan="4" style="text-align:center;color:#999">Không có dữ liệu</td></tr>';
            return;
        }

        tableBody.innerHTML = data.map(item => `
            <tr>
                <td>${item.movieId}</td>
                <td>${item.movieTitle}</td>
                <td>${item.totalRevenue.toLocaleString()}</td>
                <td>${item.totalTickets}</td>
            </tr>
        `).join('');

    } catch(err) {
        tableBody.innerHTML = `<tr><td colspan="4" style="text-align:center;color:red">${err.message}</td></tr>`;
    }
}

// --- Load doanh thu theo tháng ---
async function loadRevenueByMonth(year) {
    const tableBody = document.querySelector('#revenueByMonthTable tbody');
    tableBody.innerHTML = '<tr><td colspan="3" style="text-align:center">Đang tải...</td></tr>';

    try {
        const data = await safeFetch(`http://localhost:5136/api/statistic/by-month?month=${year}`);
        if (!data.length) {
            tableBody.innerHTML = '<tr><td colspan="3" style="text-align:center;color:#999">Không có dữ liệu</td></tr>';
            return;
        }

        tableBody.innerHTML = data.map(item => `
            <tr>
                <td>${item.label}</td>
                <td>${item.totalRevenue.toLocaleString()}</td>
                <td>${item.totalTickets}</td>
            </tr>
        `).join('');

    } catch(err) {
        tableBody.innerHTML = `<tr><td colspan="3" style="text-align:center;color:red">${err.message}</td></tr>`;
    }
}

// --- Load doanh thu theo ngày ---
async function loadRevenueByDay(startDate, endDate) {
    const tableBody = document.querySelector('#revenueByDayTable tbody');
    tableBody.innerHTML = '<tr><td colspan="3" style="text-align:center">Đang tải...</td></tr>';

    try {
        const data = await safeFetch(`http://localhost:5136/api/statistic/by-day?startTime=${startDate}&endTime=${endDate}`);
        if (!data.length) {
            tableBody.innerHTML = '<tr><td colspan="3" style="text-align:center;color:#999">Không có dữ liệu</td></tr>';
            return;
        }

        tableBody.innerHTML = data.map(item => `
            <tr>
                <td>${new Date(item.label).toLocaleDateString()}</td>
                <td>${item.totalRevenue.toLocaleString()}</td>
                <td>${item.totalTickets}</td>
            </tr>
        `).join('');

    } catch(err) {
        tableBody.innerHTML = `<tr><td colspan="3" style="text-align:center;color:red">${err.message}</td></tr>`;
    }
}
async function downloadFile(url, filename) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Không tải được file');

        const blob = await response.blob();
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = filename;
        link.click();
        window.URL.revokeObjectURL(link.href);
    } catch (err) {
        alert(err.message);
    }
}

// Export theo phim
document.getElementById('exportByMovieBtn').addEventListener('click', () => {
    const year = yearInput.value;
    if (!year) return alert("Vui lòng nhập năm");
    downloadFile(`http://localhost:5136/api/statistic/export-bymovie?year=${year}`, `Revenue_Movie_${year}.xlsx`);
});

// Export theo tháng
document.getElementById('exportByMonthBtn').addEventListener('click', () => {
    const year = yearInput.value;
    if (!year) return alert("Vui lòng nhập năm");
    downloadFile(`http://localhost:5136/api/statistic/export-bymonth?year=${year}`, `Revenue_${year}.xlsx`);
});

// Export theo ngày
document.getElementById('exportByDayBtn').addEventListener('click', () => {
    const startDate = startDateInput.value;
    const endDate = endDateInput.value;
    if (!startDate || !endDate) return alert("Vui lòng chọn khoảng thời gian");
    downloadFile(`http://localhost:5136/api/statistic/export-bydate?startDate=${startDate}&endDate=${endDate}`, `Revenue_${startDate}_${endDate}.xlsx`);
});
let revenueChart; // lưu chart để update

async function loadChartRevenueByMonth(year) {
    try {
        const data = await safeFetch(`http://localhost:5136/api/statistic/by-month?month=${year}`);
        if (!data.length) {
            alert("Không có dữ liệu để vẽ biểu đồ");
            return;
        }

        const labels = data.map(item => item.label); // ví dụ: "1/2025", "2/2025"
        const revenueData = data.map(item => item.totalRevenue);

        const ctx = document.getElementById('revenueChart').getContext('2d');

        // Nếu chart đã tồn tại thì destroy trước
        if (revenueChart) revenueChart.destroy();

        revenueChart = new Chart(ctx, {
            type: 'bar', // cột
            data: {
                labels: labels,
                datasets: [{
                    label: 'Doanh thu (VND)',
                    data: revenueData,
                    backgroundColor: 'rgba(54, 162, 235, 0.6)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return value.toLocaleString(); // format VND
                            }
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: true
                    }
                }
            }
        });

    } catch (err) {
        console.error(err);
        alert("Lỗi khi tải dữ liệu biểu đồ");
    }
}




