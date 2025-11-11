using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;

namespace api.Service
{
    public interface IWeb3Service
    {
        Task<(bool isValid, TransactionDetails details)> VerifyTransactionAsync(
            string txHash, 
            string expectedFrom, 
            string expectedTo, 
            decimal expectedAmount);
    }
}