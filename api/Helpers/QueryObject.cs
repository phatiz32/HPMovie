using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Helpers
{
    public class QueryObject
    {
        public int Pagesize { get; set; } = 1;
        public int PageNumber { get; set; } = 1;
        public string? Genre { get; set; }
        public string? Status { get; set; }
        public string? SearchName { get; set; }
        public DateTime? Date { get; set; }
    }
}