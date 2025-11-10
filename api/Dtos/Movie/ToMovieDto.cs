using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Movie
{
    public class ToMovieDto
    {
        public int Id { get; set; }
         public string Title { get; set; }
        public string Genre { get; set; }
        public int Duration { get; set; }
        public string PosterUrl { get; set; }
        public string TrailerUrl { get; set; }
        public DateTime ReleaseDate { get; set; }
        public string AgeLimit { get; set; }
        public string Language { get; set; }
        public string Director { get; set; }
        public string Actor { get; set; }
        public string Status{get;set;}
    }
}