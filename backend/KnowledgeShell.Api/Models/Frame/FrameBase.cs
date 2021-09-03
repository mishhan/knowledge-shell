namespace KnowledgeShell.Api.Models
{
    using System.Collections.Generic;
    using JsonApiDotNetCore.Resources.Annotations;

    [Resource("frame-bases")]
    public class FrameBase : KnowledgeBase
    {
        [HasMany(PublicName = "frames")]
        public virtual List<Frame> Frames { get; set; }

        [HasMany(PublicName = "domains")]
        public virtual List<Domain> Domains { get; set; }
    }
}
