using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace web.Pages.Productos
{
    [Authorize]
    public class ProductosQRModel : PageModel
    {
        public void OnGet()
        {

        }
    }
}