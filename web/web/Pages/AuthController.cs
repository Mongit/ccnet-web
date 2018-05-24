using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Security.Claims;
using System.Threading.Tasks;
using web.Pages.Auth;
using web.Pages.Models;

namespace web.Pages
{
    public class AuthController : BaseController
    {
        private IConfiguration _config;
        private IApiProxy Proxy { get; set; }

        public AuthController(IConfiguration Configuration, IApiProxy proxy) : base(proxy)
        {
            this._config = Configuration;
            this.Proxy = proxy;
        }

        public IActionResult Login()
        {
            ViewData["Message"] = "Login Page.";

            return View();
        }

        [HttpPost, ValidateAntiForgeryToken]
        public async Task<IActionResult> LoginUser(string returnUrl, string email, string contrasena)
        {
            var self = this;
            var userModel = new LoginModel
            {
                Email = email,
                Contrasena = contrasena
            };
            var model = new ApiProxyModel
            {
                HttpMethod = Models.HttpMethod.Post,
                EndPoint = "/api/Token",
                UrlParams = null,
                Body = JsonConvert.SerializeObject(userModel)
            };

            try
            {
                HttpResponseMessage response = await Proxy.ServerCall(model, base.Token);
                var tokenjson = Content(await response.Content.ReadAsStringAsync());
                var token = JObject.Parse(tokenjson.Content);
                
                var Issuer = self._config.GetValue<string>("Webapi");
                if ((string)token["token"] != null || (string)token["token"] != "")
                {
                    var claims = new List<Claim>
                    {
                        new Claim(ClaimTypes.Name, email, ClaimValueTypes.String, Issuer)
                    };
                    var userIdentity = new ClaimsIdentity(claims, "Bearer");
                    var userPrincipal = new ClaimsPrincipal(userIdentity);

                    await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme,
                        userPrincipal,
                        new AuthenticationProperties
                        {
                            ExpiresUtc = DateTime.UtcNow.AddMinutes(20),
                            IsPersistent = false,
                            AllowRefresh = false
                        });
                    
                    base.Token = Convert.ToString(token["token"]);

                    return GoToReturnUrl(returnUrl);
                }

                return RedirectToAction(nameof(Denied));

            }
            catch (Exception ex)
            {
                if(ex.Message == "Response status code does not indicate success: 401 (Unauthorized).")
                {
                    return RedirectToAction(nameof(Denied));
                }
                else
                {
                    throw ex;
                }
            }
        }

        private IActionResult GoToReturnUrl(string returnUrl)
        {
            if (Url.IsLocalUrl(returnUrl))
            {
                return Redirect(returnUrl);
            }
            return Redirect("/");
        }

        private IActionResult Denied(string returnUrl)
        {
            ViewData["Message"] = "Denied Page.";

            return View();
        }

        public async Task<IActionResult> Logout()
        {
            await HttpContext.SignOutAsync();
            return RedirectToAction(nameof(Login));
        }
    }
}