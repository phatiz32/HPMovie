using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Interfaces
{
    public interface IEmailServices
    {
        Task<bool> SendEmailAsync(String toEmail, String subject, string body,string? imagePath=null);
    }
}