using System;
using JsonApiDotNetCore.Controllers;
using JsonApiDotNetCore.Resources;
using JsonApiDotNetCore.Resources.Annotations;

namespace KnowledgeShell.Api.Models;

[Resource(PublicName = "domain-values", GenerateControllerEndpoints = JsonApiEndpoints.None)]
public class DomainValue : Identifiable<Guid>
{
    [Attr(PublicName = "order")] public int Order { get; set; }

    [HasOne(PublicName = "domain")] public virtual Domain Domain { get; set; }

    public Guid DomainId { get; set; }
}