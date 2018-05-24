using Newtonsoft.Json;
using System.Collections.Generic;
using System.Linq;

namespace web.Pages.Models
{
    public enum HttpMethod
    {
        [JsonProperty(PropertyName = "get")]
        Get,
        [JsonProperty(PropertyName = "post")]
        Post,
        [JsonProperty(PropertyName = "put")]
        Put,
        [JsonProperty(PropertyName = "delete")]
        Delete
    }
    public class ApiProxyModel
    {
        [JsonProperty(PropertyName = "httpMethod")]
        public HttpMethod HttpMethod { get; set; }
        [JsonProperty(PropertyName = "endPoint")]
        public string EndPoint { get; set; }
        [JsonProperty(PropertyName = "urlParams")]
        public Dictionary<string, string> UrlParams { get; set; }
        [JsonProperty(PropertyName = "body")]
        public string Body { get; set; }

        public string GetUrl()
        {
            if (UrlParams == null || UrlParams.Count == 0)
            {
                return EndPoint;
            }

            return string.Format("{0}?{1}", EndPoint, string.Join("&", UrlParams.Select(kvp => string.Format("{0}={1}", kvp.Key, kvp.Value))));
        }
    }
}
