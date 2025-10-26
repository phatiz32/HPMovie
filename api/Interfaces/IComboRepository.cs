using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Combo;
using api.Helpers;
using api.Models;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace api.Interfaces
{
    public interface IComboRepository
    {
        Task<Combo> CreateComboAsync(CreateComboDto dto);
        Task<PagedResult<Combo>> GetComboAsync(QueryObject query);
        Task<bool> AddComboToOrderAsync(int bookingOrderId, List<BookingComboDto> combos);
    }
}