using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Service
{
    public class CryptoPaymentService : ICryptoPaymentService
    {
        private readonly ApplicationDBContext _context;
        private readonly IWeb3Service _web3Service;
        private readonly IConfiguration _configuration;
        private readonly ILogger<CryptoPaymentService> _logger;

        // Tỷ giá: 1 CET = 10,000 VND (bạn có thể thay đổi)
        private const decimal CET_TO_VND_RATE = 10000m;

        public CryptoPaymentService(
            ApplicationDBContext context,
            IWeb3Service web3Service,
            IConfiguration configuration,
            ILogger<CryptoPaymentService> logger)
        {
            _context = context;
            _web3Service = web3Service;
            _configuration = configuration;
            _logger = logger;
        }

        public decimal ConvertVNDToCET(long vndAmount)
        {
            return vndAmount / CET_TO_VND_RATE;
        }

        public long ConvertCETToVND(decimal cetAmount)
        {
            return (long)(cetAmount * CET_TO_VND_RATE);
        }

        public async Task<CryptoPaymentResponse> ProcessCryptoPaymentAsync(
            CryptoPaymentRequest request, 
            string userId)
        {
            using var transaction = await _context.Database.BeginTransactionAsync();
            
            try
            {
                _logger.LogInformation($"=== BẮT ĐẦU XỬ LÝ THANH TOÁN CRYPTO ===");
                _logger.LogInformation($"Order ID: {request.OrderId}");
                _logger.LogInformation($"TX Hash: {request.TxHash}");
                _logger.LogInformation($"User: {userId}");

                // 1. Lấy Order
                var order = await _context.BookingOrders
                    .Include(b => b.BookingDetails).ThenInclude(d => d.Seat)
                    .Include(b => b.BookingCombos).ThenInclude(c => c.Combo)
                    .FirstOrDefaultAsync(o => o.Id == request.OrderId);

                if (order == null)
                {
                    throw new Exception("Order không tồn tại");
                }

                // 2. Kiểm tra quyền sở hữu
                if (order.UserId != userId)
                {
                    throw new Exception("Order không thuộc về user này");
                }

                // 3. Kiểm tra trạng thái
                if (order.Status == "PAID")
                {
                    return new CryptoPaymentResponse
                    {
                        Success = false,
                        Message = "Order đã được thanh toán rồi",
                        OrderId = request.OrderId,
                        Status = order.Status
                    };
                }

                if (order.Status != "HOLDING")
                {
                    return new CryptoPaymentResponse
                    {
                        Success = false,
                        Message = $"Order không thể thanh toán (Status: {order.Status})",
                        OrderId = request.OrderId,
                        Status = order.Status
                    };
                }

                // 4. Kiểm tra hết hạn
                if (order.ExpireAt < DateTime.Now)
                {
                    order.Status = "EXPIRED";
                    await _context.SaveChangesAsync();
                    
                    return new CryptoPaymentResponse
                    {
                        Success = false,
                        Message = "Order đã hết hạn",
                        OrderId = request.OrderId,
                        Status = "EXPIRED"
                    };
                }

                // 5. Kiểm tra transaction đã được sử dụng chưa
                var existingPayment = await _context.BookingOrders
                    .AnyAsync(o => o.TransactionHash == request.TxHash && o.Status == "PAID");
                
                if (existingPayment)
                {
                    return new CryptoPaymentResponse
                    {
                        Success = false,
                        Message = "Transaction này đã được sử dụng",
                        OrderId = request.OrderId,
                        Status = order.Status
                    };
                }

                // 6. Xác minh transaction trên blockchain
                var merchantAddress = _configuration["Blockchain:MerchantAddress"];
                var expectedAmount = ConvertVNDToCET(order.TotalPrice);
                
                _logger.LogInformation($"Expected: {expectedAmount} CET (từ {order.TotalPrice} VND)");
                
                var (isValid, txDetails) = await _web3Service.VerifyTransactionAsync(
                    request.TxHash,
                    request.UserAddress,
                    merchantAddress,
                    expectedAmount
                );

                if (!isValid || txDetails == null)
                {
                    return new CryptoPaymentResponse
                    {
                        Success = false,
                        Message = "Transaction không hợp lệ hoặc chưa được confirm",
                        OrderId = request.OrderId,
                        Status = order.Status
                    };
                }

                // 7. Kiểm tra số tiền
                var paidAmountVND = ConvertCETToVND(txDetails.AmountInCET);
                if (paidAmountVND < order.TotalPrice)
                {
                    return new CryptoPaymentResponse
                    {
                        Success = false,
                        Message = $"Số tiền không đủ. Cần: {order.TotalPrice} VND, Đã trả: {paidAmountVND} VND",
                        OrderId = request.OrderId,
                        Status = order.Status
                    };
                }

                // 8. Cập nhật Order
                order.Status = "PAID";
                order.TransactionHash = request.TxHash;
                order.WalletAddress = request.UserAddress;
                order.PaidAmount = txDetails.AmountInCET;
                
                await _context.SaveChangesAsync();
                await transaction.CommitAsync();

                _logger.LogInformation($"✅ Thanh toán thành công! Order #{request.OrderId}");

                txDetails.TotalPriceInVND = order.TotalPrice;

                return new CryptoPaymentResponse
                {
                    Success = true,
                    Message = "Thanh toán thành công!",
                    OrderId = request.OrderId,
                    Status = "PAID",
                    TransactionDetails = txDetails
                };
            }
            catch (Exception ex)
            {
                await transaction.RollbackAsync();
                _logger.LogError($"❌ Lỗi: {ex.Message}");
                
                return new CryptoPaymentResponse
                {
                    Success = false,
                    Message = "Lỗi: " + ex.Message,
                    OrderId = request.OrderId,
                    Status = "ERROR"
                };
            }
        }
    }
}