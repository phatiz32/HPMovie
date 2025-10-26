using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.Combo;
using api.Helpers;
using api.Interfaces;
using api.Mappers;
using api.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace api.Repository
{
    public class ComboRepository : IComboRepository
    {
        private readonly ApplicationDBContext _context;
        private readonly IWebHostEnvironment _env;
        public ComboRepository(ApplicationDBContext context,IWebHostEnvironment env)
        {
            _context = context;
            _env = env;
        }

        public async Task<bool> AddComboToOrderAsync(int bookingOrderId, List<BookingComboDto> combos)
        {
            var order = await _context.BookingOrders
                                      .Include(b => b.BookingCombos)
                                      .FirstOrDefaultAsync(b => b.Id == bookingOrderId);
            if (order == null)
            {
                throw new Exception("Booking order not found.");
            }
            _context.BookingCombos.RemoveRange(order.BookingCombos);
            var comboId = combos.Select(s => s.ComboId).ToList();
            var comboData = await _context.Combos.Where(s => comboId.Contains(s.Id)).ToListAsync();
            var newCombos = combos.Select(c =>
            {
                var combo = comboData.FirstOrDefault(x => x.Id == c.ComboId);
                if (combo == null)
                {
                    throw new Exception($"Combo ID {c.ComboId} not found.");
                }
                return new BookingCombo
                {
                    BookingOrderId = bookingOrderId,
                    ComboId = c.ComboId,
                    Quantity = c.Quantity,
                    TotalPrice = combo.Price * c.Quantity,
                };
            }).ToList();
            await _context.BookingCombos.AddRangeAsync(newCombos);
            order.TotalPrice += newCombos.Sum(x => x.TotalPrice);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<Combo> CreateComboAsync(CreateComboDto dto)
        {

            string imageUrl = null;
            if (dto.formFile != null && dto.formFile.Length > 0)
            {
                var upLoadPath = Path.Combine(_env.WebRootPath, "uploads");
                if (!Directory.Exists(upLoadPath))
                {
                    Directory.CreateDirectory(upLoadPath);
                }
                var fileName = Guid.NewGuid().ToString() + Path.GetExtension(dto.formFile.FileName);
                var filePath = Path.Combine(upLoadPath, fileName);
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await dto.formFile.CopyToAsync(stream);
                }
                imageUrl = $"/uploads/{fileName}";
            }
            var combo = dto.ToCombo(imageUrl);
            await _context.Combos.AddAsync(combo);
            await _context.SaveChangesAsync();
            return combo;
        }

        public async Task<PagedResult<Combo>> GetComboAsync(QueryObject query)
        {
            var comboQuery = _context.Combos.AsQueryable();
            var totalItems = await comboQuery.CountAsync();
            var items = await comboQuery
                              .Skip((query.PageNumber - 1) * query.Pagesize)
                              .Take(query.Pagesize).ToListAsync();
            return new PagedResult<Combo>
            {
                Items = items,
                ToTalItems = totalItems,
                PageNumber = query.PageNumber,
                PageSize = query.Pagesize
            };
        }
    }
}