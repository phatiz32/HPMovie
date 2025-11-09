using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Interfaces;
using api.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StatisticController:ControllerBase
    {
        private readonly IStatisticRepository _statistic;
        private readonly UserManager<AppUser> _userManager;
        public StatisticController(IStatisticRepository statistic, UserManager<AppUser> userManager)
        {
            _statistic = statistic;
            _userManager = userManager;
        }
        [HttpGet("by-day")]
        public async Task<IActionResult> GetByDay([FromQuery]DateTime startTime,[FromQuery] DateTime endTime)
        {
            var data = await _statistic.GetRevenueByDayAsync(startTime, endTime);
            return Ok(data);
        }
        [HttpGet("by-month")]
        public async Task<IActionResult> getByMonth([FromQuery]int Month)
        {
            var data = await _statistic.GetRevenueByMonthAsync(Month);
            return Ok(data);
        }
        [HttpGet("by-movie")]
        public async Task<IActionResult> GetRevenueByMovie([FromQuery] int year)
        {

            var data = await _statistic.GetRevenueStatisticMoviesAsync(year);
            return Ok(data);
        }
        [HttpGet("export-bydate")]
        public async Task<IActionResult> ExportByDate([FromQuery]DateTime startDate,[FromQuery] DateTime endDate)
        {
            var fileByte = await _statistic.ExportReveneuByDayAsync(startDate, endDate);
            var fileName = $"Revenue_{startDate}_{endDate}.xlsx";
            return File(fileByte, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", fileName);
        }
        [HttpGet("export-bymonth")]
        public async Task<IActionResult> ExportByMonth([FromQuery] int year)
        {
            var fileByte = await _statistic.ExportReveneuByMonthAsync(year);
            var fileName = $"Revenue_{year}.xlsx";
            return File(fileByte, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", fileName);
        }
        [HttpGet("export-bymovie")]
        public async Task<IActionResult> ExportByMovie([FromQuery] int year)
        {
            var fileByte = await _statistic.ExportRebeneuByMovie(year);
            var fileName = $"Revenue_Movie_{year}.xlsx";
            return File(fileByte, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", fileName);
        }
    }
}