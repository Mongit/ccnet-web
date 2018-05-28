using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace web.Pages
{
    [Authorize]
    public class ClientesModel : PageModel
    {
        public void OnGet()
        {
            ViewData["Message"] = "Hola Mundo.";
        }
    }
}