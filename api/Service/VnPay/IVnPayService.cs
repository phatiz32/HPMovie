using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models.VNPay;

namespace api.Service.VnPay
{
    public interface IVnPayService
    {
        string CreatePaymentUrl(PaymentInformationModel model, HttpContext context);
        PaymentResponseModel PaymentExecute(IQueryCollection collections);
    }
}