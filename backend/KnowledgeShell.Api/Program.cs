using System;
using KnowledgeShell.Api.ProgramConfiguration;
using KnowledgeShell.Api.Repositories;
using KnowledgeShell.Api.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;

var builder = WebApplication.CreateBuilder(args);

builder.Configuration
    .SetBasePath(Environment.CurrentDirectory)
    .AddJsonFile("appsettings.json", false)
    .AddEnvironmentVariables();

builder.Host.ConfigureSerilog();
builder.WebHost.ConfigureWebHost();
builder.Services.ConfigureAspNetCore(builder.Configuration["ConnectionStrings:DataBase"]);
builder.Services.ConfigureJsonApi();
builder.Services.ConfigureMiniProfiler();
builder.Services.ConfigureSwagger();
builder.Services.ConfigureAuthentication(builder.Configuration["SecretKey"]);
builder.Services.ConfigureAppRepositories();
builder.Services.ConfigureAppServices();

var app = builder.Build();
app.RunApp();