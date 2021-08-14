﻿namespace KnowledgeShell.Api.Dto
{
    using System.ComponentModel.DataAnnotations;

    public class UserAuthenticationDto
    {
        [Required]
        public string UserName { get; set; }

        [Required]
        public string Password { get; set; }
    }
}
