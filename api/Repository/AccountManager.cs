using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.Account;
using api.Interfaces;
using api.Models;
using ClosedXML.Excel;
using DocumentFormat.OpenXml.Office2010.Excel;
using DocumentFormat.OpenXml.Office2016.Drawing.Command;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
    public class AccountManager : IAccountManager
    {
        private readonly ApplicationDBContext _context;
        private readonly UserManager<AppUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly ILogger<AccountManager> _logger;
        public AccountManager(ApplicationDBContext context, UserManager<AppUser> userManager,RoleManager<IdentityRole> roleManager,ILogger<AccountManager> logger)
        {
            _context = context;
            _userManager = userManager;
            _roleManager = roleManager;
            _logger = logger;
        }
        public async Task<AppUser> CreateStaffAsync(CreateStaffDto dto)
        {
            var existEmail = await _userManager.FindByEmailAsync(dto.Email);
            if (existEmail != null)
            {
                throw new Exception("Email is exist");
            }
            var existPhone = await _userManager.Users.AnyAsync(u => u.PhoneNumber == dto.PhoneNumber);
            if (existPhone)
            {
                throw new Exception("Phone is exist");
            }
            var user = new AppUser
            {
                FullName = dto.FullName,
                Email = dto.Email,
                UserName = dto.Email,
                PhoneNumber = dto.PhoneNumber,
                DateOfBirth = dto.DateOfBirth
            };
            var createUser = await _userManager.CreateAsync(user, dto.Password);
            var roleResult = await _userManager.AddToRoleAsync(user, "Staff");
            return user;
        }

        public async Task<bool> DeleteAccountAsync(string accountId)
        {
            var account = await _userManager.FindByIdAsync(accountId);
            if (account == null)
            {
                throw new Exception("Account not found");
            }
            await _userManager.DeleteAsync(account);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<List<object>> GetStaffAccount()
        {
            var staff = await _userManager.GetUsersInRoleAsync("Staff");
            var result = new List<object>();
            foreach(var user in staff)
            {
                var role = await _userManager.GetRolesAsync(user);
                result.Add(new
                {
                    user.FullName,
                    user.Email,
                    user.PhoneNumber,
                    user.Id,
                    Roles = role
                });
            }
            return result;
        }

        public async Task ImportCreateStaff(IFormFile formFile)
{
    if (formFile == null || formFile.Length == 0)
        throw new Exception("File not found");

    using (var stream = new MemoryStream())
    {
        await formFile.CopyToAsync(stream);
        using (var workbook = new XLWorkbook(stream))
        {
            var worksheet = workbook.Worksheet(1);
            var rows = worksheet.RowsUsed();

            foreach (var row in rows.Skip(1))
            {
                var fullName = row.Cell(1).GetValue<string>().Trim();
                var email = row.Cell(2).GetValue<string>().Trim();
                var phoneNumber = row.Cell(3).GetValue<string>().Trim();
                var dateText = row.Cell(4).GetString();
                DateTime? dateOfBirth = null;
                if (DateTime.TryParse(dateText, out var parsedDate))
                    dateOfBirth = parsedDate;

                var password = row.Cell(5).GetValue<string>().Trim();
                var existEmail = await _userManager.FindByEmailAsync(email);
                var existPhone = await _userManager.Users.AnyAsync(s => s.PhoneNumber == phoneNumber);
                if (existEmail != null || existPhone)
                {
                    _logger.LogWarning("Skipped existing user: {Email}", email);
                    continue;
                }

                var user = new AppUser
                {
                    FullName = fullName,
                    Email = email,
                    UserName = email, // ✅ Bắt buộc
                    PhoneNumber = phoneNumber,
                    DateOfBirth = dateOfBirth
                };

                var result = await _userManager.CreateAsync(user, password);
                if (!result.Succeeded)
                {
                    _logger.LogError("Failed to create {Email}: {Errors}", email,
                        string.Join(", ", result.Errors.Select(e => e.Description)));
                    continue;
                }
                await _userManager.AddToRoleAsync(user, "Staff");
                _logger.LogInformation("Created user {Email} with role {Role}", email, "Staff");
            }
        }
    }
}

    }
}