using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Room
{
    public class SeatDto
    {
        public int RowIndex { get; set; }
        public int ColIndex { get; set; }
        public string SeatCode { get; set; } = null!;
        public string SeatType { get; set; } =null!;
    }
}