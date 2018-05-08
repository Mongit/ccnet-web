using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Configuration;
using web.Pages.Models;

namespace web.Pages.Recibos
{
    [Authorize]
    public class RecibosController : BaseController
    {
        private IConfiguration _config;
        private IApiProxy Proxy { get; set; }

        public RecibosController(IConfiguration Configuration, IApiProxy proxy) : base(proxy)
        {
            this._config = Configuration;
            this.Proxy = proxy;
        }
    }
}