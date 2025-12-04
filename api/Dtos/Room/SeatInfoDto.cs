using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Room
{
    public class SeatInfoDto
    {
         public int ShowTimeId { get; set; }
        public string MovieTitle { get; set; } = "";
        public DateTime StartTime { get; set; }
        public string RoomName { get; set; } = "";
        public int RowCount { get; set; }
        public int ColumnCount { get; set; }
        public List<Seatdt> Seats { get; set; } = new List<Seatdt>();

    }
    public class Seatdt
        {
            public int Id { get; set; }
            public string SeatCode { get; set; } = "";
            public int RowIndex { get; set; }
            public int ColIndex { get; set; }
            public string SeatType { get; set; } = "";
            public bool IsAvailable { get; set; }
        }
}