using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class CryptoPaymentRequest
    {
        [Required]
        public string TxHash { get; set; }

        [Required]
        public string UserAddress { get; set; }

        [Required]
        public int OrderId { get; set; }

        [Required]
        public decimal Amount { get; set; }
    }
    public class CryptoPaymentResponse
    {
        public bool Success { get; set; }
        public string Message { get; set; }
        public int OrderId { get; set; }
        public string Status { get; set; }
        public TransactionDetails TransactionDetails { get; set; }
    }
    public class TransactionDetails
    {
        public string TxHash { get; set; }
        public bool Confirmed { get; set; }
        public string From { get; set; }
        public string To { get; set; }
        public decimal AmountInCET { get; set; }
        public long TotalPriceInVND { get; set; }
        public long BlockNumber { get; set; }
    }
}