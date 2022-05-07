namespace KnowledgeShell.Api.Models
{
    using System;
    using Microsoft.AspNetCore.Identity;
    using JsonApiDotNetCore.Resources.Annotations;

    [NoResource]
    public class UserRole : IdentityRole<Guid> {}
}
