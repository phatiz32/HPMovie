using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Movie;
using api.Helpers;
using api.Models;
using Humanizer;

namespace api.Interfaces
{
    public interface IMovieRepository
    {
        public Task<Movie> CreateMovieAsync(CreateMovieDto dto);
        public Task<PagedResult<ToMovieDto>> GetMoviesAsync(QueryObject queryObject);
        public Task<ToMovieDto> UpdateMovieAsync(int id, UpdateMovieDto dto);
        public Task<ToMovieDto> GetMovieByIdAsync(int id);
        public Task<List<Movie>> GetActiveMovieAsync();

    }
}