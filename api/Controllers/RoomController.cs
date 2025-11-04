using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.Room;
using api.Interfaces;
using api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoomController : ControllerBase
    {
        private readonly IRoomRepository _room;
        private readonly ApplicationDBContext _context;
        public RoomController(IRoomRepository room, ApplicationDBContext context) {
            _room = room;
            _context = context;
        }
        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> CreateRoom(CreateRoomDto dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var room = await _room.CreateRoom(dto);
            return Ok(room);
        }
        [HttpGet("room")]
        public async Task<IActionResult> getRoom()
        {
            var room = await _room.GetRoomAsync();
            return Ok(room);
        }
        [HttpPost("custom")]
        public async Task<IActionResult> CreateCustomRoom([FromBody] CreateRoomWithSeatDto dto)
        {
            if (dto == null || dto.SeatData == null || dto.SeatData.Count == 0)
                return BadRequest("Dữ liệu phòng hoặc danh sách ghế không hợp lệ.");
            var room = new Room
            {
                Name = dto.Name,
                RoomType = dto.RoomType,
                RowCount = dto.RowCount,
                ColumnCount = dto.ColumnCount
            };
            _context.Rooms.Add(room);
            await _context.SaveChangesAsync();
            var seats = dto.SeatData.Select(s => new Seat
            {
                RoomId = room.Id,
                RowIndex = s.RowIndex,
                ColIndex = s.ColIndex,
                SeatCode = s.SeatCode,
                SeatType = s.SeatType
            }).ToList();
            _context.Seats.AddRange(seats);
            await _context.SaveChangesAsync();
            return Ok(new
            {
                Message = "Tạo phòng và sơ đồ ghế thành công",
                Room = room,
                TotalSeats = seats.Count
            });


        }

    }
}