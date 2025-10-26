using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MailKit;

namespace api.Helpers
{
    public static class KeepItIfNull
    {
        public static string KeepIfNotEmpty(string? newValue,string oldValue)=>
            String.IsNullOrEmpty(newValue)? oldValue : newValue;
    }
}