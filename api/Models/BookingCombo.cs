using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class BookingCombo
    {
        public int Id { get; set; }
        public int BookingOrderId { get; set; }
        public BookingOrder? BookingOrder { get; set; } 
        public int ComboId { get; set; }
        public Combo? Combo{ get; set; }
        public int Quantity { get; set; }
        public long TotalPrice { get; set; }
    }
}