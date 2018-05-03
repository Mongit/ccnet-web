using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Configuration;
using web.Pages.Models;

namespace web.Pages.Proveedores
{
    [Authorize]
    public class ProveedoresController : BaseController
    {
        private IConfiguration _config;
        private IApiProxy Proxy { get; set; }

        public ProveedoresController(IConfiguration Configuration, IApiProxy proxy) : base(proxy)
        {
            this._config = Configuration;
            this.Proxy = proxy;
        }
    }
}