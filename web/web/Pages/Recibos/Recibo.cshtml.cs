using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace web.Pages.Recibos
{
    [Authorize]
    public class ReciboModel : PageModel
    {
        public void OnGet()
        {

        }
    }
}