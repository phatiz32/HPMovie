using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class Room
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string RoomType { get; set; } = "NORMAL";
        public int RowCount { get; set; }
        public int ColumnCount { get; set; }
        public List<Seat>? Seats { get; set; }
        
    }
}