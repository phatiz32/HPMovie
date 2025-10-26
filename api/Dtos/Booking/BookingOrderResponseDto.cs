using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Booking
{
    public class BookingOrderResponseDto
    {
        public int OrderId { get; set; }
        public long TotalPrice { get; set; }
        public string Status { get; set; } = string.Empty;
        public DateTime ExpireAt { get; set; }
        public List<BookingSeatDto> Seats { get; set; } = new List<BookingSeatDto>();

    }
     public class BookingSeatDto
        {
            public int SeatId { get; set; }
            public string? SeatCode { get; set; }
            public long Price { get; set; }
        }
}