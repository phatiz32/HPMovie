using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.Account;
using api.Interfaces;
using api.Models;
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
        public AccountManager(ApplicationDBContext context, UserManager<AppUser> userManager)
        {
            _context = context;
            _userManager = userManager;
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
    }
}