using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class Seat
    {
        public int id { get; set; }
        public int RoomId { get; set; }
        public Room? Room { get; set; }
        public int RowIndex { get; set; }
        public int ColIndex { get; set; }
        public string SeatCode { get; set; } = null!;
        public string SeatType { get; set; } = "NORMAL";
        public bool IsAvailable { get; set; } = true;
        
    }
}