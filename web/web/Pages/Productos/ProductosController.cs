using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using web.Pages.Models;

namespace web.Pages.Productos
{
    [Authorize]
    public class ProductosController : BaseController
    {
        private IConfiguration _config;
        private IApiProxy Proxy { get; set; }

        public ProductosController(IConfiguration config, IApiProxy proxy) : base(proxy)
        {
            _config = config;
            Proxy = proxy;
        }
    }
}