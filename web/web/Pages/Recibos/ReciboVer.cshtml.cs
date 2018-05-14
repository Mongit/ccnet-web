using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace web.Pages.Recibos
{
    [Authorize]
    public class ReciboVerModel : PageModel
    {
        public void OnGet()
        {

        }
    }
}