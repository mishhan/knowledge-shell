namespace KnowledgeShell.Api.Models
{
    using System;
    using System.Collections.Generic;
    using JsonApiDotNetCore.Resources;
    using JsonApiDotNetCore.Resources.Annotations;

    public class Domain : Identifiable<Guid>
    {
        [Attr(PublicName = "name")]
        public string Name { get; set; }

        [HasMany(PublicName = "domainValues")]
        public virtual List<DomainValue> DomainValues { get; set; }

        [Attr(PublicName = "isReadOnly")]
        public bool IsReadOnly { get; set; }

        [HasOne(PublicName = "frameBase")]
        public virtual FrameBase FrameBase { get; set; }
        public Guid FrameBaseId { get; set; }
    }
}