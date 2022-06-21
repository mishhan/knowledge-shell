using System;
using JsonApiDotNetCore.Resources.Annotations;
using Microsoft.AspNetCore.Identity;

namespace KnowledgeShell.Api.Models;

[NoResource]
public class UserRole : IdentityRole<Guid>
{
}