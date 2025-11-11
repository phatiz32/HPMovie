using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;

namespace api.Service
{
    public interface ICryptoPaymentService
    {
         Task<CryptoPaymentResponse> ProcessCryptoPaymentAsync(CryptoPaymentRequest request, string userId);
        decimal ConvertVNDToCET(long vndAmount);
        long ConvertCETToVND(decimal cetAmount);
    }
}