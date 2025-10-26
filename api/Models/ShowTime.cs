using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class ShowTime
    {
        public int Id { get; set; }
        public int MovieId { get; set; }
        public Movie? Movie { get; set; }
        public int RoomId { get; set; }
        public Room? Room { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public long BaseTicketPrice { get; set; }
        
        public bool IsActive { get; set; } = true;
    }
}