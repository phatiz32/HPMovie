using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Interfaces;
using api.Models;
using api.Models.VNPay;
using api.Service.Momo;
using api.Service.VnPay;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PaymentController:ControllerBase
    {
        private readonly IVnPayService _vnPayService;
        private readonly IBookingRepository _bookingRepos;
        private readonly UserManager<AppUser> _userManager;
        private readonly IMomoService _momoService;
        private readonly ApplicationDBContext _context;
        public PaymentController(IVnPayService vnPayService, IBookingRepository bookingRepository, UserManager<AppUser> userManager, ApplicationDBContext context, IMomoService momoService)
        {
            _vnPayService = vnPayService;
            _bookingRepos = bookingRepository;
            _userManager = userManager;
            _context = context;
            _momoService = momoService;
        }
        [HttpPost("Create-momo")]
        [Authorize]
        public async Task<IActionResult> CreateMomoUrl([FromBody] int BookingOrderId)
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
            {
                return Unauthorized();
            }
            var order = await _bookingRepos.GetOrderSummaryAsync(BookingOrderId);
            var momoRequest = new OrderInfoModel
            {
                FullName = user.UserName,
                Amount = order.TotalAmount,
                OrderInfo = $"orderId{order.OrderId}"
            };
            var momoResponse = await _momoService.CreatePaymentAsync(momoRequest);
            return Ok(new
            {
                message = "Đơn hàng đã tạo thành công",
                paymentUrl = momoResponse.PayUrl,
                orderId = order.OrderId
            });

        }
        [HttpGet("momo-return")]
        public async Task<IActionResult> MomoReturn()
        {
            var response = _momoService.PaymentExecuteAsync(Request.Query);
            if (response == null || string.IsNullOrEmpty(response.OrderInfo))
                return BadRequest("Dữ liệu thanh toán không hợp lệ.");
            int orderId = 0;
            var parts = response.OrderInfo.Split(new[] { ' ', '+', ',' }, StringSplitOptions.RemoveEmptyEntries);
            foreach (var p in parts)
            {
                if (p.StartsWith("orderId"))
                {
                    int.TryParse(p.Replace("orderId", ""), out orderId);
                    break;
                }
            }
            if (orderId == 0)
                return BadRequest("Không tìm thấy mã đơn hàng trong orderInfo.");
            var booking = await _context.BookingOrders
            .Include(x => x.Payment)
            .FirstOrDefaultAsync(x => x.Id == orderId);
            if (booking == null)
                return NotFound("Không tìm thấy đơn đặt vé.");
            booking.Status = "Paid";
            var payment = new Payment
            {
                TransactionId = response.OrderId, // Momo orderId
                PaymentGetway = "MOMO",
                Amount = long.Parse(response.Amount),
                PaidAt = DateTime.UtcNow,
                BookingOrderId = booking.Id
            };
            _context.Payments.Add(payment);
            await _context.SaveChangesAsync();
            return Ok(new
            {
                message = "Thanh toán MOMO thành công",
                bookingId = booking.Id,
                paymentId = payment.Id
            });

        }
        [HttpPost("momo-notify")]
        public IActionResult MomoNotify([FromForm] IFormCollection form)
        {
            var queryDictionary = new Dictionary<string, Microsoft.Extensions.Primitives.StringValues>();
            foreach (var item in form)
            {
                queryDictionary[item.Key] = item.Value;
            }

            var queryCollection = new Microsoft.AspNetCore.Http.QueryCollection(queryDictionary);

            var response = _momoService.PaymentExecuteAsync(queryCollection);

            Console.WriteLine("===> MoMo Notify Called:");
            Console.WriteLine(JsonConvert.SerializeObject(response));

            return Ok(new { message = "Notify received", response.OrderId });
        }
        [HttpPost("vnpay-create")]
        [Authorize]
        public async Task<IActionResult> CreateVnPayUrl([FromBody] int BookingOrderId)
        {
            var order = await _bookingRepos.GetOrderSummaryAsync(BookingOrderId);
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
            {
                return Unauthorized();
            }
            var vnPayRequest = new PaymentInformationModel
            {
                Amount = (int)order.TotalAmount,
                OrderType = "billpayment",
                OrderDescription = $"orderId{order.OrderId}",
                Name = user.UserName

            };
            var paymentUrl = _vnPayService.CreatePaymentUrl(vnPayRequest, HttpContext);
            return Ok(paymentUrl);
        }
        [HttpGet("vnpay-return")]
        public async Task<IActionResult> VnPayCallBack()
        {
            try
            {
                var query = HttpContext.Request.Query;
                string vnp_ResponseCode = query["vnp_ResponseCode"];
                string vnp_Amount = query["vnp_Amount"];
                string vnp_TransactionNo = query["vnp_TransactionNo"];
                string vnp_OrderInfo = query["vnp_OrderInfo"];
                string vnp_TransactionStatus = query["vnp_TransactionStatus"];
                if (vnp_ResponseCode != "00" || vnp_TransactionStatus != "00")
                    return BadRequest("Payment failed");
                int orderId = 0;
                var parts = vnp_OrderInfo.Split(' ', StringSplitOptions.RemoveEmptyEntries);
                foreach (var p in parts)
                {
                    if (p.StartsWith("orderId"))
                    {
                        orderId = int.Parse(p.Replace("orderId", ""));
                        break;
                    }
                }
                Console.WriteLine($"OrderId parse được: {orderId}");
                var booking = await _context.BookingOrders
                    .Include(x => x.Payment)
                    .FirstOrDefaultAsync(x => x.Id == orderId);
                if (booking == null)
                    return NotFound("Booking order not found");
                booking.Status = "Paid";
                var payment = new Payment
                {
                    TransactionId = vnp_TransactionNo,
                    PaymentGetway = "VNPAY",
                    PaidAt = DateTime.Now,
                    Amount = long.Parse(vnp_Amount) / 100,
                    BookingOrderId = orderId
                };
                _context.Payments.Add(payment);
                await _context.SaveChangesAsync();
                return Ok("Payment Success");
                
            }catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}