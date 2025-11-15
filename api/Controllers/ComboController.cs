using System;
using System.Collections.Generic;
using System.Formats.Asn1;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Booking;
using api.Dtos.Combo;
using api.Helpers;
using api.Interfaces;
using api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ComboController:ControllerBase
    {
        private readonly IComboRepository _combo;
        public ComboController(IComboRepository combo)
        {
            _combo = combo;
        }
        [HttpPost]
        [Authorize]
        public async Task<IActionResult> CreateComboAsync(CreateComboDto dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var createcombo = await _combo.CreateComboAsync(dto);
            return Ok(createcombo);
        }
        [HttpGet]
        public async Task<IActionResult> GetComBo([FromQuery] QueryObject query)
        {
            var combo = await _combo.GetComboAsync(query);
            if (combo == null)
            {
                return NotFound();
            }
            return Ok(combo);
        }
        [HttpPost("AddToOrder")]
        public async Task<IActionResult> AddComboToOrder(int bookingOrderId,[FromBody] List<BookingComboDto> combos){
            try
            {
                await _combo.AddComboToOrderAsync(bookingOrderId, combos);
                return Ok();
            }catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        [HttpPut("{comboId}")]
        public async Task<IActionResult> UpdateStatusAsync(int comboId,[FromForm] bool status)
        {
            try
            {
                await _combo.UpdateStatusAsync(comboId,status);
                return Ok("update successful");
                
            }catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}