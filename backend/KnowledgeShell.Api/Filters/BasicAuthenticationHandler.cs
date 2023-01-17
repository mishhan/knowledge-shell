using System;
using System.Text;
using System.Threading.Tasks;
using System.Text.Encodings.Web;
using System.Security.Claims;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authentication;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using KnowledgeShell.Api.Services.Account;

namespace KnowledgeShell.Api.Filters;

internal class BasicAuthenticationHandler : AuthenticationHandler<AuthenticationSchemeOptions>
{
    private readonly IAccountService _accountService;

    public BasicAuthenticationHandler(
        IOptionsMonitor<AuthenticationSchemeOptions> options,
        ILoggerFactory logger,
        UrlEncoder encoder,
        ISystemClock clock,
        IAccountService accountService)
        : base(options, logger, encoder, clock)
    {
        _accountService = accountService ?? throw new ArgumentNullException(nameof(accountService));
    }

    protected override async Task<AuthenticateResult> HandleAuthenticateAsync()
    {
        var authHeader = Request.Headers["Authorization"].ToString();
        var hasBasicAuthData = authHeader.StartsWith("basic", StringComparison.OrdinalIgnoreCase);
        if (!hasBasicAuthData)
        {
            Response.StatusCode = 401;
            Response.Headers.Add("WWW-Authenticate", "Basic");
            return AuthenticateResult.Fail("Invalid Authorization Header");
        }

        var authToken = authHeader["Basic ".Length..].Trim();
        var credentialsString = Encoding.UTF8.GetString(Convert.FromBase64String(authToken));
        var credentials = credentialsString.Split(':');
        var identification = credentials[0];
        var password = credentials[1];
        var user = await _accountService.Authenticate(identification, password);
        if (user == null)
            return AuthenticateResult.Fail("Invalid credentials");

        var claims = new List<Claim>
        {
            new(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new(ClaimTypes.Name, user.UserName)
        };
        var identity = new ClaimsIdentity(claims, "Basic");
        var claimsPrincipal = new ClaimsPrincipal(identity);
        return AuthenticateResult.Success(new AuthenticationTicket(claimsPrincipal, Scheme.Name));
    }
}

