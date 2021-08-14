namespace KnowledgeShell.Api
{
    using System.Text;
    using Microsoft.OpenApi.Models;
    using Microsoft.IdentityModel.Tokens;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Builder;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.Extensions.Configuration;
    using Microsoft.Extensions.DependencyInjection;
    using Microsoft.AspNetCore.Authentication.JwtBearer;
    using Newtonsoft.Json.Serialization;

    using JsonApiDotNetCore.Configuration;
    using JsonApiDotNetCore.Resources.Annotations;
    using KnowledgeShell.Api.Data;
    using KnowledgeShell.Api.Models;
    using KnowledgeShell.Api.Filters;
    using KnowledgeShell.Api.Services;

    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc(options => 
            {
                options.EnableEndpointRouting = false;
                options.Filters.Add(new ErrorHandlingFilter());
            }).SetCompatibilityVersion(CompatibilityVersion.Latest);

            services.AddCors();

            services.Configure<IISServerOptions>(options =>
            {
                options.AllowSynchronousIO = true;
            });

            services.AddDbContext<AppDbContext>(options =>
            {
                options.EnableSensitiveDataLogging(true);
                options.UseNpgsql(Configuration.GetConnectionString("local"));
            });

            services.AddIdentity<User, UserRole>()
                .AddEntityFrameworkStores<AppDbContext>()
                .AddDefaultTokenProviders();

            services.AddJsonApi<AppDbContext>(options => {
                options.AllowClientGeneratedIds = true;
                options.DefaultAttrCapabilities = AttrCapabilities.All;
                options.DefaultPageSize = new PageSize(int.MaxValue);
                options.LoadDatabaseValues = true;
                options.IncludeExceptionStackTraceInErrors = true;
                options.SerializerSettings.ContractResolver = new DefaultContractResolver
                {
                    NamingStrategy = new KebabCaseNamingStrategy()
                };
            }, discovery => discovery.AddCurrentAssembly());

            services.AddSwaggerGen(options =>
            {
                options.SwaggerDoc("v1", new OpenApiInfo { Title = "Knowledge Shell API", Version = "v1" });
                options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    Name = "Authorization",
                    Scheme = "Bearer",
                    BearerFormat = "JWT",
                    In = ParameterLocation.Header,
                    Type = SecuritySchemeType.Http,
                });
                options.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference
                            {
                                Type = ReferenceType.SecurityScheme,
                                Id = "Bearer"
                            }
                        },
                        new string[]{ }
                    }
                });
            });

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.RequireHttpsMetadata = false;
                    var signingKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["SecretKey"]));
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,

                        ValidateIssuer = false,
                        ValidateAudience = false,
                        IssuerSigningKey = signingKey,

                    };
                });

            ServiceConfiguration.ConfigureServices(services);
        }

        public void Configure(IApplicationBuilder app)
        {
            app.UseSwagger();
            app.UseSwaggerUI(config =>
            {
                config.SwaggerEndpoint("/swagger/v1/swagger.json", "Knowledge Shell API V1");
                config.RoutePrefix = "swagger";
            });

            app.UseCors(builder => builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
            app.UseRouting();
            
            app.UseAuthentication();
            app.UseAuthorization();

            app.UseJsonApi();
            app.UseEndpoints(endpoints => endpoints.MapControllers());
        }
    }
}
