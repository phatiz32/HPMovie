using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Order
{
    public class OrderSummaryDto
    {
        public int OrderId { get; set; }
        public string Status { get; set; }
        public List<SeatSummaryDto> Seats { get; set; }
        public List<ComboSummaryDto> Combos { get; set; }
        public long TotalAmount{ get; set; }
    }
}