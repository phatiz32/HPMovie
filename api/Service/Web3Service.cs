using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;
using Nethereum.Web3;

namespace api.Service
{
    public class Web3Service : IWeb3Service
    {
        private readonly Web3 _web3;
        private readonly string _merchantAddress;
        private readonly ILogger<Web3Service> _logger;
        public Web3Service(IConfiguration configuration, ILogger<Web3Service> logger)
        {
            var rpcUrl = configuration["Blockchain:RpcUrl"] ?? "https://testnet-rpc.coinex.net";
            _merchantAddress = configuration["Blockchain:MerchantAddress"]?.ToLower() 
                ?? "0x9cb7a7c9a160cd7f16121953cfe0a1d598c77b63";
            
            _web3 = new Web3(rpcUrl);
            _logger = logger;
            
            _logger.LogInformation($"Web3Service initialized with RPC: {rpcUrl}");
            _logger.LogInformation($"Merchant address: {_merchantAddress}");
        }
        public async Task<(bool isValid, TransactionDetails details)> VerifyTransactionAsync(string txHash, string expectedFrom, string expectedTo, decimal expectedAmount)
        {
            try
            {
                _logger.LogInformation($"Verifying transaction: {txHash}");

                // Đợi transaction được confirm (retry 10 lần, mỗi lần 3 giây)
                for (int i = 0; i < 10; i++)
                {
                    try
                    {
                        var receipt = await _web3.Eth.Transactions.GetTransactionReceipt
                            .SendRequestAsync(txHash);
                        
                        if (receipt != null)
                        {
                            var transaction = await _web3.Eth.Transactions.GetTransactionByHash
                                .SendRequestAsync(txHash);
                            
                            var details = new TransactionDetails
                            {
                                TxHash = txHash,
                                Confirmed = receipt.Status.Value == 1,
                                From = transaction.From?.ToLower(),
                                To = transaction.To?.ToLower(),
                                AmountInCET = Web3.Convert.FromWei(transaction.Value.Value),
                                BlockNumber = (long)receipt.BlockNumber.Value
                            };

                            _logger.LogInformation($"TX Details: From={details.From}, To={details.To}, Amount={details.AmountInCET} CET");

                            bool isValid = receipt.Status.Value == 1 &&
                                          details.From == expectedFrom.ToLower() &&
                                          details.To == expectedTo.ToLower() &&
                                          details.AmountInCET >= expectedAmount;

                            return (isValid, details);
                        }
                    }
                    catch (Exception ex)
                    {
                        _logger.LogWarning($"Attempt {i + 1}/10: {ex.Message}");
                    }

                    await Task.Delay(3000);
                }

                return (false, null);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error verifying transaction: {ex.Message}");
                return (false, null);
            }
        }
    }
}