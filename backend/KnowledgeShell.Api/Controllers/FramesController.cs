namespace KnowledgeShell.Api.Controllers
{
    using System;
    using Microsoft.Extensions.Logging;
    using JsonApiDotNetCore.Services;
    using JsonApiDotNetCore.Controllers;
    using JsonApiDotNetCore.Configuration;
    using KnowledgeShell.Api.Models;

    public class FramesController : JsonApiController<Frame, Guid>
    {
        public FramesController(
IJsonApiOptions jsonApiOptions,
ILoggerFactory loggerFactory,
IResourceService<Frame, Guid> resourceService)
: base(jsonApiOptions, loggerFactory, resourceService)
        { }
    }
}
