using System.Threading.Tasks;
using KnowledgeShell.Api.Models;

namespace KnowledgeShell.Api.Services.Account;

public interface IAccountService
{
    Task<bool> SignUp(string userName, string email, string passwrod);
    Task<User> Authenticate(string identification, string password);
    Task<string> GenerateToken(string identification, string password);
}