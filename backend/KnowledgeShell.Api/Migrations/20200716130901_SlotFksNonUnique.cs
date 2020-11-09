using Microsoft.EntityFrameworkCore.Migrations;

namespace KnowledgeShell.Api.Migrations
{
    public partial class SlotFksNonUnique : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "ix_slots_domain_id",
                table: "slots");

            migrationBuilder.DropIndex(
                name: "ix_slots_value_id",
                table: "slots");

            migrationBuilder.CreateIndex(
                name: "ix_slots_domain_id",
                table: "slots",
                column: "domain_id");

            migrationBuilder.CreateIndex(
                name: "ix_slots_value_id",
                table: "slots",
                column: "value_id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "ix_slots_domain_id",
                table: "slots");

            migrationBuilder.DropIndex(
                name: "ix_slots_value_id",
                table: "slots");

            migrationBuilder.CreateIndex(
                name: "ix_slots_domain_id",
                table: "slots",
                column: "domain_id",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "ix_slots_value_id",
                table: "slots",
                column: "value_id",
                unique: true);
        }
    }
}
