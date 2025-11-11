using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.Room;
using api.Interfaces;
using api.Mappers;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
    public class RoomRepository : IRoomRepository
    {
        private readonly ApplicationDBContext _context;
        public RoomRepository(ApplicationDBContext context)
        {
            _context = context;
        }
        public async Task<Room> CreateRoom(CreateRoomDto dto)
        {
            var existingRoom = _context.Rooms.FirstOrDefault(r => r.Name == dto.Name);
            if (existingRoom != null)
            {
                throw new Exception("Room with the same name already exists.");
            }
            var room = dto.ToCreateRoom();
            await _context.Rooms.AddAsync(room);
            await _context.SaveChangesAsync();
            var seats = GenerateSeats(room);
            await _context.Seats.AddRangeAsync(seats);
            await _context.SaveChangesAsync();
            return room;
        }

        public async Task DeleteRoomAsyn(int roomid)
        {
            var room = await _context.Rooms.Include(r => r.Seats).FirstOrDefaultAsync(r => r.Id == roomid);
            if (room == null)
            {
                throw new Exception("Room not found");
            }
            bool checkShowtime = await _context.ShowTimes.AnyAsync(s => s.RoomId == roomid && s.StartTime >= DateTime.Now);
            if (checkShowtime)
            {
                throw new Exception("Cannot delete room because it is used in upcoming showtimes.");
            }
            _context.Seats.RemoveRange(room.Seats);
            _context.Rooms.Remove(room);
            await _context.SaveChangesAsync();

        }

        public async Task<List<GetRoomDto>> GetRoomAsync()
        {
            return await _context.Rooms.Select(s => new GetRoomDto
            {
                Id = s.Id,
                Name = s.Name
            }).ToListAsync();
        }

        private List<Seat> GenerateSeats(Room room)
        {
            List<Seat> seats = new List<Seat>();
            for (int i = 1; i <= room.RowCount; i++)
            {
                for (int j = 1; j <= room.ColumnCount; j++)
                {
                    string seatCode = $"{(char)('A' + i - 1)}{j}";
                    string seatType = i <= 3 ? "NORMAL" : "VIP";
                    seats.Add(new Seat
                    {
                        RoomId = room.Id,
                        RowIndex = i,
                        ColIndex = j,
                        SeatCode = seatCode,
                        SeatType = seatType,
                        IsAvailable = true,
                    });
                }
            }
            return seats;
        }
    }
}