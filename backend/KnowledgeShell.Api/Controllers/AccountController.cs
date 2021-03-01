namespace KnowledgeShell.Api.Controllers
{
    using System;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Identity;
    using KnowledgeShell.Api.Models;
    using KnowledgeShell.Api.Services.Token;

    public class AccountController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly ITokenService _tokenService;

        public AccountController(UserManager<User> userManager, SignInManager<User> signInManager, ITokenService tokenService)
        {
            _userManager = userManager ?? throw new ArgumentNullException(nameof(userManager));
            _signInManager = signInManager ?? throw new ArgumentNullException(nameof(signInManager));
            _tokenService = tokenService ?? throw new ArgumentNullException(nameof(tokenService));
        }

        [HttpPost("/token")]
        public async Task<IActionResult> Token(string username, string password)
        {
            var userByLogin = await _userManager.FindByNameAsync(username);
            var userByEmail = await _userManager.FindByEmailAsync(username);
            if (userByLogin == null && userByEmail == null)
            {
                return BadRequest(new { errorText = "Invalid username" });
            }

            var user = userByLogin ?? userByEmail;

            var signInResult = await _signInManager.CheckPasswordSignInAsync(user, password, false);
            if (!signInResult.Succeeded)
            {
                return BadRequest(new { errorText = "Invalid password" });
            }

            var userToken = _tokenService.CreateToken(user);

            return Ok(new { access_token = userToken });
        }
    }
}
