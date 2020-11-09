namespace KnowledgeShell.Api
{
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Builder;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.DependencyInjection;

    using KnowledgeShell.Api.Data;
    using JsonApiDotNetCore.Configuration;
    using JsonApiDotNetCore.Resources.Annotations;

    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.Configure<IISServerOptions>(options =>
            {
                options.AllowSynchronousIO = true;
            });

            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Latest);
            services.AddCors();
            services.AddDbContext<AppDbContext>(options =>
            {
                options.EnableSensitiveDataLogging(true);
                options.UseNpgsql(Configuration.GetConnectionString("local"));
            });

            services.AddJsonApi<AppDbContext>(options => {
                options.AllowClientGeneratedIds = true;
                options.DefaultAttrCapabilities = AttrCapabilities.All;
                options.DefaultPageSize = new PageSize(int.MaxValue);
                options.LoadDatabaseValues = true;
                options.IncludeExceptionStackTraceInErrors = true;
            }, discovery => discovery.AddCurrentAssembly());
            services.AddMvc(options => options.EnableEndpointRouting = false);
        }

        public void Configure(IApplicationBuilder app)
        {
            app.UseCors(builder => builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
            app.UseRouting();
            app.UseJsonApi();
            app.UseEndpoints(endpoints => endpoints.MapControllers());
        }
    }
}
