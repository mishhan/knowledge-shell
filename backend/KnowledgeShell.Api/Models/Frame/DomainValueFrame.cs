namespace KnowledgeShell.Api.Models
{
    using System;
    using JsonApiDotNetCore.Resources.Annotations;

    [Resource("domain-value-frames")]
    public class DomainValueFrame : DomainValue
    {
        [HasOne(PublicName = "value")]
        public virtual Frame FrameValue { get; set; }
        public Guid FrameValueId { get; set; }
    }
}
