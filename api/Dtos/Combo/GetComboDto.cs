using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Combo
{
    public class GetComboDto
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public string imageUrl { get; set; } 
        public long Price { get; set; }
        public bool IsActive { get; set; } = true;
    }
}