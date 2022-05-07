namespace KnowledgeShell.Api.ProgramConfiguration
{
    using Microsoft.AspNetCore.Builder;
    using JsonApiDotNetCore.Configuration;
    using Serilog;

    internal static class AppConfiguration
    {
        public static void RunApp(this WebApplication app)
        {
            app.UseSerilogRequestLogging();
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
            app.Run();
        }
    }
}
