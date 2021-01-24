using Microsoft.EntityFrameworkCore.Migrations;

namespace KnowledgeShell.Api.Migrations
{
    public partial class AddDomainTypeAndDescription : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "description",
                table: "domains",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "domain_type",
                table: "domains",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "description",
                table: "domains");

            migrationBuilder.DropColumn(
                name: "domain_type",
                table: "domains");
        }
    }
}
