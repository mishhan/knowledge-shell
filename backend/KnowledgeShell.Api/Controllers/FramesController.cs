using System;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Logging;
using JsonApiDotNetCore.Configuration;
using JsonApiDotNetCore.Controllers;
using JsonApiDotNetCore.Services;
using KnowledgeShell.Api.Models;

namespace KnowledgeShell.Api.Controllers;

[Authorize(AuthenticationSchemes = AuthScheme.SupportedSchemes)]
public class FramesController : JsonApiController<Frame, Guid>
{
    public FramesController(
        IJsonApiOptions jsonApiOptions,
        IResourceGraph resourceGraph,
        ILoggerFactory loggerFactory,
        IResourceService<Frame, Guid> resourceService)
        : base(jsonApiOptions, resourceGraph, loggerFactory, resourceService)
    {
    }
}