using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;
using api.Dtos.Movie;
using api.Helpers;
using api.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MovieController : ControllerBase
    {
        private readonly IMovieRepository _movieRepository;
        public MovieController(IMovieRepository movieRepository)
        {
            _movieRepository = movieRepository;
        }
        [HttpPost]
        [Authorize(Roles ="Admin")]
        public async Task<IActionResult> CreateMovie(CreateMovieDto dto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                var movie = await _movieRepository.CreateMovieAsync(dto);
                return Ok(movie);
            }catch(Exception e)
            {
                return BadRequest(e.Message);
            }
            
        }
        [HttpGet]
        public async Task<IActionResult> GetMovies([FromQuery] QueryObject queryObject)
        {
            var movies = await _movieRepository.GetMoviesAsync(queryObject);
            return Ok(movies);
        }
        [HttpPut("{id}")]
        [Authorize(Roles ="Admin")]
        public async Task<IActionResult> UpdateMovie(int id, UpdateMovieDto dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var updatedMovie = await _movieRepository.UpdateMovieAsync(id, dto);
            if (updatedMovie == null)
            {
                return NotFound(new { message = "Movie not found" });
            }
            return Ok(updatedMovie);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetMovieById(int id)
        {
            var movie = await _movieRepository.GetMovieByIdAsync(id);
            if (movie == null)
            {
                return NotFound(new { message = "Movie not found" });
            }
            return Ok(movie);
        }
        [HttpGet("active-movie")]
        public async Task<IActionResult> getActiveMovie()
        {
            var movie = await _movieRepository.GetActiveMovieAsync();
            return Ok(movie);
        }
        

    }
}