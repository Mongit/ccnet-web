using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace web.Pages.Recibos
{
    [Authorize]
    public class RecibosModel : PageModel
    {
        public void OnGet()
        {

        }
    }
}