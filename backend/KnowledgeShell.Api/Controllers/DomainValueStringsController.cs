namespace KnowledgeShell.Api.Controllers
{
    using System;
    using Microsoft.Extensions.Logging;
    using JsonApiDotNetCore.Services;
    using JsonApiDotNetCore.Controllers;
    using JsonApiDotNetCore.Configuration;
    using KnowledgeShell.Api.Models;

    public class DomainValueStringsController : JsonApiController<DomainValueString, Guid>
    {
        public DomainValueStringsController(
IJsonApiOptions jsonApiOptions,
ILoggerFactory loggerFactory,
IResourceService<DomainValueString, Guid> resourceService)
: base(jsonApiOptions, loggerFactory, resourceService)
        { }
    }
}
