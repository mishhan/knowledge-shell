using System;
using System.Net;
using System.Threading.Tasks;
using KnowledgeShell.Api.Exceptions;
using KnowledgeShell.Api.Models;
using KnowledgeShell.Api.Services.Token;
using Microsoft.AspNetCore.Identity;

namespace KnowledgeShell.Api.Services.Account;

internal class AccountService : IAccountService
{
    private readonly SignInManager<User> _signInManager;
    private readonly ITokenService _tokenService;
    private readonly UserManager<User> _userManager;

    public AccountService(UserManager<User> userManager, SignInManager<User> signInManager, ITokenService tokenService)
    {
        _userManager = userManager ?? throw new ArgumentNullException(nameof(userManager));
        _signInManager = signInManager ?? throw new ArgumentNullException(nameof(signInManager));
        _tokenService = tokenService ?? throw new ArgumentNullException(nameof(tokenService));
    }

    public async Task<bool> SignUp(string userName, string email, string password)
    {
        var user = new User { UserName = userName, Email = email };
        var identityResult = await _userManager.CreateAsync(user, password);
        if (!identityResult.Succeeded)
            throw new HttpException(HttpStatusCode.Conflict, "Unable to create user with given credentials");

        return true;
    }

    public async Task<User> Authenticate(string identification, string password)
    {
        var userByLogin = await _userManager.FindByNameAsync(identification);
        var userByEmail = await _userManager.FindByEmailAsync(identification);
        if (userByLogin == null && userByEmail == null)
            return null;

        var user = userByLogin ?? userByEmail;
        var signInResult = await _signInManager.CheckPasswordSignInAsync(user, password, false);
        if (signInResult.Succeeded)
            return user;
        return null;
    }

    public async Task<string> GenerateToken(string identification, string password)
    {
        var user = await Authenticate(identification, password);

        if (user == null)
            throw new HttpException(HttpStatusCode.Unauthorized, "Invalid credentials");

        var userToken = _tokenService.CreateToken(user);
        return userToken;
    }
}