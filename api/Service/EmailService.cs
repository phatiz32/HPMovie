using System;
using System.Collections.Generic;
using System.Linq;
// using System.Net.Mail;
using System.Threading.Tasks;
using api.Interfaces;
using api.Models;
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Options;
using MimeKit;
using MimeKit.Utils;

namespace api.Service
{
    public class EmailService : IEmailServices
    {
        private readonly EmailSettings _emailSettings;
        public EmailService(IOptions<EmailSettings> options)
        {
            _emailSettings = options.Value;
        }
        public async Task<bool> SendEmailAsync(string toEmail, string subject, string body,string? imagePath=null)
        {
            var email = new MimeMessage();
            email.Sender = MailboxAddress.Parse(_emailSettings.SenderEmail);
            email.To.Add(MailboxAddress.Parse(toEmail));
            email.Subject = subject;
            var builder = new BodyBuilder();
            if (!string.IsNullOrEmpty(imagePath))
            {
                var image = builder.LinkedResources.Add(imagePath);
                image.ContentId = MimeUtils.GenerateMessageId();
                builder.HtmlBody = body.Replace("{qrCid}", image.ContentId);
            }
            else
            {
                builder.HtmlBody = body;
            }
            email.Body = builder.ToMessageBody();
            using var smtp = new SmtpClient();
            //connect to smtp
            await smtp.ConnectAsync(_emailSettings.SmtpServer, _emailSettings.Port, SecureSocketOptions.StartTls);
            //login smtp
            await smtp.AuthenticateAsync(_emailSettings.SenderEmail, _emailSettings.Password);
            //send email
            await smtp.SendAsync(email);
            return true;
        }
    }
}