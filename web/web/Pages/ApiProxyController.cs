using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Net.Http;
using System.Threading.Tasks;
using web.Pages.Models;

namespace web.Pages
{
    [Authorize]
    public class ApiProxyController : BaseController
    {
        private IApiProxy Proxy { get; set; }

        public ApiProxyController(IApiProxy proxy)
        {
            this.Proxy = proxy;
        }


        [HttpPost]
        public async Task<IActionResult> ServerCall(ApiProxyModel model)
        {
            try
            {
                HttpResponseMessage response = await Proxy.ServerCall(model, base.Token);
                return Content(await response.Content.ReadAsStringAsync());
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }
    }
}