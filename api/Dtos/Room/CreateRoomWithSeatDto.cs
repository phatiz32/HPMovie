using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Room
{
    public class CreateRoomWithSeatDto
    {
        public string Name { get; set; } = null!;
        public string RoomType { get; set; } = "NORMAL";
        public int RowCount { get; set; }
        public int ColumnCount { get; set; }

        public List<SeatDtos> SeatData { get; set; } = new List<SeatDtos>();
    }
    public class SeatDtos
    {
        public int RowIndex { get; set; }
        public int ColIndex { get; set; }
        public string SeatCode { get; set; } = null!;
        public string SeatType { get; set; } =null!;
    }
}