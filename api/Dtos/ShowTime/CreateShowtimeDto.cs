using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.ShowTime
{
    public class CreateShowtimeDto
    {
        [Required]
        public int MovieId { get; set; }
        [Required]
        public int RoomId { get; set; }
        [Required]
        public DateTime StartTime { get; set; }
        [Required]
        public long BaseTicketPrice { get; set; }
    }
}