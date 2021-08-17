namespace KnowledgeShell.Api.Services
{
    using Microsoft.Extensions.DependencyInjection;
    using KnowledgeShell.Api.Services.Authentication;
    using KnowledgeShell.Api.Services.Token;
    using KnowledgeShell.Api.Services.Account;

    public static class ServiceConfiguration
    {
        public static void ConfigureServices(this IServiceCollection services)
        {
            services.AddScoped<IAuthenticationService, AuthenticationService>();
            services.AddScoped<ITokenService, JwtTokenService>();
            services.AddScoped<IAccountService, AccountService>();
        }
    }
}
