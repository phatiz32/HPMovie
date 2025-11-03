using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Statistics
{
    public class RevenueStatisticMonthDto
    {
        public string Label { get; set; } 
        public decimal TotalRevenue { get; set; }
        public int TotalTickets { get; set; }
    }
}