using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Configuration;
using web.Pages.Models;

namespace web.Pages.Stock
{
    [Authorize]
    public class StockController : BaseController
    {
        private IConfiguration _config;
        private IApiProxy Proxy { get; set; }

        public StockController(IConfiguration Configuration, IApiProxy proxy) : base(proxy)
        {
            this._config = Configuration;
            this.Proxy = proxy;
        }
    }
}