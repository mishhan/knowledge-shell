namespace KnowledgeShell.Api.Models
{
    using JsonApiDotNetCore.Resources.Annotations;

    [Resource("domain-value-strings")]
    public class DomainValueString : DomainValue
    {
        [Attr(PublicName = "value")]
        public string Value { get; set; }
    }
}
