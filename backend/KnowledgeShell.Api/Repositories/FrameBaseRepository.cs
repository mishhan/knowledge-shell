namespace KnowledgeShell.Api.Repositories
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

    public class FrameBaseRepository : EntityFrameworkCoreRepository<FrameBase, Guid>
    {
        private readonly IAuthenticationService _authenticationService;

        public FrameBaseRepository(IAuthenticationService authenticationService, ITargetedFields targetedFields,
            IDbContextResolver contextResolver, IResourceGraph resourceGraph, IResourceFactory resourceFactory,
            IEnumerable<IQueryConstraintProvider> constraintProviders, ILoggerFactory loggerFactory)
            : base(targetedFields, contextResolver, resourceGraph, resourceFactory, constraintProviders, loggerFactory)
        {
            _authenticationService = authenticationService ?? throw new ArgumentNullException(nameof(authenticationService));
        }

        protected override IQueryable<FrameBase> GetAll()
        {
            var userId = Guid.Parse(_authenticationService.GetUserId());
            return base.GetAll().Where(frameBase => frameBase.Owner.Id == userId);
        }

        public override async Task<FrameBase> GetForCreateAsync(Guid id, CancellationToken cancellationToken)
        {
            var frameBase = await base.GetForCreateAsync(id, cancellationToken);
            var userId = Guid.Parse(_authenticationService.GetUserId());
            frameBase.OwnerId = userId;
            return frameBase;
        }
    }
}
