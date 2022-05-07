namespace KnowledgeShell.Api.Models
{
    using System;
    using JsonApiDotNetCore.Controllers;
    using JsonApiDotNetCore.Resources;
    using JsonApiDotNetCore.Resources.Annotations;

    [Resource(PublicName = "variables", GenerateControllerEndpoints = JsonApiEndpoints.None)]
    public class Variable : Identifiable<Guid>
    {
        [Attr(PublicName = "name")]
        public string Name { get; set; }

        [Attr(PublicName = "question")]
        public string Question { get; set; }

        [Attr(PublicName = "variableType")]
        public VariableType VariableType { get; set; }

        [HasOne(PublicName = "domain")]
        public virtual Domain Domain { get; set; }
        public Guid? DomainId { get; set; }

        [HasOne(PublicName = "productionBase")]
        public virtual ProductionBase ProductionBase { get; set; }
        public Guid ProductionBaseId { get; set; }
    }
}
