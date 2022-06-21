using System;
using System.IO;
using Microsoft.AspNetCore.Builder;
using Serilog;

namespace KnowledgeShell.Api.ProgramConfiguration;

internal static class SerilogConfiguration
{
    public static void ConfigureSerilog(this ConfigureHostBuilder hostBuilder)
    {
        hostBuilder.UseSerilog((context, services, configuration) => configuration
            .ReadFrom.Configuration(context.Configuration)
            .ReadFrom.Services(services)
            .MinimumLevel.Information()
            .WriteTo.Console()
            .WriteTo.File(Path.Combine(Environment.CurrentDirectory, "logs", "log.log"))
            .Filter
            .ByExcluding(logEvent =>
            {
                var shouldExclude = logEvent.Properties.ContainsKey("RequestPath") &&
                                    (
                                        // ignore swagger and miniprofiler
                                        logEvent.Properties["RequestPath"].ToString().Contains("swagger") ||
                                        logEvent.Properties["RequestPath"].ToString().Contains("profiler")
                                    );
                return shouldExclude;
            })
        );
    }
}