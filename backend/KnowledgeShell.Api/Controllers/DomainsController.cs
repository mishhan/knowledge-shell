namespace KnowledgeShell.Api.Controllers
{
    using System;
    using Microsoft.Extensions.Logging;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Authentication.JwtBearer;
    using JsonApiDotNetCore.Services;
    using JsonApiDotNetCore.Controllers;
    using JsonApiDotNetCore.Configuration;
    using KnowledgeShell.Api.Models;

    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class DomainsController : JsonApiController<Domain, Guid>
    {
        public DomainsController(
IJsonApiOptions jsonApiOptions,
IResourceGraph resourceGraph,
ILoggerFactory loggerFactory,
IResourceService<Domain, Guid> resourceService)
: base(jsonApiOptions, resourceGraph, loggerFactory, resourceService)
        { }
    }
}
