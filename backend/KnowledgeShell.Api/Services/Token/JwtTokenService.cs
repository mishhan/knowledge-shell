namespace KnowledgeShell.Api.Services.Token
{
    using System;
    using System.Text;
    using System.Collections.Generic;
    using System.Security.Claims;
    using System.IdentityModel.Tokens.Jwt;
    using Microsoft.IdentityModel.Tokens;
    using Microsoft.Extensions.Configuration;
    using KnowledgeShell.Api.Models;

    internal class JwtTokenService : ITokenService
    {
        private const string SecretKeyField = "SecretKey";
        private readonly SymmetricSecurityKey _symmetricSecurityKey;

        public JwtTokenService(IConfiguration config)
        {
            var secretKeyExists = config.GetSection(SecretKeyField).Exists();
            if (!secretKeyExists)
            {
                throw new Exception($"{SecretKeyField} does not exist in appsettings.json");
            }

            var tokenKey = config[SecretKeyField];
            var keyBytes = Encoding.UTF8.GetBytes(tokenKey);
            _symmetricSecurityKey = new SymmetricSecurityKey(keyBytes);
        }

        public string CreateToken(User user)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimsIdentity.DefaultNameClaimType, user.UserName),
            };
            var credentials = new SigningCredentials(_symmetricSecurityKey, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                notBefore: DateTime.UtcNow,
                expires: DateTime.UtcNow.AddDays(7),
                signingCredentials: credentials,
                claims: claims);

            var encodedJwt = new JwtSecurityTokenHandler().WriteToken(token);
            return encodedJwt;
        }
    }
}
