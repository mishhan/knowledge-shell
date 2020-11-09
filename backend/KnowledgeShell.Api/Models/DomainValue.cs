namespace KnowledgeShell.Api.Models
{
    using System;
    using JsonApiDotNetCore.Resources;
    using JsonApiDotNetCore.Resources.Annotations;

    public class DomainValue : Identifiable<Guid>
    {
        [Attr(PublicName = "order")]
        public int Order { get; set; }

        [HasOne(PublicName = "domain")]
        public virtual Domain Domain { get; set; }
        public Guid DomainId { get; set; }
    }
}