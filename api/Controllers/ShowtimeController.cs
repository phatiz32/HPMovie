using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.ShowTime;
using api.Helpers;
using api.Interfaces;
using api.Mappers;
using api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Nethereum.Contracts.Standards.ENS.Registrar.ContractDefinition;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShowtimeController : ControllerBase
    {
        private readonly IShowtimeRepository _showtime;
        public ShowtimeController(IShowtimeRepository showtime)
        {
            _showtime = showtime;
        }
        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> CreateShowtime(CreateShowtimeDto dto)
        {
            try
            {
                    if (!ModelState.IsValid)
                    {
                        return NotFound(ModelState);
                    }
                var showtimes = await _showtime.CreateShowtime(dto);
                return Ok(showtimes);
            }catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
            
        }
        [HttpGet("{date}")]
        public async Task<IActionResult> Getshowtimes(DateTime date)
        {

            var showtimes = await _showtime.GetShowTimesAsync(date);
            var result = showtimes.GroupBy(s => s.Movie!.Title)
                                .Select(g => new
                                {
                                    MovieTitle = g.Key,
                                    ShowTime = g.Select(s => new
                                    {
                                        s.StartTime,
                                    })
                                });
            return Ok(result);
        }
        [HttpGet("details/{id}")]
        [Authorize]
        public async Task<IActionResult> GetShowTimeById(int id)
        {
            try
            {
                var showtime = await _showtime.GetShowtimeByIdAsync(id);
                return Ok(showtime);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);  
            }
        }
        [HttpGet("seats/{ShowTimeId}")]
        public async Task<IActionResult> GetSeatsByShowtimeId(int ShowTimeId)
        {
            try
            {
                var seats = await _showtime.GetSeatsByShowtimeIdAsync(ShowTimeId);
                return Ok(seats);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("get-all")]
        public async Task<IActionResult> GetAllShowtime([FromQuery] QueryObject query)
        {
            var showtime = await _showtime.GetAllShowtime(query);
            return Ok(showtime);
        }

    }
}