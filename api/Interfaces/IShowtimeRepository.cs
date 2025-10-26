using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.ShowTime;
using api.Models;

namespace api.Interfaces
{
    public interface IShowtimeRepository
    {
        Task<ShowTime> CreateShowtime(CreateShowtimeDto dto);
        Task<bool> IsOverLappingAsync(int roomId, DateTime startTime, DateTime endTime);
        Task<List<ShowTime>> GetShowTimesAsync(DateTime date);
        Task<ShowTime> GetShowtimeByIdAsync(int id);
        Task<List<Seat>> GetSeatsByShowtimeIdAsync(int ShowTimeId);
    }
}