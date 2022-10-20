using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using JsonApiDotNetCore.Configuration;
using JsonApiDotNetCore.Queries;
using JsonApiDotNetCore.Repositories;
using JsonApiDotNetCore.Resources;
using KnowledgeShell.Api.Models;
using KnowledgeShell.Api.Services.Authentication;
using Microsoft.Extensions.Logging;

namespace KnowledgeShell.Api.Repositories;

public class FrameBaseRepository : EntityFrameworkCoreRepository<FrameBase, Guid>
{
    private readonly IAuthenticationService _authenticationService;

    public FrameBaseRepository(IAuthenticationService authenticationService, ITargetedFields targetedFields,
        IDbContextResolver contextResolver, IResourceGraph resourceGraph, IResourceFactory resourceFactory,
        IEnumerable<IQueryConstraintProvider> constraintProviders, ILoggerFactory loggerFactory,
        IResourceDefinitionAccessor resourceDefinitionAccessor)
        : base(targetedFields, contextResolver, resourceGraph, resourceFactory, constraintProviders, loggerFactory,
            resourceDefinitionAccessor)
    {
        _authenticationService =
            authenticationService ?? throw new ArgumentNullException(nameof(authenticationService));
    }

    protected override IQueryable<FrameBase> GetAll()
    {
        var userId = _authenticationService.GetUserId();
        var frameBases = base.GetAll();
        var userFrameBases = frameBases.Where(frameBase => frameBase.OwnerId == userId);
        return userFrameBases;
    }

    public override async Task<FrameBase> GetForCreateAsync(Type resourceClrType, Guid id,
        CancellationToken cancellationToken)
    {
        var frameBase = await base.GetForCreateAsync(resourceClrType, id, cancellationToken);
        var userId = _authenticationService.GetUserId();
        frameBase.OwnerId = userId;
        return frameBase;
    }
}