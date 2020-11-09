using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace KnowledgeShell.Api.Migrations
{
    public partial class DomainReadOnlyAndSeed : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DomainValues_Domains_DomainId",
                table: "DomainValues");

            migrationBuilder.DropForeignKey(
                name: "FK_DomainValues_Frames_ValueId",
                table: "DomainValues");

            migrationBuilder.DropForeignKey(
                name: "FK_Frames_Frames_ParentId",
                table: "Frames");

            migrationBuilder.DropForeignKey(
                name: "FK_Frames_Positions_PositionId",
                table: "Frames");

            migrationBuilder.DropForeignKey(
                name: "FK_Slots_Domains_DomainId",
                table: "Slots");

            migrationBuilder.DropForeignKey(
                name: "FK_Slots_Frames_OwnerId",
                table: "Slots");

            migrationBuilder.DropForeignKey(
                name: "FK_Slots_Slots_ParentId",
                table: "Slots");

            migrationBuilder.DropForeignKey(
                name: "FK_Slots_Productions_ProductionId",
                table: "Slots");

            migrationBuilder.DropForeignKey(
                name: "FK_Slots_DomainValues_ValueId",
                table: "Slots");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Slots",
                table: "Slots");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Productions",
                table: "Productions");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Positions",
                table: "Positions");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Frames",
                table: "Frames");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Domains",
                table: "Domains");

            migrationBuilder.DropPrimaryKey(
                name: "PK_DomainValues",
                table: "DomainValues");

            migrationBuilder.RenameTable(
                name: "Slots",
                newName: "slots");

            migrationBuilder.RenameTable(
                name: "Productions",
                newName: "productions");

            migrationBuilder.RenameTable(
                name: "Positions",
                newName: "positions");

            migrationBuilder.RenameTable(
                name: "Frames",
                newName: "frames");

            migrationBuilder.RenameTable(
                name: "Domains",
                newName: "domains");

            migrationBuilder.RenameTable(
                name: "DomainValues",
                newName: "domain_values");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "slots",
                newName: "name");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "slots",
                newName: "id");

            migrationBuilder.RenameColumn(
                name: "ValueId",
                table: "slots",
                newName: "value_id");

            migrationBuilder.RenameColumn(
                name: "ProductionId",
                table: "slots",
                newName: "production_id");

            migrationBuilder.RenameColumn(
                name: "ParentId",
                table: "slots",
                newName: "parent_id");

            migrationBuilder.RenameColumn(
                name: "OwnerId",
                table: "slots",
                newName: "owner_id");

            migrationBuilder.RenameColumn(
                name: "IsInherited",
                table: "slots",
                newName: "is_inherited");

            migrationBuilder.RenameColumn(
                name: "DomainId",
                table: "slots",
                newName: "domain_id");

            migrationBuilder.RenameIndex(
                name: "IX_Slots_ValueId",
                table: "slots",
                newName: "ix_slots_value_id");

            migrationBuilder.RenameIndex(
                name: "IX_Slots_ProductionId",
                table: "slots",
                newName: "ix_slots_production_id");

            migrationBuilder.RenameIndex(
                name: "IX_Slots_ParentId",
                table: "slots",
                newName: "ix_slots_parent_id");

            migrationBuilder.RenameIndex(
                name: "IX_Slots_OwnerId",
                table: "slots",
                newName: "ix_slots_owner_id");

            migrationBuilder.RenameIndex(
                name: "IX_Slots_DomainId",
                table: "slots",
                newName: "ix_slots_domain_id");

            migrationBuilder.RenameColumn(
                name: "Text",
                table: "productions",
                newName: "text");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "productions",
                newName: "id");

            migrationBuilder.RenameColumn(
                name: "Y",
                table: "positions",
                newName: "y");

            migrationBuilder.RenameColumn(
                name: "X",
                table: "positions",
                newName: "x");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "positions",
                newName: "id");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "frames",
                newName: "name");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "frames",
                newName: "id");

            migrationBuilder.RenameColumn(
                name: "PositionId",
                table: "frames",
                newName: "position_id");

            migrationBuilder.RenameColumn(
                name: "ParentId",
                table: "frames",
                newName: "parent_id");

            migrationBuilder.RenameIndex(
                name: "IX_Frames_PositionId",
                table: "frames",
                newName: "ix_frames_position_id");

            migrationBuilder.RenameIndex(
                name: "IX_Frames_ParentId",
                table: "frames",
                newName: "ix_frames_parent_id");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "domains",
                newName: "name");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "domains",
                newName: "id");

            migrationBuilder.RenameColumn(
                name: "Value",
                table: "domain_values",
                newName: "value");

            migrationBuilder.RenameColumn(
                name: "Discriminator",
                table: "domain_values",
                newName: "discriminator");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "domain_values",
                newName: "id");

            migrationBuilder.RenameColumn(
                name: "ValueId",
                table: "domain_values",
                newName: "value_id");

            migrationBuilder.RenameColumn(
                name: "DomainId",
                table: "domain_values",
                newName: "domain_id");

            migrationBuilder.RenameIndex(
                name: "IX_DomainValues_ValueId",
                table: "domain_values",
                newName: "ix_domain_values_value_id");

            migrationBuilder.RenameIndex(
                name: "IX_DomainValues_DomainId",
                table: "domain_values",
                newName: "ix_domain_values_domain_id");

            migrationBuilder.AddColumn<bool>(
                name: "is_read_only",
                table: "domains",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddPrimaryKey(
                name: "pk_slots",
                table: "slots",
                column: "id");

            migrationBuilder.AddPrimaryKey(
                name: "pk_productions",
                table: "productions",
                column: "id");

            migrationBuilder.AddPrimaryKey(
                name: "pk_positions",
                table: "positions",
                column: "id");

            migrationBuilder.AddPrimaryKey(
                name: "pk_frames",
                table: "frames",
                column: "id");

            migrationBuilder.AddPrimaryKey(
                name: "pk_domains",
                table: "domains",
                column: "id");

            migrationBuilder.AddPrimaryKey(
                name: "pk_domain_values",
                table: "domain_values",
                column: "id");

            migrationBuilder.InsertData(
                table: "domains",
                columns: new[] { "id", "is_read_only", "name" },
                values: new object[] { new Guid("5077fc06-1b82-463e-bebc-909d8aa63537"), true, "Frame" });

            migrationBuilder.AddForeignKey(
                name: "fk_domain_values_domains_domain_id",
                table: "domain_values",
                column: "domain_id",
                principalTable: "domains",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "fk_domain_values_frames_value_id",
                table: "domain_values",
                column: "value_id",
                principalTable: "frames",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "fk_frames_frames_parent_id",
                table: "frames",
                column: "parent_id",
                principalTable: "frames",
                principalColumn: "id",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "fk_frames_positions_position_id",
                table: "frames",
                column: "position_id",
                principalTable: "positions",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "fk_slots_domains_domain_id",
                table: "slots",
                column: "domain_id",
                principalTable: "domains",
                principalColumn: "id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "fk_slots_frames_owner_id",
                table: "slots",
                column: "owner_id",
                principalTable: "frames",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "fk_slots_slots_parent_id",
                table: "slots",
                column: "parent_id",
                principalTable: "slots",
                principalColumn: "id",
                onDelete: ReferentialAction.SetNull);

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

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_domain_values_domains_domain_id",
                table: "domain_values");

            migrationBuilder.DropForeignKey(
                name: "fk_domain_values_frames_value_id",
                table: "domain_values");

            migrationBuilder.DropForeignKey(
                name: "fk_frames_frames_parent_id",
                table: "frames");

            migrationBuilder.DropForeignKey(
                name: "fk_frames_positions_position_id",
                table: "frames");

            migrationBuilder.DropForeignKey(
                name: "fk_slots_domains_domain_id",
                table: "slots");

            migrationBuilder.DropForeignKey(
                name: "fk_slots_frames_owner_id",
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

            migrationBuilder.DropPrimaryKey(
                name: "pk_slots",
                table: "slots");

            migrationBuilder.DropPrimaryKey(
                name: "pk_productions",
                table: "productions");

            migrationBuilder.DropPrimaryKey(
                name: "pk_positions",
                table: "positions");

            migrationBuilder.DropPrimaryKey(
                name: "pk_frames",
                table: "frames");

            migrationBuilder.DropPrimaryKey(
                name: "pk_domains",
                table: "domains");

            migrationBuilder.DropPrimaryKey(
                name: "pk_domain_values",
                table: "domain_values");

            migrationBuilder.DeleteData(
                table: "domains",
                keyColumn: "id",
                keyValue: new Guid("5077fc06-1b82-463e-bebc-909d8aa63537"));

            migrationBuilder.DropColumn(
                name: "is_read_only",
                table: "domains");

            migrationBuilder.RenameTable(
                name: "slots",
                newName: "Slots");

            migrationBuilder.RenameTable(
                name: "productions",
                newName: "Productions");

            migrationBuilder.RenameTable(
                name: "positions",
                newName: "Positions");

            migrationBuilder.RenameTable(
                name: "frames",
                newName: "Frames");

            migrationBuilder.RenameTable(
                name: "domains",
                newName: "Domains");

            migrationBuilder.RenameTable(
                name: "domain_values",
                newName: "DomainValues");

            migrationBuilder.RenameColumn(
                name: "name",
                table: "Slots",
                newName: "Name");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "Slots",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "value_id",
                table: "Slots",
                newName: "ValueId");

            migrationBuilder.RenameColumn(
                name: "production_id",
                table: "Slots",
                newName: "ProductionId");

            migrationBuilder.RenameColumn(
                name: "parent_id",
                table: "Slots",
                newName: "ParentId");

            migrationBuilder.RenameColumn(
                name: "owner_id",
                table: "Slots",
                newName: "OwnerId");

            migrationBuilder.RenameColumn(
                name: "is_inherited",
                table: "Slots",
                newName: "IsInherited");

            migrationBuilder.RenameColumn(
                name: "domain_id",
                table: "Slots",
                newName: "DomainId");

            migrationBuilder.RenameIndex(
                name: "ix_slots_value_id",
                table: "Slots",
                newName: "IX_Slots_ValueId");

            migrationBuilder.RenameIndex(
                name: "ix_slots_production_id",
                table: "Slots",
                newName: "IX_Slots_ProductionId");

            migrationBuilder.RenameIndex(
                name: "ix_slots_parent_id",
                table: "Slots",
                newName: "IX_Slots_ParentId");

            migrationBuilder.RenameIndex(
                name: "ix_slots_owner_id",
                table: "Slots",
                newName: "IX_Slots_OwnerId");

            migrationBuilder.RenameIndex(
                name: "ix_slots_domain_id",
                table: "Slots",
                newName: "IX_Slots_DomainId");

            migrationBuilder.RenameColumn(
                name: "text",
                table: "Productions",
                newName: "Text");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "Productions",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "y",
                table: "Positions",
                newName: "Y");

            migrationBuilder.RenameColumn(
                name: "x",
                table: "Positions",
                newName: "X");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "Positions",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "name",
                table: "Frames",
                newName: "Name");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "Frames",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "position_id",
                table: "Frames",
                newName: "PositionId");

            migrationBuilder.RenameColumn(
                name: "parent_id",
                table: "Frames",
                newName: "ParentId");

            migrationBuilder.RenameIndex(
                name: "ix_frames_position_id",
                table: "Frames",
                newName: "IX_Frames_PositionId");

            migrationBuilder.RenameIndex(
                name: "ix_frames_parent_id",
                table: "Frames",
                newName: "IX_Frames_ParentId");

            migrationBuilder.RenameColumn(
                name: "name",
                table: "Domains",
                newName: "Name");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "Domains",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "value",
                table: "DomainValues",
                newName: "Value");

            migrationBuilder.RenameColumn(
                name: "discriminator",
                table: "DomainValues",
                newName: "Discriminator");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "DomainValues",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "value_id",
                table: "DomainValues",
                newName: "ValueId");

            migrationBuilder.RenameColumn(
                name: "domain_id",
                table: "DomainValues",
                newName: "DomainId");

            migrationBuilder.RenameIndex(
                name: "ix_domain_values_value_id",
                table: "DomainValues",
                newName: "IX_DomainValues_ValueId");

            migrationBuilder.RenameIndex(
                name: "ix_domain_values_domain_id",
                table: "DomainValues",
                newName: "IX_DomainValues_DomainId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Slots",
                table: "Slots",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Productions",
                table: "Productions",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Positions",
                table: "Positions",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Frames",
                table: "Frames",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Domains",
                table: "Domains",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_DomainValues",
                table: "DomainValues",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_DomainValues_Domains_DomainId",
                table: "DomainValues",
                column: "DomainId",
                principalTable: "Domains",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_DomainValues_Frames_ValueId",
                table: "DomainValues",
                column: "ValueId",
                principalTable: "Frames",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Frames_Frames_ParentId",
                table: "Frames",
                column: "ParentId",
                principalTable: "Frames",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Frames_Positions_PositionId",
                table: "Frames",
                column: "PositionId",
                principalTable: "Positions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Slots_Domains_DomainId",
                table: "Slots",
                column: "DomainId",
                principalTable: "Domains",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Slots_Frames_OwnerId",
                table: "Slots",
                column: "OwnerId",
                principalTable: "Frames",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Slots_Slots_ParentId",
                table: "Slots",
                column: "ParentId",
                principalTable: "Slots",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Slots_Productions_ProductionId",
                table: "Slots",
                column: "ProductionId",
                principalTable: "Productions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Slots_DomainValues_ValueId",
                table: "Slots",
                column: "ValueId",
                principalTable: "DomainValues",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
