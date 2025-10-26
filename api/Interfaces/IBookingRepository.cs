using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Booking;
using api.Dtos.Order;

namespace api.Interfaces
{
    public interface IBookingRepository
    {
        Task<BookingOrderResponseDto> CreateBookingOrderAsync(CreateBookingDto dto, string userId);
        Task<OrderSummaryDto> GetOrderSummaryAsync(int OrderId);
    }
}