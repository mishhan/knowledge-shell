﻿using JsonApiDotNetCore.Controllers;
using JsonApiDotNetCore.Resources.Annotations;

namespace KnowledgeShell.Api.Models;

[Resource(PublicName = "domain-value-numbers", GenerateControllerEndpoints = JsonApiEndpoints.None)]
public class DomainValueNumber : DomainValue
{
    [Attr(PublicName = "value")] public double NumberValue { get; set; }
}