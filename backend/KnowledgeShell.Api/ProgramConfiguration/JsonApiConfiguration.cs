﻿namespace KnowledgeShell.Api.ProgramConfiguration
{
    using Microsoft.Extensions.DependencyInjection;
    using JsonApiDotNetCore.Configuration;
    using KnowledgeShell.Api.Data;

    internal static class JsonApiConfiguration
    {
        public static void ConfigureJsonApi(this IServiceCollection services)
        {
            services.AddJsonApi<AppDbContext>(options => {
                options.AllowClientGeneratedIds = true;
                options.DefaultPageSize = new PageSize(int.MaxValue);
                options.SerializerOptions.WriteIndented = true;
                options.SerializerOptions.PropertyNamingPolicy = null;
                options.IncludeJsonApiVersion = true;
                options.IncludeTotalResourceCount = true;
                options.IncludeExceptionStackTraceInErrors = true;
            }, discovery => discovery.AddCurrentAssembly());
        }
    }
}
