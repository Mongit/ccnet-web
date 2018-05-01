using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace web.Pages.Proveedores
{
    [Authorize]
    public class NuevoProveedorModel : PageModel
    {
        public void OnGet()
        {

        }
    }
}