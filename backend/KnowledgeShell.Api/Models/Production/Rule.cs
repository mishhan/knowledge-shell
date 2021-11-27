namespace KnowledgeShell.Api.Models
{
    using System;
    using JsonApiDotNetCore.Resources;
    using JsonApiDotNetCore.Resources.Annotations;

    public class Rule : Identifiable<Guid>
    {
        [Attr(PublicName = "name")]
        public string Name { get; set; }

        [Attr(PublicName = "order")]
        public int Order { get; set; }

        [Attr(PublicName = "reason")]
        public string Reason { get; set; }

        [Attr(PublicName = "premise")]
        public string Premise { get; set; }

        [Attr(PublicName = "consequence")]
        public string Consequence { get; set; }

        [HasOne(PublicName = "productionBase")]
        public virtual ProductionBase ProductionBase { get; set; }
        public Guid ProductionBaseId { get; set; }
    }
}
