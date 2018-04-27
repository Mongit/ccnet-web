using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace web.Pages
{
    public class BaseController: Controller
    {

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
    }
}
