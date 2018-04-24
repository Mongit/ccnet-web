using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace web.Pages
{
    [Authorize]
    public class CotizacionesModel : PageModel
    {
        public void OnGet()
        {

        }
    }
}