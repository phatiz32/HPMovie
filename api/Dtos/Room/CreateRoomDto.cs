using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Room
{
    public class CreateRoomDto
    {
        public string Name { get; set; }
        public int RowCount { get; set; }
        public int ColCount { get; set; }
        public string RoomType { get; set; }="NORMAL";
    }
}