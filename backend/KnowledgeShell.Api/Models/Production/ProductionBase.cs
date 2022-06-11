using System.Collections.Generic;
using JsonApiDotNetCore.Controllers;
using JsonApiDotNetCore.Resources.Annotations;

namespace KnowledgeShell.Api.Models;

[Resource(PublicName = "production-bases", GenerateControllerEndpoints = JsonApiEndpoints.None)]
public class ProductionBase : KnowledgeBase
{
    [HasMany(PublicName = "variables")] public virtual List<Variable> Variables { get; set; }

    [HasMany(PublicName = "rules")] public virtual List<Rule> Rules { get; set; }
}