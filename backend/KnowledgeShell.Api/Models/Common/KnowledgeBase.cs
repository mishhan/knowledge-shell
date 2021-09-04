namespace KnowledgeShell.Api.Models
{
    using System;
    using System.Collections.Generic;
    using JsonApiDotNetCore.Resources;
    using JsonApiDotNetCore.Resources.Annotations;

    public class KnowledgeBase : Identifiable<Guid>
    {
        [Attr(PublicName = "name")]
        public string Name { get; set; }

        [Attr(PublicName = "createdAt")]
        public DateTime CreatedAt { get; set; }

        [Attr(PublicName = "updatedAt")]
        public DateTime UpdatedAt { get; set; }

        [HasMany(PublicName = "domains")]
        public virtual List<Domain> Domains { get; set; }

        public virtual User Owner { get; set; }
        public Guid OwnerId { get; set; }
    }
}
