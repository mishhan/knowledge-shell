namespace KnowledgeShell.Api.ProgramConfiguration
{
    using System.Text;
    using Microsoft.Extensions.DependencyInjection;
    using Microsoft.AspNetCore.Authentication.JwtBearer;
    using Microsoft.IdentityModel.Tokens;

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
                    IssuerSigningKey = signingKey,

                };
            });
        }
    }
}
