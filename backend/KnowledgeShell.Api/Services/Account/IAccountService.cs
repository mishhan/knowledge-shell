using System.Threading.Tasks;

namespace KnowledgeShell.Api.Services.Account;

public interface IAccountService
{
    Task<bool> SignUp(string userName, string email, string passwrod);
    Task<string> GenerateToken(string identification, string password);
}