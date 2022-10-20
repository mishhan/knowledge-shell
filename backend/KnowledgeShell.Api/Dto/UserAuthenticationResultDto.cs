using System.Text.Json.Serialization;

namespace KnowledgeShell.Api.Dto;

public class UserAuthenticationResultDto
{
    [JsonPropertyName("access_token")] public string AccessToken { get; set; }
}