namespace KnowledgeShell.Api.Controllers
{
    using System;
    using Microsoft.Extensions.Logging;
    using JsonApiDotNetCore.Services;
    using JsonApiDotNetCore.Controllers;
    using JsonApiDotNetCore.Configuration;
    using KnowledgeShell.Api.Models;

    public class DomainValueFramesController : JsonApiController<DomainValueFrame, Guid>
    {
        public DomainValueFramesController(
IJsonApiOptions jsonApiOptions,
ILoggerFactory loggerFactory,
IResourceService<DomainValueFrame, Guid> resourceService) 
: base(jsonApiOptions, loggerFactory, resourceService)
        { }
    }
}
