using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace KnowledgeShell.Api.Migrations
{
    public partial class AddFrameBaseEntity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "frame_base_id",
                table: "frames",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "frame_base_id",
                table: "domains",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateTable(
                name: "frame_bases",
                columns: table => new
                {
                    id = table.Column<Guid>(nullable: false),
                    name = table.Column<string>(nullable: true),
                    created_at = table.Column<DateTime>(nullable: false),
                    updated_at = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_frame_bases", x => x.id);
                });

            migrationBuilder.Sql($"INSERT INTO frame_bases VALUES('00000000-0000-0000-0000-000000000000', 'default', '{DateTime.Now}', '{DateTime.Now}')");

            migrationBuilder.CreateIndex(
                name: "ix_frames_frame_base_id",
                table: "frames",
                column: "frame_base_id");

            migrationBuilder.CreateIndex(
                name: "ix_domains_frame_base_id",
                table: "domains",
                column: "frame_base_id");

            migrationBuilder.AddForeignKey(
                name: "fk_domains_frame_bases_frame_base_id",
                table: "domains",
                column: "frame_base_id",
                principalTable: "frame_bases",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "fk_frames_frame_bases_frame_base_id",
                table: "frames",
                column: "frame_base_id",
                principalTable: "frame_bases",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_domains_frame_bases_frame_base_id",
                table: "domains");

            migrationBuilder.DropForeignKey(
                name: "fk_frames_frame_bases_frame_base_id",
                table: "frames");

            migrationBuilder.DropTable(
                name: "frame_bases");

            migrationBuilder.DropIndex(
                name: "ix_frames_frame_base_id",
                table: "frames");

            migrationBuilder.DropIndex(
                name: "ix_domains_frame_base_id",
                table: "domains");

            migrationBuilder.DropColumn(
                name: "frame_base_id",
                table: "frames");

            migrationBuilder.DropColumn(
                name: "frame_base_id",
                table: "domains");
        }
    }
}
