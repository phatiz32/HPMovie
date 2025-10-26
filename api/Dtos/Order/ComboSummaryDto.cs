using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Order
{
    public class ComboSummaryDto
    {
        public string ComboName { get; set; }
        public int Quantity { get; set; }
        public long TotalPrice { get; set; }
    }
}