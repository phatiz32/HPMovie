using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Movie
{
    public class UpdateMovieDto
    {
        
        public string? Title { get; set; }
        
        public string? Genre { get; set; }
        public int? Duration { get; set; }
        public DateTime? ReleaseDate { get; set; }
        public string? AgeLimit { get; set; }
        public string? Language { get; set; }
        public string? Director { get; set; }
        public string? Actor { get; set; }
        public string? Status { get; set; }
        public IFormFile? PosterFile { get; set; }
        public string? TrailerUrl { get; set; }
    }
}