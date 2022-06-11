namespace KnowledgeShell.Api.ProgramConfiguration
{
    using Microsoft.Extensions.DependencyInjection;

    internal static class MiniProfilerConfiguration
    {
        public static void ConfigureMiniProfiler(this IServiceCollection services)
        {
            services.AddMiniProfiler(options => {
                options.RouteBasePath = "/profiler";
            }).AddEntityFramework();
        }
    }
}
