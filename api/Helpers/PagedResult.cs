using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Helpers
{
    public class PagedResult<T>
    {
        public List<T> Items { get; set; } = new List<T>();
        public int ToTalItems { get; set; }
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
        public int TotalPages=>(int)Math.Ceiling((double)ToTalItems / PageSize);
        
    }
}