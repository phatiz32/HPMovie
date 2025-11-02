using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Statistics
{
    public class RevenueStatisticDto
    {
        public DateTime Label { get; set; } 
        public decimal TotalRevenue { get; set; }
        public int TotalTickets { get; set; }
        
    }
}