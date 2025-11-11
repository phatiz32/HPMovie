using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.ShowTime;
using api.Interfaces;
using api.Mappers;
using api.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;

namespace api.Repository
{
    public class ShowtimeRepository : IShowtimeRepository
    {
        private readonly ApplicationDBContext _context;
        public ShowtimeRepository(ApplicationDBContext context)
        {
            _context = context;
        }
        public async Task<ShowTime> CreateShowtime(CreateShowtimeDto dto)
        {
            var movie = await _context.Movies.FirstOrDefaultAsync(m => m.Id == dto.MovieId);
            if (movie == null)
            {
                throw new Exception("Movie not found.");
            }
            var room = await _context.Rooms.FirstOrDefaultAsync(r => r.Id == dto.RoomId);
            if (room == null)
            {
                throw new Exception("Room not found.");
            }
            if (dto.StartTime < DateTime.Now)
            {
                throw new Exception("Start time must larger than to day");
            }
            var endTime = dto.StartTime.AddMinutes(movie.Duration);
            var isOverLap = await IsOverLappingAsync(dto.RoomId, dto.StartTime, endTime);
            if (isOverLap == true)
            {
                throw new Exception("Existing showtime");
            }
            var showtime = dto.ToCreateShowtime(movie.Duration);
            await _context.ShowTimes.AddAsync(showtime);
            await _context.SaveChangesAsync();
            return showtime;
        }

        public async Task<List<Seat>> GetSeatsByShowtimeIdAsync(int ShowTimeId)
        {
            var seat = await _context.ShowTimes
                                    .Include(s => s.Room)
                                    .ThenInclude(r => r.Seats)
                                    .FirstOrDefaultAsync(s => s.Id == ShowTimeId);
            if (seat == null)
            {
                throw new Exception("Showtime not found.");
            }
            return seat.Room!.Seats!.OrderBy(s => s.RowIndex).ThenBy(s => s.ColIndex).ToList();

        }

        public async Task<ShowTime> GetShowtimeByIdAsync(int id)
        {
            var showtime = await _context.ShowTimes
                                        .Include(s => s.Movie)
                                        .Include(s => s.Room)
                                        .FirstOrDefaultAsync(s => s.Id == id && s.IsActive);
            if (showtime == null)
            {
                throw new Exception("Showtime not found.");
            }
            return showtime;
        }

        public async Task<List<ShowTime>> GetShowTimesAsync(DateTime date)
        {
            var now = DateTime.Now;
            var start = date.Date;
            var end = start.AddDays(1);
            var query = _context.ShowTimes
                                .Include(s => s.Movie)
                                .Where(s => s.IsActive && s.StartTime >= start && s.StartTime < end);
            if (date.Date == now.Date)
            {
                query = query.Where(s => s.StartTime >= now);
            }
            if (date.Date < now.Date)
            {
                return new List<ShowTime>();
            }
            return await query.OrderBy(s=>s.StartTime).ToListAsync();
            
        }

        public async Task<bool> IsOverLappingAsync(int roomId, DateTime startTime, DateTime endTime)
        {
             return await _context.ShowTimes.AnyAsync(
                s=>s.RoomId==roomId&&(
                    startTime>=s.StartTime && startTime<s.EndTime||
                    endTime>s.StartTime&& endTime<=s.EndTime||
                    startTime<=s.StartTime&& endTime>=s.EndTime
                )
            );
        }
    }
}