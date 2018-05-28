using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Net.Http;
using System.Threading.Tasks;
using web.Pages.Models;

namespace web.Pages
{
    [AllowAnonymous]
    public class BaseController: Controller
    {
        private IApiProxy Proxy { get; set; }

        public BaseController(IApiProxy proxy)
        {
            this.Proxy = proxy;
        }


        public string TokenKey
        {
            get
            {
                return "MyTokenKey";
            }
        }

        public string Token
        {
            get
            {
                return HttpContext.Session.Get<string>(this.TokenKey);
            }
            set
            {
                HttpContext.Session.Set<string>(this.TokenKey, value);
            }
        }



        [HttpPost, ValidateAntiForgeryToken]
        public async Task<IActionResult> ServerCall(ApiProxyModel model)
        {
            try
            {
                HttpResponseMessage response = await Proxy.ServerCall(model, this.Token);
                return Content(await response.Content.ReadAsStringAsync());
            }
            catch (Exception ex)
            {
               throw ex;
            }

        }
    }
}
