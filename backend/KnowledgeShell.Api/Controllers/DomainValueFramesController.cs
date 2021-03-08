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
