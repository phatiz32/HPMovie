// Booking Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const seatsContainer = document.getElementById('seatsContainer');
    const selectedSeatsList = document.getElementById('selectedSeatsList');
    const normalTicketCount = document.getElementById('normalTicketCount');
    const vipTicketCount = document.getElementById('vipTicketCount');
    const totalPrice = document.getElementById('totalPrice');
    const continueToPayment = document.getElementById('continueToPayment');

    // Pricing
    const PRICES = {
        normal: 80000,
        vip: 120000,
        serviceFee: 10000
    };

    // Selected seats state
    let selectedSeats = [];

    // Initialize
    generateSeatingMap();
    setupEventListeners();
    loadBookingData();

    function generateSeatingMap() {
        const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'K', 'L'];
        const seatsPerRow = 12;
        
        rows.forEach(row => {
            const seatRow = document.createElement('div');
            seatRow.className = 'seat-row';
            
            // Add row label
            const rowLabel = document.createElement('div');
            rowLabel.className = 'row-label';
            rowLabel.textContent = row;
            seatRow.appendChild(rowLabel);
            
            // Generate seats for this row
            for (let i = 1; i <= seatsPerRow; i++) {
                const seatNumber = `${row}${i.toString().padStart(2, '0')}`;
                
                // Add aisle after seat 6
                if (i === 7) {
                    const aisle = document.createElement('div');
                    aisle.className = 'aisle';
                    seatRow.appendChild(aisle);
                }
                
                const seat = document.createElement('div');
                seat.className = 'seat available';
                seat.textContent = i;
                seat.dataset.seatId = seatNumber;
                
                // Randomly assign some seats as occupied and VIP for demo
                if (Math.random() < 0.2) {
                    seat.classList.remove('available');
                    seat.classList.add('occupied');
                } else if (Math.random() < 0.3) {
                    seat.classList.add('vip');
                }
                
                seatRow.appendChild(seat);
            }
            
            seatsContainer.appendChild(seatRow);
        });
    }

    function setupEventListeners() {
        // Seat selection
        seatsContainer.addEventListener('click', function(e) {
            if (e.target.classList.contains('seat')) {
                handleSeatSelection(e.target);
            }
        });

        // Continue to payment
        continueToPayment.addEventListener('click', function() {
            if (selectedSeats.length === 0) {
                alert('Vui lòng chọn ít nhất một ghế để tiếp tục.');
                return;
            }
            
            // Save booking data to localStorage
            const bookingData = {
                movie: getMovieData(),
                seats: selectedSeats,
                total: calculateTotalPrice(),
                timestamp: new Date().toISOString()
            };
            
            localStorage.setItem('cinemax_booking', JSON.stringify(bookingData));
            
            // Redirect to payment page (in real app)
            alert('Chuyển hướng đến trang thanh toán...');
            console.log('Booking data:', bookingData);
        });

        // Combo buttons
        document.querySelectorAll('.btn-add-combo').forEach(btn => {
            btn.addEventListener('click', function() {
                const comboName = this.closest('.combo-item').querySelector('h4').textContent;
                alert(`Đã thêm ${comboName} vào đơn hàng!`);
            });
        });
    }

    function handleSeatSelection(seat) {
        if (seat.classList.contains('occupied')) {
            return; // Can't select occupied seats
        }

        const seatId = seat.dataset.seatId;
        const isVip = seat.classList.contains('vip');
        
        if (seat.classList.contains('selected')) {
            // Deselect seat
            seat.classList.remove('selected');
            selectedSeats = selectedSeats.filter(s => s.id !== seatId);
        } else {
            // Select seat
            seat.classList.add('selected');
            selectedSeats.push({
                id: seatId,
                type: isVip ? 'vip' : 'normal',
                price: isVip ? PRICES.vip : PRICES.normal
            });
        }
        
        updateBookingSummary();
    }

    function updateBookingSummary() {
        // Update selected seats list
        if (selectedSeats.length === 0) {
            selectedSeatsList.innerHTML = '<p class="no-seats">Chưa chọn ghế nào</p>';
        } else {
            selectedSeatsList.innerHTML = selectedSeats.map(seat => `
                <div class="seat-item">
                    <div class="seat-info">
                        <span>Ghế ${seat.id}</span>
                        <span class="seat-type">${seat.type === 'vip' ? 'VIP' : 'Thường'}</span>
                    </div>
                    <div class="seat-price">${formatPrice(seat.price)}đ</div>
                </div>
            `).join('');
        }

        // Update price breakdown
        const normalSeats = selectedSeats.filter(seat => seat.type === 'normal').length;
        const vipSeats = selectedSeats.filter(seat => seat.type === 'vip').length;
        
        normalTicketCount.textContent = `${normalSeats} x ${formatPrice(PRICES.normal)}đ`;
        vipTicketCount.textContent = `${vipSeats} x ${formatPrice(PRICES.vip)}đ`;

        // Update total price
        totalPrice.textContent = `${formatPrice(calculateTotalPrice())}đ`;
    }

    function calculateTotalPrice() {
        const seatTotal = selectedSeats.reduce((total, seat) => total + seat.price, 0);
        return seatTotal + PRICES.serviceFee;
    }

    function loadBookingData() {
        // Get movie data from URL parameters or localStorage
        const urlParams = new URLSearchParams(window.location.search);
        const movieId = urlParams.get('movie') || localStorage.getItem('selected_movie');
        
        if (movieId) {
            // In real app, this would fetch movie data from API
            const movieData = getMovieById(movieId);
            if (movieData) {
                updateMovieInfo(movieData);
            }
        }
    }

    function getMovieById(movieId) {
        // Sample movie data - in real app, this would come from API
        const movies = {
            '1': {
                title: 'Avengers: Endgame',
                poster: 'images/movies/avengers.jpg',
                rating: 'PG-13',
                duration: '181 phút',
                genre: 'Hành động, Phiêu lưu'
            },
            '2': {
                title: 'Spider-Man: No Way Home',
                poster: 'images/movies/spiderman.jpg',
                rating: 'PG-13',
                duration: '148 phút',
                genre: 'Hành động, Phiêu lưu'
            },
            '3': {
                title: 'The Batman',
                poster: 'images/movies/batman.jpg',
                rating: 'PG-13',
                duration: '176 phút',
                genre: 'Hành động, Tội phạm'
            }
        };
        
        return movies[movieId] || movies['1']; // Default to first movie
    }

    function updateMovieInfo(movieData) {
        document.getElementById('bookingMoviePoster').src = movieData.poster;
        document.getElementById('bookingMovieTitle').textContent = movieData.title;
        document.getElementById('bookingMovieRating').textContent = movieData.rating;
        document.getElementById('bookingMovieDuration').textContent = movieData.duration;
        document.getElementById('bookingMovieGenre').textContent = movieData.genre;
    }

    function getMovieData() {
        return {
            title: document.getElementById('bookingMovieTitle').textContent,
            poster: document.getElementById('bookingMoviePoster').src,
            cinema: document.getElementById('bookingCinema').textContent,
            showtime: document.getElementById('bookingShowtime').textContent,
            room: document.getElementById('bookingRoom').textContent
        };
    }

    function formatPrice(price) {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
});