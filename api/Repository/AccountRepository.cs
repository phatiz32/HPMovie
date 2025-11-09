using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Account;
using api.Interfaces;
using api.Models;
using Microsoft.AspNetCore.Identity;

namespace api.Repository
{
    public class AccountRepository : IAccountRepository
    {
        private readonly IEmailServices _emailServices;
        private readonly UserManager<AppUser> _userManager;
        public AccountRepository(IEmailServices emailServices, UserManager<AppUser> userManager)
        {
            _emailServices = emailServices;
            _userManager = userManager;
        }
        public async Task<bool> ResetPasswordAsync(ResetPasswordDto resetPasswordDto)
        {
            var user = await _userManager.FindByEmailAsync(resetPasswordDto.Email);
            if (user == null) return false;
            var result = await _userManager.ResetPasswordAsync(user, resetPasswordDto.Token, resetPasswordDto.NewPassword);
            return result.Succeeded;
        }

        public async Task<bool> SendResetPasswordEmailAsync(ForgotPasswordDto forgotPasswordDto)
        {
            var user = await _userManager.FindByEmailAsync(forgotPasswordDto.Email);
            if (user == null) return false;
            var token = await _userManager.GeneratePasswordResetTokenAsync(user);
           var resetLink = $"http://127.0.0.1:5500/DOAN4/VIEW/reset-password.html?email={Uri.EscapeDataString(user.Email)}&token={Uri.EscapeDataString(token)}";

            var body = $@"
                <h2>Yêu cầu đặt lại mật khẩu</h2>
                <p>Nhấn vào liên kết bên dưới để đặt lại mật khẩu:</p>
                <a href='{resetLink}'>Đặt lại mật khẩu</a>
                <br/><br/>
                <p><strong>Token:</strong></p>
                <br/>
            ";
            await _emailServices.SendEmailAsync(user.Email, "Đặt lại mật khẩu HPCinema", body);
            return true;
        }
    }
}