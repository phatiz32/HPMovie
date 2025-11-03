using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Statistics
{
    public class RevenueStatisticMovieDto
    {
        public int MovieId { get; set; }
        public string MovieTitle { get; set; }
        public long TotalRevenue { get; set; }
        public int TotalTickets { get; set; }
    }
}