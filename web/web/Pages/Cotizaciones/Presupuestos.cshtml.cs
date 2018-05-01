using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace web.Pages
{
    [Authorize]
    public class PresupuestosModel : PageModel
    {
        public void OnGet()
        {

        }
    }
}