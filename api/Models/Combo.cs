using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class Combo
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string imageUrl { get; set; } 
        public long Price { get; set; }
        public bool IsActive { get; set; } = true;

    }
}