using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Account
{
    public class ImportStaffFileDto
    {
        [Required]
        public IFormFile File { get; set; }
    }
}