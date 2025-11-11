using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class BookingOrder
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public int ShowTimeId { get; set; }
        public ShowTime? showTime { get; set; }
        public long TotalPrice { get; set; }
        public string Status { get; set; } 
        public DateTime CreateAt { get; set; } = DateTime.Now;
        public DateTime ExpireAt { get; set; }
        public ICollection<BookingDetail> BookingDetails { get; set; } = new List<BookingDetail>();
        public ICollection<BookingCombo> BookingCombos { get; set; } = new List<BookingCombo>();
        public Payment? Payment { get; set; }
        public string? TransactionHash { get; set; }  // Hash giao dịch blockchain
        public string? WalletAddress { get; set; }    // Địa chỉ ví thanh toán
        public decimal? PaidAmount { get; set; }      // Số CET đã trả
        
    }
}