using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Room;
using api.Models;

namespace api.Interfaces
{
    public interface IRoomRepository
    {
        Task<Room> CreateRoom(CreateRoomDto dto);
        Task<List<GetRoomDto>> GetRoomAsync();
    }
}