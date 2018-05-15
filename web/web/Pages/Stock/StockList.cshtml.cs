using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace web.Pages.Stock
{
    [Authorize]
    public class StockListModel : PageModel
    {
        public void OnGet()
        {

        }
    }
}