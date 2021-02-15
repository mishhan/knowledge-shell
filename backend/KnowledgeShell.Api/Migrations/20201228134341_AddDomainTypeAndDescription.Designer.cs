﻿// <auto-generated />
using System;
using KnowledgeShell.Api.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace KnowledgeShell.Api.Migrations
{
    [DbContext(typeof(AppDbContext))]
    [Migration("20201228134341_AddDomainTypeAndDescription")]
    partial class AddDomainTypeAndDescription
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn)
                .HasAnnotation("ProductVersion", "3.1.8")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            modelBuilder.Entity("KnowledgeShell.Api.Models.Domain", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnName("id")
                        .HasColumnType("uuid");

                    b.Property<string>("Description")
                        .HasColumnName("description")
                        .HasColumnType("text");

                    b.Property<int>("DomainType")
                        .HasColumnName("domain_type")
                        .HasColumnType("integer");

                    b.Property<Guid>("FrameBaseId")
                        .HasColumnName("frame_base_id")
                        .HasColumnType("uuid");

                    b.Property<bool>("IsReadOnly")
                        .HasColumnName("is_read_only")
                        .HasColumnType("boolean");

                    b.Property<string>("Name")
                        .HasColumnName("name")
                        .HasColumnType("text");

                    b.HasKey("Id")
                        .HasName("pk_domains");

                    b.HasIndex("FrameBaseId")
                        .HasName("ix_domains_frame_base_id");

                    b.ToTable("domains");
                });

            modelBuilder.Entity("KnowledgeShell.Api.Models.DomainValue", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnName("id")
                        .HasColumnType("uuid");

                    b.Property<string>("Discriminator")
                        .IsRequired()
                        .HasColumnName("discriminator")
                        .HasColumnType("text");

                    b.Property<Guid>("DomainId")
                        .HasColumnName("domain_id")
                        .HasColumnType("uuid");

                    b.Property<int>("Order")
                        .HasColumnName("order")
                        .HasColumnType("integer");

                    b.HasKey("Id")
                        .HasName("pk_domain_values");

                    b.HasIndex("DomainId")
                        .HasName("ix_domain_values_domain_id");

                    b.ToTable("domain_values");

                    b.HasDiscriminator<string>("Discriminator").HasValue("DomainValue");
                });

            modelBuilder.Entity("KnowledgeShell.Api.Models.Frame", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnName("id")
                        .HasColumnType("uuid");

                    b.Property<Guid>("FrameBaseId")
                        .HasColumnName("frame_base_id")
                        .HasColumnType("uuid");

                    b.Property<string>("Name")
                        .HasColumnName("name")
                        .HasColumnType("text");

                    b.Property<Guid?>("ParentId")
                        .HasColumnName("parent_id")
                        .HasColumnType("uuid");

                    b.Property<Guid>("PositionId")
                        .HasColumnName("position_id")
                        .HasColumnType("uuid");

                    b.HasKey("Id")
                        .HasName("pk_frames");

                    b.HasIndex("FrameBaseId")
                        .HasName("ix_frames_frame_base_id");

                    b.HasIndex("ParentId")
                        .HasName("ix_frames_parent_id");

                    b.HasIndex("PositionId")
                        .IsUnique()
                        .HasName("ix_frames_position_id");

                    b.ToTable("frames");
                });

            modelBuilder.Entity("KnowledgeShell.Api.Models.FrameBase", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnName("id")
                        .HasColumnType("uuid");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnName("created_at")
                        .HasColumnType("timestamp without time zone");

                    b.Property<string>("Name")
                        .HasColumnName("name")
                        .HasColumnType("text");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnName("updated_at")
                        .HasColumnType("timestamp without time zone");

                    b.HasKey("Id")
                        .HasName("pk_frame_bases");

                    b.ToTable("frame_bases");
                });

            modelBuilder.Entity("KnowledgeShell.Api.Models.Position", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnName("id")
                        .HasColumnType("uuid");

                    b.Property<double>("X")
                        .HasColumnName("x")
                        .HasColumnType("double precision");

                    b.Property<double>("Y")
                        .HasColumnName("y")
                        .HasColumnType("double precision");

                    b.HasKey("Id")
                        .HasName("pk_positions");

                    b.ToTable("positions");
                });

            modelBuilder.Entity("KnowledgeShell.Api.Models.Production", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnName("id")
                        .HasColumnType("uuid");

                    b.Property<Guid>("SlotId")
                        .HasColumnName("slot_id")
                        .HasColumnType("uuid");

                    b.Property<string>("Text")
                        .HasColumnName("text")
                        .HasColumnType("text");

                    b.HasKey("Id")
                        .HasName("pk_productions");

                    b.HasIndex("SlotId")
                        .IsUnique()
                        .HasName("ix_productions_slot_id");

                    b.ToTable("productions");
                });

            modelBuilder.Entity("KnowledgeShell.Api.Models.Slot", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnName("id")
                        .HasColumnType("uuid");

                    b.Property<Guid?>("DomainId")
                        .HasColumnName("domain_id")
                        .HasColumnType("uuid");

                    b.Property<bool>("IsInherited")
                        .HasColumnName("is_inherited")
                        .HasColumnType("boolean");

                    b.Property<string>("Name")
                        .HasColumnName("name")
                        .HasColumnType("text");

                    b.Property<int>("Order")
                        .HasColumnName("order")
                        .HasColumnType("integer");

                    b.Property<Guid>("OwnerId")
                        .HasColumnName("owner_id")
                        .HasColumnType("uuid");

                    b.Property<Guid?>("ParentId")
                        .HasColumnName("parent_id")
                        .HasColumnType("uuid");

                    b.Property<Guid?>("ValueId")
                        .HasColumnName("value_id")
                        .HasColumnType("uuid");

                    b.HasKey("Id")
                        .HasName("pk_slots");

                    b.HasIndex("DomainId")
                        .HasName("ix_slots_domain_id");

                    b.HasIndex("OwnerId")
                        .HasName("ix_slots_owner_id");

                    b.HasIndex("ParentId")
                        .HasName("ix_slots_parent_id");

                    b.HasIndex("ValueId")
                        .HasName("ix_slots_value_id");

                    b.ToTable("slots");
                });

            modelBuilder.Entity("KnowledgeShell.Api.Models.DomainValueFrame", b =>
                {
                    b.HasBaseType("KnowledgeShell.Api.Models.DomainValue");

                    b.Property<Guid>("FrameValueId")
                        .HasColumnName("frame_value_id")
                        .HasColumnType("uuid");

                    b.HasIndex("FrameValueId")
                        .HasName("ix_domain_values_frame_value_id");

                    b.HasDiscriminator().HasValue("DomainValueFrame");
                });

            modelBuilder.Entity("KnowledgeShell.Api.Models.DomainValueNumber", b =>
                {
                    b.HasBaseType("KnowledgeShell.Api.Models.DomainValue");

                    b.Property<double>("NumberValue")
                        .HasColumnName("number_value")
                        .HasColumnType("double precision");

                    b.HasDiscriminator().HasValue("DomainValueNumber");
                });

            modelBuilder.Entity("KnowledgeShell.Api.Models.DomainValueString", b =>
                {
                    b.HasBaseType("KnowledgeShell.Api.Models.DomainValue");

                    b.Property<string>("StringValue")
                        .HasColumnName("string_value")
                        .HasColumnType("text");

                    b.HasDiscriminator().HasValue("DomainValueString");
                });

            modelBuilder.Entity("KnowledgeShell.Api.Models.Domain", b =>
                {
                    b.HasOne("KnowledgeShell.Api.Models.FrameBase", "FrameBase")
                        .WithMany("Domains")
                        .HasForeignKey("FrameBaseId")
                        .HasConstraintName("fk_domains_frame_bases_frame_base_id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("KnowledgeShell.Api.Models.DomainValue", b =>
                {
                    b.HasOne("KnowledgeShell.Api.Models.Domain", "Domain")
                        .WithMany("DomainValues")
                        .HasForeignKey("DomainId")
                        .HasConstraintName("fk_domain_values_domains_domain_id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("KnowledgeShell.Api.Models.Frame", b =>
                {
                    b.HasOne("KnowledgeShell.Api.Models.FrameBase", "FrameBase")
                        .WithMany("Frames")
                        .HasForeignKey("FrameBaseId")
                        .HasConstraintName("fk_frames_frame_bases_frame_base_id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("KnowledgeShell.Api.Models.Frame", "Parent")
                        .WithMany("Children")
                        .HasForeignKey("ParentId")
                        .HasConstraintName("fk_frames_frames_parent_id")
                        .OnDelete(DeleteBehavior.SetNull);

                    b.HasOne("KnowledgeShell.Api.Models.Position", "Position")
                        .WithOne()
                        .HasForeignKey("KnowledgeShell.Api.Models.Frame", "PositionId")
                        .HasConstraintName("fk_frames_positions_position_id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("KnowledgeShell.Api.Models.Production", b =>
                {
                    b.HasOne("KnowledgeShell.Api.Models.Slot", "Slot")
                        .WithOne("Production")
                        .HasForeignKey("KnowledgeShell.Api.Models.Production", "SlotId")
                        .HasConstraintName("fk_productions_slots_slot_id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("KnowledgeShell.Api.Models.Slot", b =>
                {
                    b.HasOne("KnowledgeShell.Api.Models.Domain", "Domain")
                        .WithMany()
                        .HasForeignKey("DomainId")
                        .HasConstraintName("fk_slots_domains_domain_id")
                        .OnDelete(DeleteBehavior.SetNull);

                    b.HasOne("KnowledgeShell.Api.Models.Frame", "Owner")
                        .WithMany("OwnSlots")
                        .HasForeignKey("OwnerId")
                        .HasConstraintName("fk_slots_frames_owner_id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("KnowledgeShell.Api.Models.Slot", "Parent")
                        .WithMany("Children")
                        .HasForeignKey("ParentId")
                        .HasConstraintName("fk_slots_slots_parent_id")
                        .OnDelete(DeleteBehavior.SetNull);

                    b.HasOne("KnowledgeShell.Api.Models.DomainValue", "Value")
                        .WithMany()
                        .HasForeignKey("ValueId")
                        .HasConstraintName("fk_slots_domain_values_value_id")
                        .OnDelete(DeleteBehavior.SetNull);
                });

            modelBuilder.Entity("KnowledgeShell.Api.Models.DomainValueFrame", b =>
                {
                    b.HasOne("KnowledgeShell.Api.Models.Frame", "FrameValue")
                        .WithMany()
                        .HasForeignKey("FrameValueId")
                        .HasConstraintName("fk_domain_values_frames_frame_value_id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}
