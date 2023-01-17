using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace KnowledgeShell.Api;

internal class AuthScheme
{
    public const string Basic = "Basic";
    public const string SupportedSchemes = $"{JwtBearerDefaults.AuthenticationScheme},{Basic}";
}
