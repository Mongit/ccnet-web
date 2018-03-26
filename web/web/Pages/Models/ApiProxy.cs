using System;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace web.Pages.Models
{
    public class ApiProxy : IApiProxy
    {
        private HttpClient Client { get; set; }
        public ApiProxy(String apiUrl)
        {
            HttpClientHandler httpClientHandler = new HttpClientHandler
            {
                Proxy = null,
                UseProxy = false
            };

            this.Client = new HttpClient(httpClientHandler);
            this.Client.BaseAddress = new Uri(apiUrl);
        }

        public async Task<HttpResponseMessage> ServerCall(ApiProxyModel model)
        {
            HttpContent content = null;
            HttpResponseMessage response = null;
            switch (model.HttpMethod)
            {
                case HttpMethod.Get:
                    response = await this.Client.GetAsync(model.GetUrl());
                    break;
                case HttpMethod.Post:
                    content = new StringContent(model.Body, Encoding.UTF8, "application/json");
                    response = await this.Client.PostAsync(model.GetUrl(), content);
                    break;
                case HttpMethod.Put:
                    content = new StringContent(model.Body, Encoding.UTF8, "application/json");
                    response = await this.Client.PutAsync(model.GetUrl(), content);
                    break;
                case HttpMethod.Delete:
                    response = await this.Client.DeleteAsync(model.GetUrl());
                    break;
            }

            response.EnsureSuccessStatusCode();

            return response;
        }
    }
}
