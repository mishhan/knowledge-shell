namespace KnowledgeShell.Api.Controllers
{
    using System;
    using Microsoft.Extensions.Logging;
    using JsonApiDotNetCore.Services;
    using JsonApiDotNetCore.Controllers;
    using JsonApiDotNetCore.Configuration;
    using KnowledgeShell.Api.Models;

    public class SlotsController : JsonApiController<Slot, Guid>
    {
        public SlotsController(
IJsonApiOptions jsonApiOptions,
ILoggerFactory loggerFactory,
IResourceService<Slot, Guid> resourceService)
: base(jsonApiOptions, loggerFactory, resourceService)
        { }
    }
}
