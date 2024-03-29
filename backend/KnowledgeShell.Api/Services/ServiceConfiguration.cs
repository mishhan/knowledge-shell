﻿using KnowledgeShell.Api.Services.Account;
using KnowledgeShell.Api.Services.Authentication;
using KnowledgeShell.Api.Services.Token;
using Microsoft.Extensions.DependencyInjection;

namespace KnowledgeShell.Api.Services;

internal static class ServiceConfiguration
{
    public static void ConfigureAppServices(this IServiceCollection services)
    {
        services.AddScoped<IAuthenticationService, AuthenticationService>();
        services.AddScoped<ITokenService, JwtTokenService>();
        services.AddScoped<IAccountService, AccountService>();
    }
}