namespace KnowledgeShell.Api.Models
{
    using System;
    using System.Collections.Generic;
    using Microsoft.AspNetCore.Identity;
    using JsonApiDotNetCore.Resources.Annotations;

    [NoResource]
    public class User : IdentityUser<Guid> 
    {
        public virtual List<KnowledgeBase> KnowledgeBases { get; set; }
    }
}
