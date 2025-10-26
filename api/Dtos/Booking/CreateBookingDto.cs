using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using api.Models;

namespace api.Dtos.Booking
{
    public class CreateBookingDto
    {
        [Required]
        public int ShowTimeId { get; set; }
        [Required]
        public List<int> SeatIds { get; set; } = new List<int>(); 
    }
}