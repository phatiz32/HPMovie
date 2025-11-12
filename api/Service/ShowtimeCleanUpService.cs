using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Interfaces;

namespace api.Service
{
    public class ShowtimeCleanUpService : BackgroundService
    {
        private readonly IServiceScopeFactory _scopeFactory;

        public ShowtimeCleanUpService(IServiceScopeFactory scopeFactory)
        {
            _scopeFactory = scopeFactory;
        }
        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                using (var scope = _scopeFactory.CreateScope())
                {
                    var showtimeStatusService = scope.ServiceProvider.GetRequiredService<ShowtimeStatusService>();
                    await showtimeStatusService.UpdateExpiredShowtime();
                }
                await Task.Delay(TimeSpan.FromMinutes(1), stoppingToken);
            }
        }
    }
}