using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace web.Pages.Proveedores
{
    [Authorize]
    public class CuentaModel : PageModel
    {
        public void OnGet()
        {

        }
    }
}