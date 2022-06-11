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
public class VariablesController : JsonApiController<Variable, Guid>
{
    public VariablesController(
        IJsonApiOptions jsonApiOptions,
        IResourceGraph resourceGraph,
        ILoggerFactory loggerFactory,
        IResourceService<Variable, Guid> resourceService)
        : base(jsonApiOptions, resourceGraph, loggerFactory, resourceService)
    {
    }
}