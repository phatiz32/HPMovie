using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using api.Data;
using Microsoft.EntityFrameworkCore;

namespace api.Service
{
    public class BookingCleanupService : BackgroundService
    {
        private readonly IServiceProvider _serviceProvider;
        private readonly ILogger<BookingCleanupService> _logger;
        public BookingCleanupService(IServiceProvider serviceProvider, ILogger<BookingCleanupService> logger)
        {
            _serviceProvider = serviceProvider;
            _logger = logger;
        }
        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            _logger.LogInformation("Booking cleanup service started.");
            while (!stoppingToken.IsCancellationRequested)
            {
                try
                {
                    using (var scope = _serviceProvider.CreateScope())
                    {
                        var context = scope.ServiceProvider.GetRequiredService<ApplicationDBContext>();
                        var expiredOrder = await context.BookingOrders.Where(b => b.Status == "HOLDING" && b.ExpireAt < DateTime.Now).ToListAsync(stoppingToken);
                        if (expiredOrder.Any())
                        {
                            var expiredOrderIds = expiredOrder.Select(o => o.Id).ToList();
                            var expiredDetail = await context.BookingDetails.Where(d => expiredOrderIds.Contains(d.BookingOrderId)).ToListAsync(stoppingToken);
                            context.BookingDetails.RemoveRange(expiredDetail);
                            context.BookingOrders.RemoveRange(expiredOrder);
                            await context.SaveChangesAsync(stoppingToken);
                            _logger.LogInformation($"Released {expiredOrder.Count} expired bookings.");

                        }

                    }

                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Error occurred while cleaning expired bookings.");
                }
                await Task.Delay(TimeSpan.FromSeconds(30), stoppingToken);
            }
            _logger.LogInformation("Booking cleanup service stopped.");
        }
    }
}