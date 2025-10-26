using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Room;
using api.Models;

namespace api.Mappers
{
    public static class RoomMapper
    {
        public static Room ToCreateRoom(this CreateRoomDto dto)
        {
            return new Room
            {
                Name = dto.Name,
                RowCount = dto.RowCount,
                ColumnCount = dto.ColCount,
                RoomType = dto.RoomType
            };
        }
    }
}