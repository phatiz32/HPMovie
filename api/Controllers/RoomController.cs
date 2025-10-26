using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Room;
using api.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoomController : ControllerBase
    {
        private readonly IRoomRepository _room;
        public RoomController(IRoomRepository room) {
            _room = room;
        }
        [HttpPost]
        [Authorize(Roles ="Admin")]
        public async Task<IActionResult> CreateRoom(CreateRoomDto dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var room = await _room.CreateRoom(dto);
            return Ok(room);
        }

    }
}