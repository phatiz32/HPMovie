using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class BookingDetail
    {
        public int Id { get; set; }
        public int BookingOrderId { get; set; }
        public BookingOrder? BookingOrder { get; set; }
        public int ShowTimeId { get; set; }
        public ShowTime? ShowTime { get; set; }
        public int SeatId { get; set; }
        public Seat? Seat { get; set; }
        public long Price { get; set; }
        public DateTime CreateAt { get; set; } = DateTime.Now;
        
    }
}