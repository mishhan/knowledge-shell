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
public class ProductionBasesController : JsonApiController<ProductionBase, Guid>
{
    public ProductionBasesController(
        IJsonApiOptions jsonApiOptions,
        IResourceGraph resourceGraph,
        ILoggerFactory loggerFactory,
        IResourceService<ProductionBase, Guid> resourceService)
        : base(jsonApiOptions, resourceGraph, loggerFactory, resourceService)
    {
    }
}