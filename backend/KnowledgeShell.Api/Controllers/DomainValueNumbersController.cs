namespace KnowledgeShell.Api.Controllers
{
    using System;
    using Microsoft.Extensions.Logging;
    using JsonApiDotNetCore.Services;
    using JsonApiDotNetCore.Controllers;
    using JsonApiDotNetCore.Configuration;
    using KnowledgeShell.Api.Models;

    public class DomainValueNumbersController : JsonApiController<DomainValueNumber, Guid>
    {
        public DomainValueNumbersController(
IJsonApiOptions jsonApiOptions,
ILoggerFactory loggerFactory,
IResourceService<DomainValueNumber, Guid> resourceService)
: base(jsonApiOptions, loggerFactory, resourceService)
        { }
    }
}
