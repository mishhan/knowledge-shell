using System;
using JsonApiDotNetCore.Controllers;
using JsonApiDotNetCore.Resources;
using JsonApiDotNetCore.Resources.Annotations;

namespace KnowledgeShell.Api.Models;

[Resource(PublicName = "positions", GenerateControllerEndpoints = JsonApiEndpoints.None)]
public class Position : Identifiable<Guid>
{
    [Attr(PublicName = "x")] public double X { get; set; }

    [Attr(PublicName = "y")] public double Y { get; set; }
}