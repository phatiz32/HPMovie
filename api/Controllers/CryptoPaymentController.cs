using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using api.Data;
using api.Models;
using api.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class CryptoPaymentController:ControllerBase
    {
        private readonly ICryptoPaymentService _cryptoPaymentService;
        private readonly ApplicationDBContext _context;
        private readonly IConfiguration _configuration;
        private readonly ILogger<CryptoPaymentController> _logger;
        private readonly UserManager<AppUser> _userManager;

        public CryptoPaymentController(
            ICryptoPaymentService cryptoPaymentService,
            ApplicationDBContext context,
            IConfiguration configuration,
            ILogger<CryptoPaymentController> logger,
            UserManager<AppUser> userManager)
        {
            _cryptoPaymentService = cryptoPaymentService;
            _context = context;
            _configuration = configuration;
            _logger = logger;
            _userManager = userManager;
        }
        [HttpPost("confirm")]
        public async Task<ActionResult<CryptoPaymentResponse>> ConfirmPayment(
            [FromBody] CryptoPaymentRequest request)
        {
            try
            {
                var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

                if (string.IsNullOrEmpty(userId))
                {
                    return Unauthorized(new { message = "User chưa đăng nhập" });
                }

                var result = await _cryptoPaymentService.ProcessCryptoPaymentAsync(request, userId);

                if (!result.Success)
                {
                    return BadRequest(result);
                }

                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error: {ex.Message}");
                return StatusCode(500, new CryptoPaymentResponse
                {
                    Success = false,
                    Message = "Lỗi server: " + ex.Message
                });
            }
        }
         [HttpGet("calculate/{orderId}")]
        public async Task<ActionResult> CalculateCryptoAmount(int orderId)
        {
            try
            {

                var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
                
                var order = await _context.BookingOrders
                    .Include(o => o.showTime).ThenInclude(s => s.Movie)
                    .Include(o => o.BookingDetails).ThenInclude(d => d.Seat)
                    .FirstOrDefaultAsync(o => o.Id == orderId&&o.UserId==userId);

                if (order == null)
                {
                    return NotFound(new { message = "Order không tồn tại" });
                }

                var cetAmount = _cryptoPaymentService.ConvertVNDToCET(order.TotalPrice);
                
                var seats = string.Join(", ", order.BookingDetails.Select(d => d.Seat.SeatCode));

                return Ok(new
                {
                    orderId = orderId,
                    movieTitle = order.showTime?.Movie?.Title ?? "Unknown",
                    showtime = order.showTime?.StartTime.ToString("dd/MM/yyyy HH:mm") ?? "Unknown",
                    seats = seats,
                    totalPriceVND = order.TotalPrice,
                    requiredCET = cetAmount,
                    exchangeRate = "1 CET = 10,000 VND",
                    merchantAddress = _configuration["Blockchain:MerchantAddress"],
                    expireAt = order.ExpireAt,
                    status = order.Status
                });
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error: {ex.Message}");
                return StatusCode(500, new { message = "Lỗi server" });
            }
        }
        
    }
}