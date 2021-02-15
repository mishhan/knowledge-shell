namespace KnowledgeShell.Api.Models
{
    using JsonApiDotNetCore.Resources.Annotations;

    [Resource("domain-value-numbers")]
    public class DomainValueNumber : DomainValue
    {
        [Attr(PublicName = "value")]
        public double NumberValue { get; set; }
    }
}
