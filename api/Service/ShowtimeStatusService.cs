using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using Microsoft.EntityFrameworkCore;

namespace api.Service
{
    public class ShowtimeStatusService
    {
        private readonly ApplicationDBContext _context;

        public ShowtimeStatusService(ApplicationDBContext context)
        {
            _context = context;
        }
        public async Task UpdateExpiredShowtime()
        {
            var expiredShowtime = await _context.ShowTimes.Where(s => s.EndTime < DateTime.Now && s.IsActive == true).ToListAsync();
            if (expiredShowtime.Count == 0)
            {
                return;
            }
            foreach (var showtime in expiredShowtime)
            {
                showtime.IsActive = false;
            }
            await _context.SaveChangesAsync();
        }
    }
}