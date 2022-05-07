namespace KnowledgeShell.Api.Models
{
    using System.Collections.Generic;
    using JsonApiDotNetCore.Controllers;
    using JsonApiDotNetCore.Resources.Annotations;

    [Resource(PublicName = "frame-bases", GenerateControllerEndpoints = JsonApiEndpoints.None)]
    public class FrameBase : KnowledgeBase
    {
        [HasMany(PublicName = "frames")]
        public virtual List<Frame> Frames { get; set; }
    }
}
