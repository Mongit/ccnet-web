using Newtonsoft.Json;

namespace web.Pages.Auth
{
    public class LoginModel
    {
        [JsonProperty(PropertyName = "email")]
        public string Email { get; set; }
        [JsonProperty(PropertyName = "password")]
        public string Password { get; set; }
    }
}
