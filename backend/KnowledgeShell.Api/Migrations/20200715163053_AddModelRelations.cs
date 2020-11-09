using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace KnowledgeShell.Api.Migrations
{
    public partial class AddModelRelations : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_frames_frames_parent_id",
                table: "frames");

            migrationBuilder.DropForeignKey(
                name: "fk_slots_domains_domain_id",
                table: "slots");

            migrationBuilder.DropForeignKey(
                name: "fk_slots_slots_parent_id",
                table: "slots");

            migrationBuilder.DropForeignKey(
                name: "fk_slots_productions_production_id",
                table: "slots");

            migrationBuilder.DropForeignKey(
                name: "fk_slots_domain_values_value_id",
                table: "slots");

            migrationBuilder.DropIndex(
                name: "ix_slots_domain_id",
                table: "slots");

            migrationBuilder.DropIndex(
                name: "ix_slots_production_id",
                table: "slots");

            migrationBuilder.DropIndex(
                name: "ix_slots_value_id",
                table: "slots");

            migrationBuilder.DropIndex(
                name: "ix_frames_position_id",
                table: "frames");

            migrationBuilder.DeleteData(
                table: "domains",
                keyColumn: "id",
                keyValue: new Guid("5077fc06-1b82-463e-bebc-909d8aa63537"));

            migrationBuilder.AddColumn<Guid>(
                name: "slot_id",
                table: "productions",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

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

            migrationBuilder.CreateIndex(
                name: "ix_productions_slot_id",
                table: "productions",
                column: "slot_id",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "ix_frames_position_id",
                table: "frames",
                column: "position_id",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "fk_frames_frames_parent_id",
                table: "frames",
                column: "parent_id",
                principalTable: "frames",
                principalColumn: "id",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "fk_productions_slots_slot_id1",
                table: "productions",
                column: "slot_id",
                principalTable: "slots",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "fk_slots_domains_domain_id",
                table: "slots",
                column: "domain_id",
                principalTable: "domains",
                principalColumn: "id",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "fk_slots_slots_parent_id",
                table: "slots",
                column: "parent_id",
                principalTable: "slots",
                principalColumn: "id",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "fk_slots_domain_values_value_id",
                table: "slots",
                column: "value_id",
                principalTable: "domain_values",
                principalColumn: "id",
                onDelete: ReferentialAction.SetNull);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_frames_frames_parent_id",
                table: "frames");

            migrationBuilder.DropForeignKey(
                name: "fk_productions_slots_slot_id1",
                table: "productions");

            migrationBuilder.DropForeignKey(
                name: "fk_slots_domains_domain_id",
                table: "slots");

            migrationBuilder.DropForeignKey(
                name: "fk_slots_slots_parent_id",
                table: "slots");

            migrationBuilder.DropForeignKey(
                name: "fk_slots_domain_values_value_id",
                table: "slots");

            migrationBuilder.DropIndex(
                name: "ix_slots_domain_id",
                table: "slots");

            migrationBuilder.DropIndex(
                name: "ix_slots_value_id",
                table: "slots");

            migrationBuilder.DropIndex(
                name: "ix_productions_slot_id",
                table: "productions");

            migrationBuilder.DropIndex(
                name: "ix_frames_position_id",
                table: "frames");

            migrationBuilder.DropColumn(
                name: "slot_id",
                table: "productions");

            migrationBuilder.InsertData(
                table: "domains",
                columns: new[] { "id", "is_read_only", "name" },
                values: new object[] { new Guid("5077fc06-1b82-463e-bebc-909d8aa63537"), true, "Frame" });

            migrationBuilder.CreateIndex(
                name: "ix_slots_domain_id",
                table: "slots",
                column: "domain_id");

            migrationBuilder.CreateIndex(
                name: "ix_slots_production_id",
                table: "slots",
                column: "production_id");

            migrationBuilder.CreateIndex(
                name: "ix_slots_value_id",
                table: "slots",
                column: "value_id");

            migrationBuilder.CreateIndex(
                name: "ix_frames_position_id",
                table: "frames",
                column: "position_id");

            migrationBuilder.AddForeignKey(
                name: "fk_frames_frames_parent_id",
                table: "frames",
                column: "parent_id",
                principalTable: "frames",
                principalColumn: "id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "fk_slots_domains_domain_id",
                table: "slots",
                column: "domain_id",
                principalTable: "domains",
                principalColumn: "id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "fk_slots_slots_parent_id",
                table: "slots",
                column: "parent_id",
                principalTable: "slots",
                principalColumn: "id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "fk_slots_productions_production_id",
                table: "slots",
                column: "production_id",
                principalTable: "productions",
                principalColumn: "id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "fk_slots_domain_values_value_id",
                table: "slots",
                column: "value_id",
                principalTable: "domain_values",
                principalColumn: "id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
