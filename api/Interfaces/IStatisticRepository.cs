using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Statistics;

namespace api.Interfaces
{
    public interface IStatisticRepository
    {
        Task<List<RevenueStatisticDto>> GetRevenueByDayAsync(DateTime startDate, DateTime endDate);
        Task<List<RevenueStatisticMonthDto>> GetRevenueByMonthAsync(int month);
    }
}