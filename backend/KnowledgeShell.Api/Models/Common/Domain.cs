using System;
using System.Collections.Generic;
using JsonApiDotNetCore.Controllers;
using JsonApiDotNetCore.Resources;
using JsonApiDotNetCore.Resources.Annotations;

namespace KnowledgeShell.Api.Models;

[Resource(PublicName = "domains", GenerateControllerEndpoints = JsonApiEndpoints.None)]
public class Domain : Identifiable<Guid>
{
    [Attr(PublicName = "name")] public string Name { get; set; }

    [Attr(PublicName = "domainType")] public DomainType DomainType { get; set; }

    [Attr(PublicName = "isReadOnly")] public bool IsReadOnly { get; set; }

    [Attr(PublicName = "description")] public string Description { get; set; }

    [HasMany(PublicName = "domainValues")] public virtual List<DomainValue> DomainValues { get; set; }

    [HasOne(PublicName = "knowledgeBase")] public virtual KnowledgeBase KnowledgeBase { get; set; }

    public Guid KnowledgeBaseId { get; set; }
}