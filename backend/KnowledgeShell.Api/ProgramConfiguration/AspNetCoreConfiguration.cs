using KnowledgeShell.Api.Data;
using KnowledgeShell.Api.Filters;
using KnowledgeShell.Api.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace KnowledgeShell.Api.ProgramConfiguration;

internal static class AspNetCoreConfiguration
{
    public static void ConfigureAspNetCore(this IServiceCollection services, string dbConnectionString)
    {
        services.AddMvc(options =>
        {
            options.Filters.Add(new ErrorHandlingFilter());
            options.Filters.Add(new ValidateModelFilter());
        });
        services.AddCors();
        services.AddDbContext<AppDbContext>(options =>
        {
            options.EnableSensitiveDataLogging();
            options.UseNpgsql(dbConnectionString);
        });
        services.AddIdentity<User, UserRole>(options =>
        {
            options.Password.RequiredLength = 8;
            options.Password.RequireLowercase = true;
            options.Password.RequireUppercase = true;
            options.Password.RequireNonAlphanumeric = true;
            options.Password.RequireDigit = true;

            options.User.RequireUniqueEmail = true;
        }).AddEntityFrameworkStores<AppDbContext>().AddDefaultTokenProviders();
    }
}