using Microsoft.EntityFrameworkCore.Migrations;

namespace KnowledgeShell.Api.Migrations
{
    public partial class AddDomainValueNumber : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "value_id",
                table: "domain_values",
                newName: "frame_value_id");

            migrationBuilder.RenameColumn(
                name: "value",
                table: "domain_values",
                newName: "string_value");

            migrationBuilder.AddColumn<double>(
                name: "number_value",
                table: "domain_values",
                nullable: true);

            migrationBuilder.DropForeignKey(
                name: "fk_domain_values_frames_value_id",
                table: "domain_values");

            migrationBuilder.DropIndex(
                name: "ix_domain_values_value_id",
                table: "domain_values");

            migrationBuilder.CreateIndex(
                name: "ix_domain_values_frame_value_id",
                table: "domain_values",
                column: "frame_value_id");

            migrationBuilder.AddForeignKey(
                name: "fk_domain_values_frames_frame_value_id",
                table: "domain_values",
                column: "frame_value_id",
                principalTable: "frames",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_domain_values_frames_frame_value_id",
                table: "domain_values");

            migrationBuilder.DropIndex(
                name: "ix_domain_values_frame_value_id",
                table: "domain_values");

            migrationBuilder.RenameColumn(
                name: "frame_value_id",
                table: "domain_values",
                newName: "value_id");

            migrationBuilder.RenameColumn(
                name: "string_value",
                table: "domain_values",
                newName: "value");

            migrationBuilder.DropColumn(
                name: "number_value",
                table: "domain_values");

            migrationBuilder.CreateIndex(
                name: "ix_domain_values_value_id",
                table: "domain_values",
                column: "value_id");

            migrationBuilder.AddForeignKey(
                name: "fk_domain_values_frames_value_id",
                table: "domain_values",
                column: "value_id",
                principalTable: "frames",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
