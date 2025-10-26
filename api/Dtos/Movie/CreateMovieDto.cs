using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Movie
{
    public class CreateMovieDto
    {
        [Required]
        public string Title { get; set; }
        [Required]
        public string Genre { get; set; }
        [Required]
        public int Duration { get; set; }
        [Required]
        public DateTime ReleaseDate { get; set; }
        [Required]
        public string AgeLimit { get; set; }
        [Required]
        public string Language { get; set; }
        [Required]
        public string Director { get; set; }
        [Required]
        public string Actor { get; set; }
        [Required]
        public IFormFile PosterFile { get; set; }
        [Required]
        public string TrailerUrl { get; set; }
    }
}