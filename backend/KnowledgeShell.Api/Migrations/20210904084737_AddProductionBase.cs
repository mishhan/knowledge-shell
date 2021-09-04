using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace KnowledgeShell.Api.Migrations
{
    public partial class AddProductionBase : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_domains_frame_bases_frame_base_id",
                table: "domains");

            migrationBuilder.DropForeignKey(
                name: "fk_frame_bases_users_owner_id",
                table: "frame_bases");

            migrationBuilder.DropForeignKey(
                name: "fk_frames_frame_bases_frame_base_id",
                table: "frames");

            migrationBuilder.DropPrimaryKey(
                name: "pk_frame_bases",
                table: "frame_bases");

            migrationBuilder.RenameTable(
                name: "frame_bases",
                newName: "knowledge_bases");

            migrationBuilder.RenameColumn(
                name: "frame_base_id",
                table: "domains",
                newName: "knowledge_base_id");

            migrationBuilder.RenameIndex(
                name: "ix_domains_frame_base_id",
                table: "domains",
                newName: "ix_domains_knowledge_base_id");

            migrationBuilder.RenameIndex(
                name: "ix_frame_bases_owner_id",
                table: "knowledge_bases",
                newName: "ix_knowledge_bases_owner_id");

            migrationBuilder.AddColumn<string>(
                name: "discriminator",
                table: "knowledge_bases",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddPrimaryKey(
                name: "pk_knowledge_bases",
                table: "knowledge_bases",
                column: "id");

            migrationBuilder.CreateTable(
                name: "rules",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    name = table.Column<string>(type: "text", nullable: true),
                    order = table.Column<int>(type: "integer", nullable: false),
                    reason = table.Column<string>(type: "text", nullable: true),
                    premise = table.Column<string>(type: "text", nullable: true),
                    consequence = table.Column<string>(type: "text", nullable: true),
                    production_base_id = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_rules", x => x.id);
                    table.ForeignKey(
                        name: "fk_rules_knowledge_bases_production_base_id",
                        column: x => x.production_base_id,
                        principalTable: "knowledge_bases",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "variables",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    name = table.Column<string>(type: "text", nullable: true),
                    question = table.Column<string>(type: "text", nullable: true),
                    variable_type = table.Column<int>(type: "integer", nullable: false),
                    domain_id = table.Column<Guid>(type: "uuid", nullable: true),
                    production_base_id = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_variables", x => x.id);
                    table.ForeignKey(
                        name: "fk_variables_domains_domain_id",
                        column: x => x.domain_id,
                        principalTable: "domains",
                        principalColumn: "id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "fk_variables_knowledge_bases_production_base_id",
                        column: x => x.production_base_id,
                        principalTable: "knowledge_bases",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "ix_rules_production_base_id",
                table: "rules",
                column: "production_base_id");

            migrationBuilder.CreateIndex(
                name: "ix_variables_domain_id",
                table: "variables",
                column: "domain_id");

            migrationBuilder.CreateIndex(
                name: "ix_variables_production_base_id",
                table: "variables",
                column: "production_base_id");

            migrationBuilder.AddForeignKey(
                name: "fk_domains_knowledge_bases_knowledge_base_id",
                table: "domains",
                column: "knowledge_base_id",
                principalTable: "knowledge_bases",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "fk_frames_knowledge_bases_frame_base_id",
                table: "frames",
                column: "frame_base_id",
                principalTable: "knowledge_bases",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "fk_knowledge_bases_users_owner_id",
                table: "knowledge_bases",
                column: "owner_id",
                principalTable: "AspNetUsers",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_domains_knowledge_bases_knowledge_base_id",
                table: "domains");

            migrationBuilder.DropForeignKey(
                name: "fk_frames_knowledge_bases_frame_base_id",
                table: "frames");

            migrationBuilder.DropForeignKey(
                name: "fk_knowledge_bases_users_owner_id",
                table: "knowledge_bases");

            migrationBuilder.DropTable(
                name: "rules");

            migrationBuilder.DropTable(
                name: "variables");

            migrationBuilder.DropPrimaryKey(
                name: "pk_knowledge_bases",
                table: "knowledge_bases");

            migrationBuilder.DropColumn(
                name: "discriminator",
                table: "knowledge_bases");

            migrationBuilder.RenameTable(
                name: "knowledge_bases",
                newName: "frame_bases");

            migrationBuilder.RenameColumn(
                name: "knowledge_base_id",
                table: "domains",
                newName: "frame_base_id");

            migrationBuilder.RenameIndex(
                name: "ix_domains_knowledge_base_id",
                table: "domains",
                newName: "ix_domains_frame_base_id");

            migrationBuilder.RenameIndex(
                name: "ix_knowledge_bases_owner_id",
                table: "frame_bases",
                newName: "ix_frame_bases_owner_id");

            migrationBuilder.AddPrimaryKey(
                name: "pk_frame_bases",
                table: "frame_bases",
                column: "id");

            migrationBuilder.AddForeignKey(
                name: "fk_domains_frame_bases_frame_base_id",
                table: "domains",
                column: "frame_base_id",
                principalTable: "frame_bases",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "fk_frame_bases_users_owner_id",
                table: "frame_bases",
                column: "owner_id",
                principalTable: "AspNetUsers",
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
    }
}
