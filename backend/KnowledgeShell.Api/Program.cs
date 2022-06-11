using System;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using KnowledgeShell.Api.ProgramConfiguration;
using KnowledgeShell.Api.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Configuration
    .SetBasePath(Environment.CurrentDirectory)
    .AddJsonFile($"appsettings.json", false)
    .AddEnvironmentVariables();

builder.Host.ConfigureSerilog();
builder.Services.ConfigureAspNetCore(builder.Configuration["ConnectionStrings:DataBase"]);
builder.Services.ConfigureJsonApi();
builder.Services.ConfigureMiniProfiler();
builder.Services.ConfigureSwagger();
builder.Services.ConfigureAuthentication(builder.Configuration["SecretKey"]);
builder.Services.ConfigureAppServices();

var app = builder.Build();
app.RunApp();
