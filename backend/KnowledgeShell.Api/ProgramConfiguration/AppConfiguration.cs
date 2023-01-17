using JsonApiDotNetCore.Configuration;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Hosting;
using Serilog;

namespace KnowledgeShell.Api.ProgramConfiguration;

internal static class AppConfiguration
{
  public static void RunApp(this WebApplication app)
  {
    if (app.Environment.IsDevelopment())
    {
      app.UseDeveloperExceptionPage();
    }

    app.UseMiniProfiler();
    app.UseSwagger();
    app.UseSwaggerUI(config =>
    {
      config.SwaggerEndpoint("/swagger/v1/swagger.json", "Knowledge Shell API V1");
      config.RoutePrefix = "swagger";
    });

    app.UseSerilogRequestLogging();

    app.UseCors(builder => builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
    app.UseRouting();

    app.UseAuthentication();
    app.UseAuthorization();

    app.UseJsonApi();
    app.UseEndpoints(endpoints => endpoints.MapControllers());
    app.Run();
  }
}