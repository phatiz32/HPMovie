using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using api.Models;
using api.Models.MoMo;
using Microsoft.Extensions.Options;
using Microsoft.OpenApi.Models;
using Newtonsoft.Json;
using RestSharp;

namespace api.Service.Momo
{
    public class MomoService : IMomoService
    {
        private readonly IOptions<MomoOptionModel> _options;
        public MomoService(IOptions<MomoOptionModel> options)
        {
            _options = options;
        }
        // public async Task<MomoCreatePaymentResponseModel> CreatePaymentAsync(OrderInfoModel model)
        // {
        //      model.OrderId = DateTime.UtcNow.Ticks.ToString();
        //         model.OrderInfo = "Khách hàng: " + model.FullName + ". Nội dung: " + model.OrderInfo;
        //         var rawData =
        //         $"partnerCode={_options.Value.PartnerCode}" +
        //         $"&accessKey={_options.Value.AccessKey}" +
        //         $"&requestId={model.OrderId}" +
        //         $"&amount={Convert.ToInt64(model.Amount)}" +
        //         $"&orderId={model.OrderId}" +
        //         $"&orderInfo={model.OrderInfo}" +
        //         $"&returnUrl={_options.Value.ReturnUrl}" +
        //         $"&notifyUrl={_options.Value.NotifyUrl}" +
        //         $"&extraData=";
        //         var signature = ComputeHmacSha256(rawData, _options.Value.SecretKey);
        //         var client = new RestClient(_options.Value.MomoApiUrl);
        //         var request = new RestRequest() { Method = Method.Post };
        //     request.AddHeader("Content-Type", "application/json; charset=UTF-8");
        //     var requestData = new
        //     {
        //         accessKey = _options.Value.AccessKey,
        //         partnerCode = _options.Value.PartnerCode,
        //         requestType = _options.Value.RequestType,
        //         notifyUrl = _options.Value.NotifyUrl,
        //         returnUrl = _options.Value.ReturnUrl,
        //         orderId = model.OrderId,
        //         amount = Convert.ToInt64(model.Amount).ToString(),
        //         orderInfo = model.OrderInfo,
        //         requestId = model.OrderId,
        //         extraData = "",
        //         signature = signature
        //     };
        //     request.AddParameter("application/json", JsonConvert.SerializeObject(requestData), ParameterType.RequestBody);

        //         var response = await client.ExecuteAsync(request);
        //         Console.WriteLine("Momo raw response: " + response.Content);
        //         var momoResponse = JsonConvert.DeserializeObject<MomoCreatePaymentResponseModel>(response.Content);
        //         Console.WriteLine(">>> Response From Momo:");
        //         Console.WriteLine(response.Content); 
        //         Console.WriteLine("=== RAW DATA GỬI SANG MOMO ===");
        //         Console.WriteLine(rawData);

        //         Console.WriteLine("=== SIGNATURE ===");
        //         Console.WriteLine(signature);

        //         Console.WriteLine("=== REQUEST JSON GỬI SANG MOMO ===");
        //         Console.WriteLine(JsonConvert.SerializeObject(requestData, Formatting.Indented));
        //         Console.WriteLine("=== MOMO RAW RESPONSE ===");
        //         Console.WriteLine(response.Content);

        //         Console.WriteLine("=== MOMO HTTP STATUS ===");
        //         Console.WriteLine(response.StatusCode);

        //         if (response.ErrorMessage != null)
        //         {
        //             Console.WriteLine("=== MOMO ERROR MESSAGE ===");
        //             Console.WriteLine(response.ErrorMessage);
        //         }

        //         return momoResponse;
        // }
        public async Task<MomoCreatePaymentResponseModel> CreatePaymentAsync(OrderInfoModel model)
{
    model.OrderId = DateTime.UtcNow.Ticks.ToString();
    model.OrderInfo = "Khách hàng: " + model.FullName + ". Nội dung: " + model.OrderInfo;
    
    // Thứ tự PHẢI theo alphabet để tạo signature đúng
    var rawData =
        $"accessKey={_options.Value.AccessKey}" +
        $"&amount={Convert.ToInt64(model.Amount)}" +
        $"&extraData=" +
        $"&ipnUrl={_options.Value.NotifyUrl}" +
        $"&orderId={model.OrderId}" +
        $"&orderInfo={model.OrderInfo}" +
        $"&partnerCode={_options.Value.PartnerCode}" +
        $"&redirectUrl={_options.Value.ReturnUrl}" +
        $"&requestId={model.OrderId}" +
        $"&requestType={_options.Value.RequestType}";
    
    var signature = ComputeHmacSha256(rawData, _options.Value.SecretKey);
    var client = new RestClient(_options.Value.MomoApiUrl);
    var request = new RestRequest() { Method = Method.Post };
    request.AddHeader("Content-Type", "application/json; charset=UTF-8");
    
    // Request body gửi sang MoMo
    var requestData = new
    {
        partnerCode = _options.Value.PartnerCode,
        accessKey = _options.Value.AccessKey,
        requestId = model.OrderId,
        amount = Convert.ToInt64(model.Amount).ToString(),
        orderId = model.OrderId,
        orderInfo = model.OrderInfo,
        redirectUrl = _options.Value.ReturnUrl,  // ĐỔI: returnUrl -> redirectUrl
        ipnUrl = _options.Value.NotifyUrl,       // ĐỔI: notifyUrl -> ipnUrl
        extraData = "",
        requestType = _options.Value.RequestType,
        signature = signature,
        lang = "vi"
    };
    
    request.AddParameter("application/json", JsonConvert.SerializeObject(requestData), ParameterType.RequestBody);

    var response = await client.ExecuteAsync(request);
    
    Console.WriteLine("=== RAW DATA GỬI SANG MOMO ===");
    Console.WriteLine(rawData);
    Console.WriteLine("=== SIGNATURE ===");
    Console.WriteLine(signature);
    Console.WriteLine("=== REQUEST JSON GỬI SANG MOMO ===");
    Console.WriteLine(JsonConvert.SerializeObject(requestData, Formatting.Indented));
    Console.WriteLine("=== MOMO RAW RESPONSE ===");
    Console.WriteLine(response.Content);
    Console.WriteLine("=== MOMO HTTP STATUS ===");
    Console.WriteLine(response.StatusCode);

    if (response.ErrorMessage != null)
    {
        Console.WriteLine("=== MOMO ERROR MESSAGE ===");
        Console.WriteLine(response.ErrorMessage);
    }

    var momoResponse = JsonConvert.DeserializeObject<MomoCreatePaymentResponseModel>(response.Content);
    
    
    
    return momoResponse;
}
         private string ComputeHmacSha256(string message, string secretKey)
            {
                var keyBytes = Encoding.UTF8.GetBytes(secretKey);
                var messageBytes = Encoding.UTF8.GetBytes(message);

                using var hmac = new HMACSHA256(keyBytes);
                var hashBytes = hmac.ComputeHash(messageBytes);

                return BitConverter.ToString(hashBytes).Replace("-", "").ToLower();
            }

        public MomoExecuteResponseModel PaymentExecuteAsync(IQueryCollection collection)
        {
            var amount = collection.First(s => s.Key == "amount").Value;
                var orderInfo = collection.First(s => s.Key == "orderInfo").Value;
                var orderId = collection.First(s => s.Key == "orderId").Value;
                return new MomoExecuteResponseModel()
                {
                    Amount = amount,
                    OrderId = orderId,
                    OrderInfo = orderInfo
                };
        }
    }
}