namespace KnowledgeShell.Api.Models
{
    using System;
    using JsonApiDotNetCore.Resources;
    using JsonApiDotNetCore.Resources.Annotations;

    public class Production : Identifiable<Guid>
    {
        [Attr(PublicName = "text")]
        public string Text { get; set; }

        [HasOne(PublicName = "slot")]
        public virtual Slot Slot { get; set; }
        public Guid SlotId { get; set; }
    }
}
