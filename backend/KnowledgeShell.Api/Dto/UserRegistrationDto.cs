using System.ComponentModel.DataAnnotations;

namespace KnowledgeShell.Api.Dto;

public class UserRegistrationDto
{
    [Required] public string UserName { get; set; }

    [EmailAddress] public string Email { get; set; }

    [Required]
    [DataType(DataType.Password)]
    [RegularExpression("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$",
        ErrorMessage =
            "Password must contain at least 8 characters including letters, numbers and special characters in both cases")]
    public string Password { get; set; }
}