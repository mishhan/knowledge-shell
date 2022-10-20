using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;

namespace KnowledgeShell.Api.ProgramConfiguration;

internal static class AuthenticationConfigurationcs
{
    public static void ConfigureAuthentication(this IServiceCollection services, string secretKey)
    {
        services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
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