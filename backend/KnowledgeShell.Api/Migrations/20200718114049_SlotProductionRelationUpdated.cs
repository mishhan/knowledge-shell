using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace KnowledgeShell.Api.Migrations
{
    public partial class SlotProductionRelationUpdated : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_productions_slots_slot_id1",
                table: "productions");

            migrationBuilder.DropColumn(
                name: "production_id",
                table: "slots");

            migrationBuilder.AddForeignKey(
                name: "fk_productions_slots_slot_id",
                table: "productions",
                column: "slot_id",
                principalTable: "slots",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_productions_slots_slot_id",
                table: "productions");

            migrationBuilder.AddColumn<Guid>(
                name: "production_id",
                table: "slots",
                type: "uuid",
                nullable: true);

            migrationBuilder.AddForeignKey(
                name: "fk_productions_slots_slot_id1",
                table: "productions",
                column: "slot_id",
                principalTable: "slots",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
