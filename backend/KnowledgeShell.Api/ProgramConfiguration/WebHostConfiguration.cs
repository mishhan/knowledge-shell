using System;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;

namespace KnowledgeShell.Api.ProgramConfiguration;

internal static class WebHostConfiguration
{
    public static void ConfigureWebHost(this ConfigureWebHostBuilder webHostBuilder)
    {
        var isWindows = OperatingSystem.IsWindows();
        if (isWindows)
            webHostBuilder.UseIIS();
        else
            webHostBuilder.UseKestrel();
    }
}