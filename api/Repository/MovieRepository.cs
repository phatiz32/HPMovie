using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Dtos.Movie;
using api.Helpers;
using api.Interfaces;
using api.Mappers;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
    public class MovieRepository : IMovieRepository
    {
        private readonly ApplicationDBContext _context;
        private readonly IWebHostEnvironment _env;
        public MovieRepository(ApplicationDBContext context, IWebHostEnvironment env)
        {
            _context = context;
            _env = env;
        }
        public async Task<Movie> CreateMovieAsync(CreateMovieDto dto)
        {
            String trailerUrl = YoutubeHelper.NormalizedYoutubeUrl(dto.TrailerUrl);
            if(dto.ReleaseDate.Date<= DateTime.Now.Date)
            {
                throw new Exception("Release Date must larger than to day");
            }
            string posterUrl = null;
            if (dto.PosterFile != null && dto.PosterFile.Length > 0)
            {
                var upLoadPath = Path.Combine(_env.WebRootPath, "uploads");
                if (!Directory.Exists(upLoadPath))
                {
                    Directory.CreateDirectory(upLoadPath);
                }
                var fileName = Guid.NewGuid().ToString() + Path.GetExtension(dto.PosterFile.FileName);
                var filePath = Path.Combine(upLoadPath, fileName);
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await dto.PosterFile.CopyToAsync(stream);
                }
                posterUrl = $"/uploads/{fileName}";
            }
            var movie = dto.ToMovie(posterUrl, trailerUrl);
            await _context.Movies.AddAsync(movie);
            await _context.SaveChangesAsync();
            return movie;

        }

        public async Task<ToMovieDto> GetMovieByIdAsync(int id)
        {
            var movies = await _context.Movies.FirstOrDefaultAsync(m => m.Id == id);
            if (movies == null) return null;
            return movies.ToMovieDto();
        }

        public async Task<PagedResult<ToMovieDto>> GetMoviesAsync(QueryObject queryObject)
        {
            var movieQuery = _context.Movies.AsQueryable();
            if (!string.IsNullOrEmpty(queryObject.SearchName))
            {
                movieQuery = movieQuery.Where(m => m.Title.Contains(queryObject.SearchName));
            }
            if (!string.IsNullOrEmpty(queryObject.Genre))
            {
                movieQuery = movieQuery.Where(m => m.Genre.ToLower() == queryObject.Genre.ToLower());
            }
            if (!string.IsNullOrEmpty(queryObject.Status))
            {
                movieQuery = movieQuery.Where(m => m.Status.ToLower() == queryObject.Status.ToLower());
            }
            var totalItems = await movieQuery.CountAsync();
            var items = await movieQuery
            .OrderByDescending(m => m.ReleaseDate)
            .Skip((queryObject.PageNumber - 1) * queryObject.Pagesize)
            .Take(queryObject.Pagesize)
            .Select(m => m.ToMovieDto())
            .ToListAsync();
            return new PagedResult<ToMovieDto>
            {
                Items = items,
                ToTalItems = totalItems,
                PageNumber = queryObject.PageNumber,
                PageSize = queryObject.Pagesize
            };
             
        }

        public async Task<ToMovieDto> UpdateMovieAsync(int id, UpdateMovieDto dto)
        {
            var movie = await _context.Movies.FirstOrDefaultAsync(m => m.Id == id);
            if (movie == null) return null;
            string fileName = null;
            if (dto.PosterFile != null && dto.PosterFile.Length > 0)
            {
                var upLoadPath = Path.Combine(_env.WebRootPath, "uploads");
                if (!Directory.Exists(upLoadPath))
                {
                    Directory.CreateDirectory(upLoadPath);
                }
                fileName = Guid.NewGuid().ToString() + Path.GetExtension(dto.PosterFile.FileName);
                var filePath = Path.Combine(upLoadPath, fileName);
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await dto.PosterFile.CopyToAsync(stream);
                }
                
            }
            movie.UpdateFromDto(dto, fileName);
            await _context.SaveChangesAsync();
            return movie.ToMovieDto();
             
        }
    }
}