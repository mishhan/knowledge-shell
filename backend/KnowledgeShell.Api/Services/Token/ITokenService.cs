namespace KnowledgeShell.Api.Services.Token
{
    using KnowledgeShell.Api.Models;

    public interface ITokenService
    {
        string CreateToken(User user);
    }
}
