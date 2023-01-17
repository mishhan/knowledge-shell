using System.Text;
using KnowledgeShell.Api.Filters;
using Microsoft.AspNetCore.Authentication;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;

namespace KnowledgeShell.Api.ProgramConfiguration;

internal static class AuthenticationConfigurationcs
{
    public static void ConfigureAuthentication(this IServiceCollection services, string secretKey)
    {
        services.AddAuthentication()
            .AddScheme<AuthenticationSchemeOptions, BasicAuthenticationHandler>
                (AuthScheme.Basic, null)
            .AddJwtBearer(options =>
            {
                options.RequireHttpsMetadata = false;
                var signingKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    IssuerSigningKey = signingKey
                };
            });
    }
}