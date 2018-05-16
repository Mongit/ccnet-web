using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace web.Pages.Stock
{
    [Authorize]
    public class StockModel : PageModel
    {
        public void OnGet()
        {

        }
    }
}