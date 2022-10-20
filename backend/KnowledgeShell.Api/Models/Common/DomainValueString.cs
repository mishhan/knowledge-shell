using JsonApiDotNetCore.Controllers;
using JsonApiDotNetCore.Resources.Annotations;

namespace KnowledgeShell.Api.Models;

[Resource(PublicName = "domain-value-strings", GenerateControllerEndpoints = JsonApiEndpoints.None)]
public class DomainValueString : DomainValue
{
    [Attr(PublicName = "value")] public string StringValue { get; set; }
}