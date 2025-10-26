using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Combo
{
    public class CreateComboDto
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        public IFormFile formFile { get; set; }
        [Required]
        public long Price { get; set; }
        public bool IsActive { get; set; } = true;
    }
}