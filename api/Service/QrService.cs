using System;
using System.Collections.Generic;
using System.Drawing.Imaging;
using System.Linq;
using System.Threading.Tasks;
using QRCoder;

namespace api.Service
{
    public static class QrService
    {
        public static string GenerateQrCode(string content,string fileName)
        {
            using var qrGenerator = new QRCodeGenerator();
            //bien du lieu thanh qrcode
            using var qrCodeData = qrGenerator.CreateQrCode(content, QRCodeGenerator.ECCLevel.Q);
            using var qrCode = new QRCode(qrCodeData);
            using var bitmap = qrCode.GetGraphic(20);
            var folderPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "qrcodes");
            if (!Directory.Exists(folderPath))
            {
                Directory.CreateDirectory(folderPath);
            }
            var filePath = Path.Combine(folderPath, $"{fileName}.png");
            bitmap.Save(filePath, ImageFormat.Png);
            return filePath;
        }
    }
}