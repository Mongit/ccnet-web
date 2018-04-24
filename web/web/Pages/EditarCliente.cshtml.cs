using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace web.Pages
{
    [Authorize]
    public class EditarClienteModel : PageModel
    {
        public void OnGet()
        {

        }
    }
}