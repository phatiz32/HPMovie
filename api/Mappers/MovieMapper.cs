using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Movie;
using api.Helpers;
using api.Models;
using Humanizer;

namespace api.Mappers
{
    public static class MovieMapper
    {
        public static Movie ToMovie(this CreateMovieDto createMovieDto, string posterUrl, string trailerUrl)
        {
            var status = createMovieDto.ReleaseDate > DateTime.Now ? "COMINGSOON" : "SHOWING";
            return new Movie
            {
                Title = createMovieDto.Title,
                Genre = createMovieDto.Genre,
                Duration = createMovieDto.Duration,
                ReleaseDate = createMovieDto.ReleaseDate,
                AgeLimit = createMovieDto.AgeLimit,
                Language = createMovieDto.Language,
                Director = createMovieDto.Director,
                Actor = createMovieDto.Actor,
                Status = status,
                PosterUrl = posterUrl,
                TrailerUrl = trailerUrl
            };
        }
        public static ToMovieDto ToMovieDto(this Movie movie)
        {
            return new ToMovieDto
            {
                Id=movie.Id,
                Title = movie.Title,
                Genre = movie.Genre,
                Duration = movie.Duration,
                ReleaseDate = movie.ReleaseDate,
                AgeLimit = movie.AgeLimit,
                Language = movie.Language,
                Director = movie.Director,
                Actor = movie.Actor,
                Status = movie.Status,
                PosterUrl = movie.PosterUrl,
                TrailerUrl = movie.TrailerUrl
            };
        }
        public static void UpdateFromDto(this Movie movie, UpdateMovieDto dto, string? posterFileName) {
            movie.Title = KeepItIfNull.KeepIfNotEmpty(dto.Title, movie.Title);
            movie.Genre = KeepItIfNull.KeepIfNotEmpty(dto.Genre, movie.Genre);
            if (dto.Duration.HasValue && dto.Duration.Value > 0)
            {
                movie.Duration = dto.Duration.Value;
            }
            if (dto.ReleaseDate.HasValue && dto.ReleaseDate.Value != default)
            {
                movie.ReleaseDate = dto.ReleaseDate.Value;
            }
            movie.AgeLimit = KeepItIfNull.KeepIfNotEmpty(dto.AgeLimit, movie.AgeLimit);
            movie.Language = KeepItIfNull.KeepIfNotEmpty(dto.Language, movie.Language);
            movie.Director = KeepItIfNull.KeepIfNotEmpty(dto.Director, movie.Director);
            movie.Actor = KeepItIfNull.KeepIfNotEmpty(dto.Actor, movie.Actor);
            movie.Status = KeepItIfNull.KeepIfNotEmpty(dto.Status, movie.Status);
            movie.PosterUrl = posterFileName == null ? movie.PosterUrl : posterFileName;
            movie.TrailerUrl = KeepItIfNull.KeepIfNotEmpty(YoutubeHelper.NormalizedYoutubeUrl(dto.TrailerUrl), movie.TrailerUrl);
        }
    }
}