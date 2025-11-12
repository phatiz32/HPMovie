using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Account;
using api.Models;

namespace api.Interfaces
{
    public interface IAccountManager
    {
        Task<AppUser> CreateStaffAsync(CreateStaffDto dto);
        Task ImportCreateStaff(IFormFile formFile);
        Task<List<object>> GetStaffAccount();
        Task<bool> DeleteAccountAsync(string accountId);
    }
}