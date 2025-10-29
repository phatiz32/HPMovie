using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.Booking;
using api.Dtos.Order;
using api.Interfaces;
using api.Models;
using api.Service;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
    public class BookingRepository : IBookingRepository
    {
        private readonly ApplicationDBContext _context;
        private readonly UserManager<AppUser> _userManager;
        private readonly IEmailServices _emailService;
        public BookingRepository(ApplicationDBContext context,UserManager<AppUser> userManager,IEmailServices emailServices)
        {
            _context = context;
            _userManager = userManager;
            _emailService = emailServices;
        }
        public async Task<BookingOrderResponseDto> CreateBookingOrderAsync(CreateBookingDto dto, string userId)
        {
            var showtime = await _context.ShowTimes.FirstOrDefaultAsync(s => s.Id == dto.ShowTimeId);
            if (showtime == null)
            {
                throw new Exception("Showtime not found");
            }
            var seats = await _context.Seats.Where(s => dto.SeatIds.Contains(s.id) && s.RoomId == showtime.RoomId).ToListAsync();
            if (seats.Count != dto.SeatIds.Count)
            {
                throw new Exception("Some seat not found");
            }
            var bookSeats = await _context.BookingDetails
                          .Where(
                            b => b.ShowTimeId == dto.ShowTimeId
                            && dto.SeatIds.Contains(b.SeatId)
                            &&(b.BookingOrder.Status =="HOLDING"||b.BookingOrder.Status=="PAID")
                          )
                          .Select(b=>b.Seat.SeatCode)
                          .ToListAsync();
            if (bookSeats.Any())
            {
                throw new Exception($"Seats already taken: {string.Join(", ", bookSeats)}");
            }
            var seatDetail = new List<BookingSeatDto>();
            long totalPrice = 0;
            foreach (var seat in seats)
            {
                long price = showtime.BaseTicketPrice;
                if (seat.SeatType == "VIP")
                {
                    price += 10000;
                }
                totalPrice += price;
                seatDetail.Add(new BookingSeatDto
                {
                    SeatCode = seat.SeatCode,
                    SeatId = seat.id,
                    Price = price,

                });
            }
            var order = new BookingOrder
            {
                UserId = userId,
                ShowTimeId = dto.ShowTimeId,
                TotalPrice = totalPrice,
                Status = "HOLDING",
                CreateAt = DateTime.Now,
                ExpireAt = DateTime.Now.AddMinutes(10)
            };
            await _context.BookingOrders.AddAsync(order);
            await _context.SaveChangesAsync();
            var detai = seatDetail.Select(s => new BookingDetail
            {
                BookingOrderId = order.Id,
                ShowTimeId = dto.ShowTimeId,
                SeatId = s.SeatId,
                Price = s.Price,
                CreateAt = DateTime.Now
            }).ToList();
            await _context.BookingDetails.AddRangeAsync(detai);
            await _context.SaveChangesAsync();
            return new BookingOrderResponseDto
            {
                OrderId = order.Id,
                TotalPrice = totalPrice,
                Status = order.Status,
                ExpireAt = order.ExpireAt,
                Seats = seatDetail
            };
            
        }

        public async Task<List<BookingHistoryDto>> GetBookingHistoryAsyn(string userId)
        {
            var Booking = await _context.BookingOrders.Include(b => b.showTime)
                                                       .ThenInclude(s => s.Movie)
                                                    .Include(b => b.showTime)
                                                       .ThenInclude(s => s.Room)
                                                    .Include(b => b.BookingDetails)
                                                       .ThenInclude(b => b.Seat)
                                                    .Include(b => b.BookingCombos)
                                                       .ThenInclude(c => c.Combo)
                                                    .Include(b => b.Payment)
                                                    .Where(b => b.UserId == userId)
                                                    .Select(b => new BookingHistoryDto
                                                    {
                                                        MovieTitle = b.showTime.Movie.Title,
                                                        StartTime = b.showTime.StartTime,
                                                        TotalAmount = b.TotalPrice,
                                                        Seats = b.BookingDetails.Select(s => s.Seat.SeatCode),
                                                        ComboName = b.BookingCombos.Select(s => s.Combo.Name),
                                                        PaidAt = b.Payment.PaidAt



                                                    }).ToListAsync();
            return Booking;
                                                    
                                                       
        }

        public async Task<OrderSummaryDto> GetOrderSummaryAsync(int OrderId)
        {
            var order = await _context.BookingOrders
                                     .Include(b => b.BookingDetails).ThenInclude(d => d.Seat)
                                     .Include(b => b.BookingCombos).ThenInclude(d => d.Combo)
                                     .FirstOrDefaultAsync(s => s.Id == OrderId);
            if (order == null)
            {
                throw new Exception("Booking not found");
            }
            long seatTotal = order.BookingDetails.Any()
                ? order.BookingDetails.Sum(d => d.Price)
                : 0;

            long comboTotal = order.BookingCombos.Any()
                ? order.BookingCombos.Sum(c => c.TotalPrice)
                : 0;
            long total = seatTotal + comboTotal;
            order.TotalPrice = total;
            await _context.SaveChangesAsync();
            return new OrderSummaryDto
            {
                OrderId = OrderId,
                Status = order.Status,
                TotalAmount = total,
                Seats = order.BookingDetails.Select(s => new SeatSummaryDto
                {
                    SeatCode = s.Seat.SeatCode,
                    Price = s.Price
                }).ToList(),
                Combos = order.BookingCombos.Select(c => new ComboSummaryDto
                {
                    ComboName = c.Combo.Name,
                    Quantity = c.Quantity,
                    TotalPrice = c.TotalPrice
                }).ToList()
            }; 
        }

        public async Task SendTicketEmailAsync(int BookingOrderId)
        {
            var booking = await _context.BookingOrders.Include(b => b.showTime)
                                                       .ThenInclude(s => s.Movie)
                                                    .Include(b => b.showTime)
                                                       .ThenInclude(s => s.Room)
                                                    .Include(b => b.BookingDetails)
                                                       .ThenInclude(b => b.Seat)
                                                    .Include(b => b.BookingCombos)
                                                       .ThenInclude(c => c.Combo)
                                                    .Include(b => b.Payment)
                                                    .FirstOrDefaultAsync(b => b.Id == BookingOrderId);
            if (booking == null)
            {
                throw new Exception("booking not found");
            }
            var qrContent = $"BookingId:{booking.Id}; Movie:{booking.showTime.Movie.Title}; Seats:{string.Join(",", booking.BookingDetails.Select(s => s.Seat.SeatCode))}; Time:{booking.showTime.StartTime:HH:mm dd/MM/yyyy}; Room:{booking.showTime.Room.Name}";
            var fileName = $"ticket_{booking.Id}";
            var qrPath = QrService.GenerateQrCode(qrContent, fileName);
            var user = await _userManager.FindByIdAsync(booking.UserId);
            if (user == null)
            {
                throw new Exception("user not found");
            }
            var body = $@"
            <h2>🎟 Vé xem phim của bạn</h2>
            <p>Phim: <b>{booking.showTime.Movie.Title}</b></p>
            <p>Phòng:<b>{booking.showTime.Room.Name}
            <p>Ghế: <b>{string.Join(", ", booking.BookingDetails.Select(s => s.Seat.SeatCode))}</b></p>
            <p>Thời gian: {booking.showTime.StartTime:HH:mm dd/MM/yyyy}</p>
            <p>Tổng tiền: {booking.TotalPrice:N0} VNĐ</p>
            <p>Quét mã QR dưới đây khi đến rạp:</p>
            <img src='cid:{{qrCid}}' alt='QR vé xem phim' width='200'/>
        ";
            await _emailService.SendEmailAsync(user.Email, "Vé xem phim của bạn", body,qrPath);
                                                    
        }
    }
}