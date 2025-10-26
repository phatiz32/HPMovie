using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class OrderInfoModel
    {
         public string FullName { get; set; }      // Tên người đặt hàng (để ghi mô tả thanh toán)
        public decimal Amount { get; set; }        // Tổng tiền đơn hàng
        public string OrderInfo { get; set; }     // Nội dung thanh toán hiển thị
        public string OrderId { get; set; } 
    }
}