using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.Statistics;
using api.Interfaces;
using ClosedXML.Excel;
using DocumentFormat.OpenXml.Office2016.Drawing.Command;
using DocumentFormat.OpenXml.Spreadsheet;
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

        public async Task<byte[]> ExportRebeneuByMovie(int year)
        {
            var data = await GetRevenueStatisticMoviesAsync(year);
             using (var workbook = new XLWorkbook())
            {
                var worksheet = workbook.AddWorksheet("Revenue By Movie");
                worksheet.Cell(1, 1).Value = "MovieId";
                worksheet.Cell(1, 2).Value = "Movie Title";
                worksheet.Cell(1, 3).Value = "Total Revenue";
                worksheet.Cell(1, 4).Value = "Total Ticket";

                var headerRange = worksheet.Range("A1:D1");
                headerRange.Style.Font.Bold = true;
                headerRange.Style.Fill.BackgroundColor = XLColor.LightGray;

                int row = 2;
                foreach (var item in data)
                {
                    worksheet.Cell(row, 1).Value = item.MovieId;
                    worksheet.Cell(row, 2).Value = item.MovieTitle;
                    worksheet.Cell(row, 3).Value = item.TotalRevenue;
                    worksheet.Cell(row, 4).Value = item.TotalTickets;
                    row++;
                }
                worksheet.Columns().AdjustToContents();
                using(var stream = new MemoryStream())
                {
                    workbook.SaveAs(stream);
                    return stream.ToArray();

                }
            }

        }

        public async Task<byte[]> ExportReveneuByDayAsync(DateTime startDate, DateTime endDate)
        {
            var data = await GetRevenueByDayAsync(startDate, endDate);
            using (var workbook = new XLWorkbook())
            {
                var worksheet = workbook.AddWorksheet("Revenue By Date");
                worksheet.Cell(1, 1).Value = "Date";
                worksheet.Cell(1, 2).Value = "Total Revenue";
                worksheet.Cell(1, 3).Value = "Total Ticket";

                var headerRange = worksheet.Range("A1:D1");
                headerRange.Style.Font.Bold = true;
                headerRange.Style.Fill.BackgroundColor = XLColor.LightGray;

                int row = 2;
                foreach (var item in data)
                {
                    worksheet.Cell(row, 1).Value = item.Label;
                    worksheet.Cell(row, 2).Value = item.TotalRevenue;
                    worksheet.Cell(row, 3).Value = item.TotalTickets;
                    row++;
                }
                worksheet.Columns().AdjustToContents();
                using(var stream = new MemoryStream())
                {
                    workbook.SaveAs(stream);
                    return stream.ToArray();

                }
            }
            
        }

        public async Task<byte[]> ExportReveneuByMonthAsync(int year)
        {
            var data = await GetRevenueByMonthAsync(year);
            using (var workbook = new XLWorkbook())
            {
                var worksheet = workbook.AddWorksheet("Revenue By Month");
                worksheet.Cell(1, 1).Value = "Date";
                worksheet.Cell(1, 2).Value = "Total Revenue";
                worksheet.Cell(1, 3).Value = "Total Ticket";

                var headerRange = worksheet.Range("A1:D1");
                headerRange.Style.Font.Bold = true;
                headerRange.Style.Fill.BackgroundColor = XLColor.LightGray;

                int row = 2;
                foreach (var item in data)
                {
                    worksheet.Cell(row, 1).Value = item.Label;
                    worksheet.Cell(row, 2).Value = item.TotalRevenue;
                    worksheet.Cell(row, 3).Value = item.TotalTickets;
                    row++;
                }
                worksheet.Columns().AdjustToContents();
                using (var stream = new MemoryStream())
                {
                    workbook.SaveAs(stream);
                    return stream.ToArray();

                }
            }
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

        public async Task<List<RevenueStatisticMonthDto>> GetRevenueByMonthAsync(int year)
        {
            var totalRevenue = await _context.Payments
                                            .Where(p => p.PaidAt.Year == year)
                                            .GroupBy(p => new { p.PaidAt.Year, p.PaidAt.Month })
                                            .Select(g => new
                                            {
                                                g.Key.Year,
                                                g.Key.Month,
                                                TotalRevenue = g.Sum(x => x.Amount)
                                            })
                                            .OrderBy(g => g.Year).ThenBy(g => g.Month)
                                            .ToListAsync();

            var revenueDtos = totalRevenue.Select(g => new RevenueStatisticMonthDto
            {
                Label = $"{g.Month}/{g.Year}",
                TotalRevenue = g.TotalRevenue,
                TotalTickets = 0
            }).ToList();

            var totalTicket = await _context.BookingDetails
                .Where(b => b.BookingOrder.Payment != null && b.BookingOrder.Payment.PaidAt.Year == year)
                .GroupBy(b => new { b.BookingOrder.Payment.PaidAt.Year, b.BookingOrder.Payment.PaidAt.Month })
                .Select(g => new
                {
                    g.Key.Year,
                    g.Key.Month,
                    TotalTicket = g.Count()
                })
                .ToListAsync();

           
            foreach (var ticket in totalTicket)
            {
                var revenue = revenueDtos.FirstOrDefault(t => t.Label == $"{ticket.Month}/{ticket.Year}");
                if (revenue != null)
                {
                    revenue.TotalTickets = ticket.TotalTicket;
                }
            }

            return revenueDtos;

        }

        public async Task<List<RevenueStatisticMovieDto>> GetRevenueStatisticMoviesAsync(int year)
        {
            var query = await _context.BookingDetails
                        .Where(b => b.BookingOrder.Payment != null &&
                                    b.BookingOrder.Payment.PaidAt.Year == year)
                        .GroupBy(b => new
                        {
                            b.ShowTime.Movie.Id,
                            b.ShowTime.Movie.Title
                        })
                        .Select(g => new RevenueStatisticMovieDto
                        {
                            MovieId = g.Key.Id,
                            MovieTitle = g.Key.Title,
                            TotalRevenue = g.Sum(x => x.Price),
                            TotalTickets = g.Count()
                        })
                        .OrderByDescending(g => g.TotalRevenue)
                        .ToListAsync();

            return query;
        }
        
    }
}