namespace KnowledgeShell.Api.Models
{
    using System;
    using JsonApiDotNetCore.Resources;
    using JsonApiDotNetCore.Resources.Annotations;

    public class Position : Identifiable<Guid>
    {
        [Attr(PublicName = "x")]
        public double X { get; set; }
        [Attr(PublicName = "y")]
        public double Y { get; set; }
    }
}
