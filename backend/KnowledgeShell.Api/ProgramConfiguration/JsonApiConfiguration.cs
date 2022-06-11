using System.Text.Json;
using JsonApiDotNetCore.Configuration;
using KnowledgeShell.Api.Data;
using Microsoft.Extensions.DependencyInjection;

namespace KnowledgeShell.Api.ProgramConfiguration;

internal static class JsonApiConfiguration
{
    public static void ConfigureJsonApi(this IServiceCollection services)
    {
        services.AddJsonApi<AppDbContext>(options =>
        {
            options.AllowClientGeneratedIds = true;
            options.DefaultPageSize = new PageSize(int.MaxValue);
            options.SerializerOptions.WriteIndented = true;
            options.SerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
            options.IncludeJsonApiVersion = true;
            options.IncludeTotalResourceCount = true;
            options.IncludeExceptionStackTraceInErrors = true;
        }, discovery => discovery.AddCurrentAssembly());
    }
}