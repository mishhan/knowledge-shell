using System;
using System.Threading.Tasks;
using KnowledgeShell.Api.Dto;
using KnowledgeShell.Api.Services.Account;
using Microsoft.AspNetCore.Mvc;

namespace KnowledgeShell.Api.Controllers;

public class AccountController : ControllerBase
{
    private readonly IAccountService _accountService;

    public AccountController(IAccountService accountService)
    {
        _accountService = accountService ?? throw new ArgumentNullException(nameof(accountService));
    }

    [HttpPost("/sign-up")]
    public async Task<IActionResult> SignUp([FromBody] UserRegistrationDto userRegistrationDto)
    {
        await _accountService.SignUp(userRegistrationDto.UserName, userRegistrationDto.Email,
            userRegistrationDto.Password);
        return Ok();
    }

    [HttpPost("/token")]
    public async Task<ActionResult<UserAuthenticationResultDto>> Token(
        [FromForm] UserAuthenticationDto userAthenticationDto)
    {
        var userToken =
            await _accountService.GenerateToken(userAthenticationDto.UserName, userAthenticationDto.Password);
        var userAuthenticationDto = new UserAuthenticationResultDto { AccessToken = userToken };
        return Ok(userAuthenticationDto);
    }
}