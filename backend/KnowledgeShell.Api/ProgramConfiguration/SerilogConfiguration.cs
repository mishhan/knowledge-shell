using Microsoft.AspNetCore.Builder;
using Serilog;

namespace KnowledgeShell.Api.ProgramConfiguration;

internal static class SerilogConfiguration
{
    public static void ConfigureSerilog(this ConfigureHostBuilder hostBuilder)
    {
        hostBuilder.UseSerilog((context, services, configutration) => configutration
            .ReadFrom.Configuration(context.Configuration)
            .ReadFrom.Services(services)
            .Enrich.FromLogContext()
            .Filter
            .ByExcluding(serilogEvent =>
            {
                var shouldExclude = serilogEvent.Properties.ContainsKey("RequestPath") &&
                                    (
                                        // ignore swagger and miniprofiler
                                        serilogEvent.Properties["RequestPath"].ToString().Contains("swagger") ||
                                        serilogEvent.Properties["RequestPath"].ToString().Contains("profiler")
                                    );
                return shouldExclude;
            }));
    }
}