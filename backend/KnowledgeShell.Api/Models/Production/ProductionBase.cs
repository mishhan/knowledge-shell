﻿namespace KnowledgeShell.Api.Models
{
    using System.Collections.Generic;
    using JsonApiDotNetCore.Resources.Annotations;

    public class ProductionBase : KnowledgeBase
    {
        [HasMany(PublicName = "domains")]
        public virtual List<Domain> Domains { get; set; }

        [HasMany(PublicName = "variables")]
        public virtual List<Variable> Variables { get; set; }

        [HasMany(PublicName = "rules")]
        public virtual List<Rule> Rules { get; set; }
    }
}
