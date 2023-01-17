using System;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Logging;
using JsonApiDotNetCore.Configuration;
using JsonApiDotNetCore.Controllers;
using JsonApiDotNetCore.Services;
using KnowledgeShell.Api.Models;

namespace KnowledgeShell.Api.Controllers;

[Authorize(AuthenticationSchemes = AuthScheme.SupportedSchemes)]
public class DomainValueNumbersController : JsonApiController<DomainValueNumber, Guid>
{
    public DomainValueNumbersController(
        IJsonApiOptions jsonApiOptions,
        IResourceGraph resourceGraph,
        ILoggerFactory loggerFactory,
        IResourceService<DomainValueNumber, Guid> resourceService)
        : base(jsonApiOptions, resourceGraph, loggerFactory, resourceService)
    {
    }
}