using KnowledgeShell.Api.Models;

namespace KnowledgeShell.Api.Services.Token;

public interface ITokenService
{
    string CreateToken(User user);
}