using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Security.Claims;
using System.Threading.Tasks;
using web.Pages.Auth;
using web.Pages.Models;

namespace web.Pages
{
    public class AuthController : Controller
    {
        private IConfiguration _config;
        private IApiProxy Proxy { get; set; }

        public AuthController(IConfiguration Configuration, IApiProxy proxy)
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
        public async Task<IActionResult> LoginUser(string returnUrl, string email, string password)
        {
            var userModel = new LoginModel();
            userModel.Email = email;
            userModel.Password = password;

            var model = new ApiProxyModel();
            model.HttpMethod = Models.HttpMethod.Post;
            model.EndPont = "/api/Token";
            model.UrlParams = null;
            model.Body = JsonConvert.SerializeObject(userModel);


            try
            {
                HttpResponseMessage response = await Proxy.ServerCall(model);
                var token = Content(await response.Content.ReadAsStringAsync());
                return token;
            }
            catch (Exception ex)
            {
                throw ex;
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