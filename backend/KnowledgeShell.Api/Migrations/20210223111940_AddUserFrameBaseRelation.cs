using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace KnowledgeShell.Api.Migrations
{
    public partial class AddUserFrameBaseRelation : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "owner_id",
                table: "frame_bases",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("e0c46c95-855e-43b4-93c8-946a71d8f162"));

            migrationBuilder.CreateIndex(
                name: "ix_frame_bases_owner_id",
                table: "frame_bases",
                column: "owner_id");

            migrationBuilder.AddForeignKey(
                name: "fk_frame_bases_users_owner_id",
                table: "frame_bases",
                column: "owner_id",
                principalTable: "AspNetUsers",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_frame_bases_users_owner_id",
                table: "frame_bases");

            migrationBuilder.DropIndex(
                name: "ix_frame_bases_owner_id",
                table: "frame_bases");

            migrationBuilder.DropColumn(
                name: "owner_id",
                table: "frame_bases");
        }
    }
}
