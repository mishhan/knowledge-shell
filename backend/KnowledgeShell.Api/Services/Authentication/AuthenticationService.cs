using System;
using KnowledgeShell.Api.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;

namespace KnowledgeShell.Api.Services.Authentication;

internal class AuthenticationService : IAuthenticationService
{
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly UserManager<User> _userManager;

    public AuthenticationService(IHttpContextAccessor httpContextAccessor, UserManager<User> userManager)
    {
        _httpContextAccessor = httpContextAccessor ?? throw new ArgumentNullException(nameof(httpContextAccessor));
        _userManager = userManager ?? throw new ArgumentNullException(nameof(userManager));
    }

    public string GetStringUserId()
    {
        return _userManager.GetUserId(_httpContextAccessor.HttpContext.User);
    }

    public Guid GetUserId()
    {
        var userIdString = _userManager.GetUserId(_httpContextAccessor.HttpContext.User);
        var userId = Guid.Parse(userIdString);
        return userId;
    }
}