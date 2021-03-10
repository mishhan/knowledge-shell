namespace KnowledgeShell.Api.Services.Authentication
{
    using System;

    public interface IAuthenticationService
    {
        string GetStringUserId();
        Guid GetUserId();
    }
}
