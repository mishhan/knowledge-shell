FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build-env
WORKDIR /app
EXPOSE 80

COPY . ./
RUN dotnet restore
RUN dotnet publish -c Release -o output

FROM mcr.microsoft.com/dotnet/aspnet:6.0
WORKDIR /app
COPY --from=build-env /app/output ./
ENTRYPOINT ["dotnet", "KnowledgeShell.Api.dll"]