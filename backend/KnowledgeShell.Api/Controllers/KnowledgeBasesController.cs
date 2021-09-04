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
    public class KnowledgeBasesController : JsonApiController<KnowledgeBase, Guid>
    {
        public KnowledgeBasesController(
IJsonApiOptions jsonApiOptions,
ILoggerFactory loggerFactory,
IResourceService<KnowledgeBase, Guid> resourceService)
: base(jsonApiOptions, loggerFactory, resourceService)
        { }
    }
}
