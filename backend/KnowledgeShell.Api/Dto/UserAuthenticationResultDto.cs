namespace KnowledgeShell.Api.Dto
{
    using System.Text.Json.Serialization;

    public class UserAuthenticationResultDto
    {
        [JsonPropertyName("access_token")]
        public string AccessToken { get; set; }
    }
}
