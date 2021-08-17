namespace KnowledgeShell.Api.Services.Account
{
    using System.Threading.Tasks;

    public interface IAccountService
    {
        Task<bool> SignUp(string userName, string email, string passwrod);
        Task<string> GenerateToken(string identification, string password);
    }
}
