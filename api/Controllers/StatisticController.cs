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
        public async Task<IActionResult> GetByDay(DateTime startTime, DateTime endTime)
        {
            var data = await _statistic.GetRevenueByDayAsync(startTime, endTime);
            return Ok(data);
        }
        [HttpGet("by-month")]
        public async Task<IActionResult> getByMonth(int Month)
        {
            var data = await _statistic.GetRevenueByMonthAsync(Month);
            return Ok(data);
        }
    }
}