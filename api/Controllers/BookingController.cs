using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.Booking;
using api.Interfaces;
using api.Models;
using api.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookingController : ControllerBase
    {
        private readonly IBookingRepository _booking;
        private readonly UserManager<AppUser> _userManager;
        public BookingController(IBookingRepository booking, UserManager<AppUser> userManager)
        {
            _booking = booking;
            _userManager = userManager;
        }
        [HttpPost("create-order")]
        [Authorize]
        public async Task<IActionResult> CreateBooking(CreateBookingDto dto)
        {
            try
            {
                var user = await _userManager.GetUserAsync(User);
                if (user == null)
                {
                    return Unauthorized();
                }
                var result = await _booking.CreateBookingOrderAsync(dto, user.Id);
                return Ok(result);

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("summary/{orderId}")]
        public async Task<IActionResult> GetOrderSummary(int orderId)
        {
            try
            {
                var order = await _booking.GetOrderSummaryAsync(orderId);
                return Ok(order);

            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        [HttpGet("history")]
        [Authorize]
        public async Task<IActionResult> GetHistoryBooking()
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
            {
                return Unauthorized();
            }
            var booking = await _booking.GetBookingHistoryAsyn(user.Id);
            return Ok(booking);
        }
       
    }
    
}