using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.ShowTime;
using api.Models;

namespace api.Mappers
{
    public static class ShowtimeMappers
    {
        public static ShowTime ToCreateShowtime(this CreateShowtimeDto dto,int movieDuration)
        {
            return new ShowTime
            {
                MovieId = dto.MovieId,
                RoomId = dto.RoomId,
                StartTime = dto.StartTime,
                EndTime = dto.StartTime.AddMinutes(movieDuration),
                BaseTicketPrice = dto.BaseTicketPrice
            };
        }
    }
}