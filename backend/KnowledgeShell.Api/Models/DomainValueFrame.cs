namespace KnowledgeShell.Api.Models
{
    using System;
    using JsonApiDotNetCore.Resources.Annotations;

    [Resource("domain-value-frames")]
    public class DomainValueFrame : DomainValue
    {
        [HasOne(PublicName = "value")]
        public virtual Frame Value { get; set; }
        public Guid ValueId { get; set; }
    }
}
