using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Configuration;
using web.Pages.Models;

namespace web.Pages
{
    [AllowAnonymous]
    public class CotizacionesController : BaseController
    {
        private IConfiguration _config;
        private IApiProxy Proxy { get; set; }

        public CotizacionesController(IConfiguration Configuration, IApiProxy proxy) : base(proxy)
        {
            this._config = Configuration;
            this.Proxy = proxy;
        }
    }
}