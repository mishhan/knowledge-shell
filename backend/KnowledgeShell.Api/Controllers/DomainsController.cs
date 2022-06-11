using System;
using JsonApiDotNetCore.Configuration;
using JsonApiDotNetCore.Controllers;
using JsonApiDotNetCore.Services;
using KnowledgeShell.Api.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Logging;

namespace KnowledgeShell.Api.Controllers;

[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
public class DomainsController : JsonApiController<Domain, Guid>
{
    public DomainsController(
        IJsonApiOptions jsonApiOptions,
        IResourceGraph resourceGraph,
        ILoggerFactory loggerFactory,
        IResourceService<Domain, Guid> resourceService)
        : base(jsonApiOptions, resourceGraph, loggerFactory, resourceService)
    {
    }
}