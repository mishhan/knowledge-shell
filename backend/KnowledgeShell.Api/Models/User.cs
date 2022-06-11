using System;
using System.Collections.Generic;
using JsonApiDotNetCore.Resources.Annotations;
using Microsoft.AspNetCore.Identity;

namespace KnowledgeShell.Api.Models;

[NoResource]
public class User : IdentityUser<Guid>
{
    public virtual List<KnowledgeBase> KnowledgeBases { get; set; }
}