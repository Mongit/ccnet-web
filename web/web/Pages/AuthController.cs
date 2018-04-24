using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;

namespace web.Pages
{
    public class AuthController : Controller
    {
        public IActionResult Login()
        {
            ViewData["Message"] = "Login Page.";

            return View();
        }

        [HttpPost, ValidateAntiForgeryToken]
        public async Task<IActionResult> LoginUser(string returnUrl, string email, string password)
        {
            if (email == "jon@mail.com" && password == "jon")
            {
                var claims = new List<Claim>
                {
                    new Claim(ClaimTypes.Name, "jon", ClaimValueTypes.String, "https://yourdomain.com")
                };
                var userIdentity = new ClaimsIdentity(claims, "SecureLogin");
                var userPrincipal = new ClaimsPrincipal(userIdentity);

                await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme,
                    userPrincipal,
                    new AuthenticationProperties
                    {
                        ExpiresUtc = DateTime.UtcNow.AddMinutes(20),
                        IsPersistent = false,
                        AllowRefresh = false
                    });

                return GoToReturnUrl(returnUrl);
            }

            return RedirectToAction(nameof(Denied));
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