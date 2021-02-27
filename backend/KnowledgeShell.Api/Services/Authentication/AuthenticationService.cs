namespace KnowledgeShell.Api.Services.Authentication
{
    using System;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Identity;

    using KnowledgeShell.Api.Models;

    internal class AuthenticationService : IAuthenticationService
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly UserManager<User> _userManager;

        public AuthenticationService(IHttpContextAccessor httpContextAccessor, UserManager<User> userManager)
        {
            _httpContextAccessor = httpContextAccessor ?? throw new ArgumentNullException(nameof(httpContextAccessor));
            _userManager = userManager ?? throw new ArgumentNullException(nameof(userManager));
        }

        public string GetUserId()
        {
            return _userManager.GetUserId(_httpContextAccessor.HttpContext.User);
        }
    }
}
