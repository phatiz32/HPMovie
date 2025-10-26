using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace api.Helpers
{
    public static class YoutubeHelper
    {
        public static string NormalizedYoutubeUrl(String url)
        {
            if (string.IsNullOrEmpty(url))
            {
                return null;
            }
            var uri = new Uri(url);
            string videoId = null;
            string listId = null;
            if (uri.Host.Contains("youtu.be")) {
                videoId = uri.AbsolutePath.Trim('/');
                // dua ve dang key value
                var query = HttpUtility.ParseQueryString(uri.Query);
                listId = query["list"];
            } else if (uri.Host.Contains("youtube.com")) {
                var query = HttpUtility.ParseQueryString(uri.Query);
                videoId = query["v"];
                listId = query["list"];
            }
            if (string.IsNullOrEmpty(videoId)) {
                return null;
            }
            string embedUrl = $"https://www.youtube.com/embed/{videoId}";
            if (!string.IsNullOrEmpty(listId)) {
                embedUrl += $"?list={listId}";
            }
            return embedUrl;
        }
    }
}