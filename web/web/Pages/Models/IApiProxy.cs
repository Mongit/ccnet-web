using System.Net.Http;
using System.Threading.Tasks;

namespace web.Pages.Models
{
    public interface IApiProxy
    {
        Task<HttpResponseMessage> ServerCall(ApiProxyModel model);
    }
}
