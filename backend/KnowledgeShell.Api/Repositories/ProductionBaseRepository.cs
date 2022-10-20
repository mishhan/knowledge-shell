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

public class ProductionBaseRepository : EntityFrameworkCoreRepository<ProductionBase, Guid>
{
    private readonly IAuthenticationService _authenticationService;

    public ProductionBaseRepository(IAuthenticationService authenticationService, ITargetedFields targetedFields,
        IDbContextResolver contextResolver, IResourceGraph resourceGraph, IResourceFactory resourceFactory,
        IEnumerable<IQueryConstraintProvider> constraintProviders, ILoggerFactory loggerFactory,
        IResourceDefinitionAccessor resourceDefinitionAccessor)
        : base(targetedFields, contextResolver, resourceGraph, resourceFactory, constraintProviders, loggerFactory,
            resourceDefinitionAccessor)
    {
        _authenticationService =
            authenticationService ?? throw new ArgumentNullException(nameof(authenticationService));
    }

    protected override IQueryable<ProductionBase> GetAll()
    {
        var userId = _authenticationService.GetUserId();
        var productionBases = base.GetAll();
        var userProductionBases = productionBases.Where(productionBase => productionBase.OwnerId == userId);
        return userProductionBases;
    }


    public override async Task<ProductionBase> GetForCreateAsync(Type resourceClrType, Guid id,
        CancellationToken cancellationToken)
    {
        var productionBase = await base.GetForCreateAsync(resourceClrType, id, cancellationToken);
        var userId = _authenticationService.GetUserId();
        productionBase.OwnerId = userId;
        return productionBase;
    }
}