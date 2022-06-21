using System;

namespace KnowledgeShell.Api.Services.Authentication;

public interface IAuthenticationService
{
    string GetStringUserId();
    Guid GetUserId();
}