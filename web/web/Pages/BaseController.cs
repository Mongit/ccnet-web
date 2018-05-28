using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Net.Http;
using System.Text;
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



        [HttpPost]
        public async Task<IActionResult> ServerCall(ApiProxyModel model)
        //public async Task<IActionResult> ServerCall()
        {
            StringBuilder sb = new StringBuilder();
            sb.AppendLine(Token);
            sb.AppendLine(JsonConvert.SerializeObject(model));

            try
            {
                HttpResponseMessage response = await Proxy.ServerCall(model, this.Token);
                
                sb.AppendLine(await response.Content.ReadAsStringAsync());

                return Content(sb.ToString());
                //return Content("Hola inicio");
            }
            catch (Exception ex)
            {
                sb.AppendLine(ex.Message);
                sb.AppendLine(ex.StackTrace);
               
                return Content(sb.ToString());
//              throw ex;
            }

        }
    }
}
