using System;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Logging;
using JsonApiDotNetCore.Configuration;
using JsonApiDotNetCore.Controllers;
using JsonApiDotNetCore.Services;
using KnowledgeShell.Api.Models;

namespace KnowledgeShell.Api.Controllers;

[Authorize(AuthenticationSchemes = AuthScheme.SupportedSchemes)]
public class ProductionsController : JsonApiController<Production, Guid>
{
    public ProductionsController(
        IJsonApiOptions jsonApiOptions,
        IResourceGraph resourceGraph,
        ILoggerFactory loggerFactory,
        IResourceService<Production, Guid> resourceService)
        : base(jsonApiOptions, resourceGraph, loggerFactory, resourceService)
    {
    }
}