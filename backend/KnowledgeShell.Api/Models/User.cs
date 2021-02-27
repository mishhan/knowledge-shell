namespace KnowledgeShell.Api.Models
{
    using System;
    using System.Collections.Generic;
    using Microsoft.AspNetCore.Identity;

    public class User : IdentityUser<Guid> 
    {
        public virtual List<FrameBase> FrameBases { get; set; }
    }
}
