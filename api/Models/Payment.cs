using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class Payment
    {
        public int Id { get; set; }
        public string TransactionId { get; set; }
        public string PaymentGetway { get; set; }
        public long Amount { get; set; }
        public DateTime PaidAt { get; set; }
        public int BookingOrderId { get; set; }
        public BookingOrder BookingOrder { get; set; }

    }
}