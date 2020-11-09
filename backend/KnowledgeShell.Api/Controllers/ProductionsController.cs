namespace KnowledgeShell.Api.Controllers
{
    using System;
    using Microsoft.Extensions.Logging;
    using JsonApiDotNetCore.Services;
    using JsonApiDotNetCore.Controllers;
    using JsonApiDotNetCore.Configuration;
    using KnowledgeShell.Api.Models;

    public class ProductionsController : JsonApiController<Production, Guid>
    {
        public ProductionsController(
IJsonApiOptions jsonApiOptions,
ILoggerFactory loggerFactory,
IResourceService<Production, Guid> resourceService)
: base(jsonApiOptions, loggerFactory, resourceService)
        { }
    }
}
