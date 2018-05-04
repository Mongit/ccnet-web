using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace web.Pages.Productos
{
    [Authorize]
    public class ProductoModel : PageModel
    {
        public void OnGet()
        {

        }
    }
}