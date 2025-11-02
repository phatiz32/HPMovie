using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.Statistics;
using api.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
    public class StatisticRepository:IStatisticRepository
    {
        private readonly ApplicationDBContext _context;
        public StatisticRepository(ApplicationDBContext context)
        {
            _context = context;
        }
        public async Task<List<RevenueStatisticDto>> GetRevenueByDayAsync(DateTime startDate, DateTime endDate)
        {
            var totalRevenue = await _context.Payments
                                            .Where(p => p.PaidAt >= startDate && p.PaidAt <= endDate)
                                            .GroupBy(p => p.PaidAt.Date)
                                            .Select(g => new RevenueStatisticDto
                                            {
                                                Label = g.Key,
                                                TotalRevenue = g.Sum(x => x.Amount),
                                                TotalTickets = 0

                                            }).OrderBy(g => g.Label).ToListAsync();
            var totalTicket = await _context.BookingDetails
                                           .Where(bd => bd.BookingOrder.Payment != null &&
                                                  bd.BookingOrder.Payment.PaidAt >= startDate &&
                                                  bd.BookingOrder.Payment.PaidAt <= endDate)
                                           .GroupBy(bd => bd.BookingOrder.Payment.PaidAt.Date)
                                           .Select(g => new
                                           {
                                               Date = g.Key,
                                               totalTicket = g.Count()
                                           }).ToListAsync();
            foreach (var ticket in totalTicket)
            {
                var revenue = totalRevenue.FirstOrDefault(r => r.Label == ticket.Date);
                if (revenue != null)
                {
                    revenue.TotalTickets = ticket.totalTicket;
                }
            }
            return totalRevenue;
        }

        public async Task<List<RevenueStatisticMonthDto>> GetRevenueByMonthAsync(int month)
        {
            var totalRevenue = await _context.Payments.Where(p => p.PaidAt.Month == month)
                                                     .GroupBy(p => p.PaidAt.Month)
                                                     .Select(g => new RevenueStatisticMonthDto
                                                     {
                                                         Label = g.Key,
                                                         TotalRevenue = g.Sum(x => x.Amount),
                                                         TotalTickets = 0
                                                     }).OrderBy(g => g.Label).ToListAsync();
            var totalTicket = await _context.BookingDetails
                                           .Where(b => b.BookingOrder.Payment != null && b.BookingOrder.Payment.PaidAt.Month == month)
                                           .GroupBy(b => b.BookingOrder.Payment.PaidAt.Month)
                                           .Select(g => new
                                           {
                                               Date = g.Key,
                                               totalTicket = g.Count()
                                           }).ToListAsync();
            foreach (var ticket in totalTicket)
            {
                var revenue =  totalRevenue.FirstOrDefault(t => t.Label == ticket.Date);
                if (revenue != null)
                {
                    revenue.TotalTickets = ticket.totalTicket;
                }
            }
            return totalRevenue;
            

        }
    }
}