using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Account;

namespace api.Interfaces
{
    public interface IAccountRepository
    {
        Task<bool> SendResetPasswordEmailAsync(ForgotPasswordDto forgotPasswordDto);
        Task<bool> ResetPasswordAsync(ResetPasswordDto resetPasswordDto);
        
        
    }
}