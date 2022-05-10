using System;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Serilog;
using KnowledgeShell.Api.ProgramConfiguration;
using KnowledgeShell.Api.Services;

try
{
    var builder = WebApplication.CreateBuilder(args);

    builder.Configuration
        .SetBasePath(Environment.CurrentDirectory)
        .AddJsonFile($"appsettings.json", false)
        .AddEnvironmentVariables();

    builder.Host.UseSerilog((context, services, configutration) => configutration
        .ReadFrom.Configuration(context.Configuration)
        .ReadFrom.Services(services)
        .Enrich.FromLogContext());

    builder.Services.ConfigureAspNetCore(builder.Configuration["ConnectionStrings:DataBase"]);
    builder.Services.ConfigureJsonApi();
    builder.Services.ConfigureSwagger();
    builder.Services.ConfigureAuthentication(builder.Configuration["SecretKey"]);
    builder.Services.ConfigureAppServices();

    var app = builder.Build();

    Log.Information("%%% Starting Application %%%");
    app.RunApp();
}
catch (Exception ex)
{
    Log.Error(ex, "App Exception Occured");
}
finally
{
    Log.Information("%%% Shutting down %%%");
    Log.CloseAndFlush();
}
