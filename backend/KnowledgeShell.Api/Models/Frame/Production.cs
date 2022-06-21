using System;
using JsonApiDotNetCore.Controllers;
using JsonApiDotNetCore.Resources;
using JsonApiDotNetCore.Resources.Annotations;

namespace KnowledgeShell.Api.Models;

[Resource(PublicName = "productions", GenerateControllerEndpoints = JsonApiEndpoints.None)]
public class Production : Identifiable<Guid>
{
    [Attr(PublicName = "text")] public string Text { get; set; }

    [HasOne(PublicName = "slot")] public virtual Slot Slot { get; set; }

    public Guid SlotId { get; set; }
}