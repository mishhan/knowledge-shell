﻿using System;
using System.Collections.Generic;
using JsonApiDotNetCore.Controllers;
using JsonApiDotNetCore.Resources;
using JsonApiDotNetCore.Resources.Annotations;

namespace KnowledgeShell.Api.Models;

[Resource(PublicName = "frames", GenerateControllerEndpoints = JsonApiEndpoints.None)]
public class Frame : Identifiable<Guid>
{
    [Attr(PublicName = "name")] public string Name { get; set; }

    [HasOne(PublicName = "position")] public virtual Position Position { get; set; }

    public Guid PositionId { get; set; }

    [HasOne(PublicName = "parent")] public virtual Frame Parent { get; set; }

    public Guid? ParentId { get; set; }

    [HasMany(PublicName = "children")] public virtual List<Frame> Children { get; set; }

    [HasMany(PublicName = "ownSlots")] public virtual List<Slot> OwnSlots { get; set; }

    [HasOne(PublicName = "frameBase")] public virtual FrameBase FrameBase { get; set; }

    public Guid FrameBaseId { get; set; }
}