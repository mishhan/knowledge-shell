using System;
using JsonApiDotNetCore.Controllers;
using JsonApiDotNetCore.Resources.Annotations;

namespace KnowledgeShell.Api.Models;

[Resource(PublicName = "domain-value-frames", GenerateControllerEndpoints = JsonApiEndpoints.None)]
public class DomainValueFrame : DomainValue
{
    [HasOne(PublicName = "value")] public virtual Frame FrameValue { get; set; }

    public Guid FrameValueId { get; set; }
}