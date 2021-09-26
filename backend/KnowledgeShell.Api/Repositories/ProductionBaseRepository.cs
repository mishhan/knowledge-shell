﻿namespace KnowledgeShell.Api.Repositories
{
    using System;
    using System.Linq;
    using System.Threading;
    using System.Threading.Tasks;
    using System.Collections.Generic;
    using Microsoft.Extensions.Logging;
    using JsonApiDotNetCore.Queries;
    using JsonApiDotNetCore.Resources;
    using JsonApiDotNetCore.Repositories;
    using JsonApiDotNetCore.Configuration;
    using KnowledgeShell.Api.Models;
    using KnowledgeShell.Api.Services.Authentication;

    public class ProductionBaseRepository : EntityFrameworkCoreRepository<ProductionBase, Guid>
    {
        private readonly IAuthenticationService _authenticationService;

        public ProductionBaseRepository(IAuthenticationService authenticationService, ITargetedFields targetedFields,
            IDbContextResolver contextResolver, IResourceGraph resourceGraph, IResourceFactory resourceFactory,
            IEnumerable<IQueryConstraintProvider> constraintProviders, ILoggerFactory loggerFactory)
            : base(targetedFields, contextResolver, resourceGraph, resourceFactory, constraintProviders, loggerFactory)
        {
            _authenticationService = authenticationService ?? throw new ArgumentNullException(nameof(authenticationService));
        }

        protected override IQueryable<ProductionBase> GetAll()
        {
            var userId = _authenticationService.GetUserId();
            var productionBases = base.GetAll();
            var userProductionBases = productionBases.Where(frameBase => frameBase.OwnerId == userId);
            return userProductionBases;
        }

        public override async Task<ProductionBase> GetForCreateAsync(Guid id, CancellationToken cancellationToken)
        {
            var productionBase = await base.GetForCreateAsync(id, cancellationToken);
            var userId = _authenticationService.GetUserId();
            productionBase.OwnerId = userId;
            return productionBase;
        }
    }
}