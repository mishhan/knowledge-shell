using Microsoft.Extensions.DependencyInjection;

namespace KnowledgeShell.Api.ProgramConfiguration;

internal static class MiniProfilerConfiguration
{
    public static void ConfigureMiniProfiler(this IServiceCollection services)
    {
        services.AddMiniProfiler(options => { options.RouteBasePath = "/profiler"; }).AddEntityFramework();
    }
}