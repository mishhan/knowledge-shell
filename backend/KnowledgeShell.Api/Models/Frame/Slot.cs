using System;
using System.Collections.Generic;
using JsonApiDotNetCore.Controllers;
using JsonApiDotNetCore.Resources;
using JsonApiDotNetCore.Resources.Annotations;

namespace KnowledgeShell.Api.Models;

[Resource(PublicName = "slots", GenerateControllerEndpoints = JsonApiEndpoints.None)]
public class Slot : Identifiable<Guid>
{
    [Attr(PublicName = "name")] public string Name { get; set; }

    [Attr(PublicName = "isInherited")] public bool IsInherited { get; set; }

    [Attr(PublicName = "order")] public int Order { get; set; }

    [HasOne(PublicName = "owner")] public virtual Frame Owner { get; set; }

    public Guid OwnerId { get; set; }

    [HasOne(PublicName = "parent")] public virtual Slot Parent { get; set; }

    public Guid? ParentId { get; set; }

    [HasMany(PublicName = "children")] public virtual List<Slot> Children { get; set; }

    [HasOne(PublicName = "domain")] public virtual Domain Domain { get; set; }

    public Guid? DomainId { get; set; }

    [HasOne(PublicName = "value")] public virtual DomainValue Value { get; set; }

    public Guid? ValueId { get; set; }

    [HasOne(PublicName = "production")] public virtual Production Production { get; set; }
}