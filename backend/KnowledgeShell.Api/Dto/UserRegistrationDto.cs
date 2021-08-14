namespace KnowledgeShell.Api.Dto
{
    using System.ComponentModel.DataAnnotations;

    public class UserRegistrationDto
    {
        [Required]
        public string UserName { get; set; }

        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [DataType(DataType.Password)]
        [RegularExpression("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$")]
        public string Password { get; set; }
    }
}
