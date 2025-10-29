using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Booking
{
    public class BookingHistoryDto
    {
        public string MovieTitle { get; set; }
        public DateTime StartTime { get; set; }
        public string Room{ get; set; }
        public long TotalAmount { get; set; }
        public IEnumerable<string> Seats { get; set; }
        public IEnumerable<string> ComboName { get; set; }
        public DateTime PaidAt { get; set; }
    }
}