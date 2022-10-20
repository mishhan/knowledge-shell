using System.ComponentModel.DataAnnotations;

namespace KnowledgeShell.Api.Dto;

public class UserAuthenticationDto
{
    [Required] public string UserName { get; set; }

    [Required] public string Password { get; set; }
}