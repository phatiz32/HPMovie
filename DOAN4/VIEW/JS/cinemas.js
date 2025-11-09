// Cinemas Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Sample cinema data
    const cinemas = [
        {
            id: 1,
            name: "CineMax Royal City",
            address: "72A Nguyễn Trãi, Thanh Xuân, Hà Nội",
            phone: "024 1234 5678",
            hours: "8:00 - 24:00",
            city: "hanoi",
            district: "thanhxuan",
            distance: "1.2km",
            amenities: ["IMAX", "4DX", "Ghế VIP", "Bãi đỗ xe", "WiFi"],
            coordinates: { lat: 21.001, lng: 105.816 },
            showtimes: [
                {
                    movie: "Avengers: Endgame",
                    times: ["10:00", "13:30", "16:45", "20:00", "22:30"]
                },
                {
                    movie: "Spider-Man: No Way Home",
                    times: ["11:15", "14:30", "17:45", "21:00"]
                },
                {
                    movie: "The Batman",
                    times: ["10:45", "14:00", "17:15", "20:30", "23:00"]
                }
            ]
        },
        {
            id: 2,
            name: "CineMax Vincom Center",
            address: "191 Bà Triệu, Hai Bà Trưng, Hà Nội",
            phone: "024 2345 6789",
            hours: "8:00 - 24:00",
            city: "hanoi",
            district: "haibatrung",
            distance: "2.5km",
            amenities: ["IMAX", "3D", "Ghế đôi", "Quầy bar", "WiFi"],
            coordinates: { lat: 21.013, lng: 105.852 },
            showtimes: [
                {
                    movie: "Avengers: Endgame",
                    times: ["09:30", "12:45", "16:00", "19:15", "22:30"]
                },
                {
                    movie: "Dune",
                    times: ["11:00", "14:15", "17:30", "20:45"]
                }
            ]
        },
        {
            id: 3,
            name: "CineMax Aeon Mall",
            address: "27 Cổ Linh, Long Biên, Hà Nội",
            phone: "024 3456 7890",
            hours: "8:30 - 23:30",
            city: "hanoi",
            district: "longbien",
            distance: "5.8km",
            amenities: ["IMAX", "2D", "Khu vui chơi", "Nhà hàng", "Bãi đỗ xe"],
            coordinates: { lat: 21.038, lng: 105.895 },
            showtimes: [
                {
                    movie: "Spider-Man: No Way Home",
                    times: ["10:15", "13:30", "16:45", "20:00", "23:15"]
                },
                {
                    movie: "The Batman",
                    times: ["11:30", "14:45", "18:00", "21:15"]
                }
            ]
        }
    ];

    // District data based on city
    const districts = {
        hanoi: [
            { value: "thanhxuan", label: "Thanh Xuân" },
            { value: "haibatrung", label: "Hai Bà Trưng" },
            { value: "longbien", label: "Long Biên" },
            { value: "hoankiem", label: "Hoàn Kiếm" },
            { value: "dongda", label: "Đống Đa" }
        ],
        hcm: [
            { value: "district1", label: "Quận 1" },
            { value: "district3", label: "Quận 3" },
            { value: "binhthanh", label: "Bình Thạnh" },
            { value: "phunhuan", label: "Phú Nhuận" }
        ],
        danang: [
            { value: "haichau", label: "Hải Châu" },
            { value: "thanhkhe", label: "Thanh Khê" },
            { value: "sonra", label: "Sơn Trà" }
        ],
        cantho: [
            { value: "ninhkieu", label: "Ninh Kiều" },
            { value: "cairanh", label: "Cái Răng" }
        ]
    };

    // DOM Elements
    const cityFilter = document.getElementById('cityFilter');
    const districtFilter = document.getElementById('districtFilter');
    const cinemaSearch = document.getElementById('cinemaSearch');
    const searchCinemaBtn = document.getElementById('searchCinemaBtn');
    const cinemasContainer = document.getElementById('cinemasContainer');
    const cinemaModal = document.getElementById('cinemaModal');
    const closeModalBtn = document.querySelector('.close-modal');
    const getDirectionsBtn = document.getElementById('getDirections');

    // Initialize
    renderCinemas(cinemas);
    setupEventListeners();

    function setupEventListeners() {
        // City filter change
        cityFilter.addEventListener('change', function() {
            const city = this.value;
            updateDistrictFilter(city);
            filterCinemas();
        });

        // District filter change
        districtFilter.addEventListener('change', filterCinemas);

        // Search functionality
        searchCinemaBtn.addEventListener('click', filterCinemas);
        cinemaSearch.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                filterCinemas();
            }
        });

        // Modal close
        closeModalBtn.addEventListener('click', closeModal);
        cinemaModal.addEventListener('click', function(e) {
            if (e.target === cinemaModal) {
                closeModal();
            }
        });

        // Get directions
        getDirectionsBtn.addEventListener('click', function() {
            const address = document.getElementById('modalAddress').textContent;
            const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
            window.open(googleMapsUrl, '_blank');
        });
    }

    function updateDistrictFilter(city) {
        const districtSelect = document.getElementById('districtFilter');
        districtSelect.innerHTML = '<option value="all">Tất cả quận/huyện</option>';
        
        if (city !== 'all' && districts[city]) {
            districts[city].forEach(district => {
                const option = document.createElement('option');
                option.value = district.value;
                option.textContent = district.label;
                districtSelect.appendChild(option);
            });
        }
    }

    function filterCinemas() {
        const city = cityFilter.value;
        const district = districtFilter.value;
        const searchTerm = cinemaSearch.value.toLowerCase();

        const filteredCinemas = cinemas.filter(cinema => {
            const matchesCity = city === 'all' || cinema.city === city;
            const matchesDistrict = district === 'all' || cinema.district === district;
            const matchesSearch = cinema.name.toLowerCase().includes(searchTerm) || 
                                cinema.address.toLowerCase().includes(searchTerm);

            return matchesCity && matchesDistrict && matchesSearch;
        });

        renderCinemas(filteredCinemas);
    }

    function renderCinemas(cinemasToRender) {
        cinemasContainer.innerHTML = '';

        if (cinemasToRender.length === 0) {
            cinemasContainer.innerHTML = `
                <div class="no-results">
                    <p>Không tìm thấy rạp chiếu phù hợp với tiêu chí tìm kiếm.</p>
                </div>
            `;
            return;
        }

        cinemasToRender.forEach(cinema => {
            const cinemaCard = createCinemaCard(cinema);
            cinemasContainer.appendChild(cinemaCard);
        });
    }

    function createCinemaCard(cinema) {
        const card = document.createElement('div');
        card.className = 'cinema-card';
        card.innerHTML = `
            <div class="cinema-header">
                <div>
                    <h3 class="cinema-name">${cinema.name}</h3>
                    <p class="cinema-address">📍 ${cinema.address}</p>
                </div>
                <span class="cinema-distance">${cinema.distance}</span>
            </div>
            <div class="cinema-features">
                ${cinema.amenities.map(amenity => 
                    `<span class="feature-tag">${amenity}</span>`
                ).join('')}
            </div>
            <div class="cinema-actions">
                <button class="btn-direction" data-id="${cinema.id}">Chỉ đường</button>
                <button class="btn-showtimes" data-id="${cinema.id}">Xem lịch chiếu</button>
            </div>
        `;

        // Add event listeners to buttons
        card.querySelector('.btn-direction').addEventListener('click', function() {
            showDirections(cinema);
        });

        card.querySelector('.btn-showtimes').addEventListener('click', function() {
            openCinemaModal(cinema);
        });

        return card;
    }

    function showDirections(cinema) {
        const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(cinema.address)}`;
        window.open(googleMapsUrl, '_blank');
    }

    function openCinemaModal(cinema) {
        // Update modal content
        document.getElementById('modalCinemaName').textContent = cinema.name;
        document.getElementById('modalAddress').textContent = cinema.address;
        document.getElementById('modalPhone').textContent = cinema.phone;
        document.getElementById('modalHours').textContent = cinema.hours;
        
        // Update amenities
        const amenitiesContainer = document.getElementById('modalAmenities');
        amenitiesContainer.innerHTML = cinema.amenities.map(amenity => 
            `<span class="amenity-tag">${amenity}</span>`
        ).join('');

        // Update showtimes
        const showtimesContainer = document.getElementById('modalShowtimes');
        showtimesContainer.innerHTML = cinema.showtimes.map(showtime => `
            <div class="movie-showtime">
                <div class="movie-title">${showtime.movie}</div>
                <div class="time-slots">
                    ${showtime.times.map(time => 
                        `<span class="time-slot">${time}</span>`
                    ).join('')}
                </div>
            </div>
        `).join('');

        // Add click event to time slots
        showtimesContainer.querySelectorAll('.time-slot').forEach(slot => {
            slot.addEventListener('click', function() {
                const movieTitle = this.closest('.movie-showtime').querySelector('.movie-title').textContent;
                const time = this.textContent;
                alert(`Bạn đã chọn đặt vé xem "${movieTitle}" lúc ${time} tại ${cinema.name}`);
                // In real application, this would redirect to booking page
            });
        });

        // Show modal
        cinemaModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        cinemaModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    // Initialize district filter based on default city
    updateDistrictFilter(cityFilter.value);
});