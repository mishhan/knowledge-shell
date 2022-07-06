using JsonApiDotNetCore.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace KnowledgeShell.Api.Repositories;

internal static class RepositoryConfiguration
{
    public static void ConfigureAppRepositories(this IServiceCollection services)
    {
        services.AddResourceRepository<FrameBaseRepository>();
        services.AddResourceRepository<ProductionBaseRepository>();
    }
}