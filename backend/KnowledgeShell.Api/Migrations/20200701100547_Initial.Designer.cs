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
    [Migration("20200701100547_Initial")]
    partial class Initial
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn)
                .HasAnnotation("ProductVersion", "3.1.5")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            modelBuilder.Entity("KnowledgeShell.Api.Models.Domain", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Domains");
                });

            modelBuilder.Entity("KnowledgeShell.Api.Models.DomainValue", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<string>("Discriminator")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<Guid>("DomainId")
                        .HasColumnType("uuid");

                    b.HasKey("Id");

                    b.HasIndex("DomainId");

                    b.ToTable("DomainValues");

                    b.HasDiscriminator<string>("Discriminator").HasValue("DomainValue");
                });

            modelBuilder.Entity("KnowledgeShell.Api.Models.Frame", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.Property<Guid?>("ParentId")
                        .HasColumnType("uuid");

                    b.Property<Guid>("PositionId")
                        .HasColumnType("uuid");

                    b.HasKey("Id");

                    b.HasIndex("ParentId");

                    b.HasIndex("PositionId");

                    b.ToTable("Frames");
                });

            modelBuilder.Entity("KnowledgeShell.Api.Models.Position", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<double>("X")
                        .HasColumnType("double precision");

                    b.Property<double>("Y")
                        .HasColumnType("double precision");

                    b.HasKey("Id");

                    b.ToTable("Positions");
                });

            modelBuilder.Entity("KnowledgeShell.Api.Models.Production", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<string>("Text")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Productions");
                });

            modelBuilder.Entity("KnowledgeShell.Api.Models.Slot", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<Guid?>("DomainId")
                        .HasColumnType("uuid");

                    b.Property<bool>("IsInherited")
                        .HasColumnType("boolean");

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.Property<Guid>("OwnerId")
                        .HasColumnType("uuid");

                    b.Property<Guid?>("ParentId")
                        .HasColumnType("uuid");

                    b.Property<Guid?>("ProductionId")
                        .HasColumnType("uuid");

                    b.Property<Guid?>("ValueId")
                        .HasColumnType("uuid");

                    b.HasKey("Id");

                    b.HasIndex("DomainId");

                    b.HasIndex("OwnerId");

                    b.HasIndex("ParentId");

                    b.HasIndex("ProductionId");

                    b.HasIndex("ValueId");

                    b.ToTable("Slots");
                });

            modelBuilder.Entity("KnowledgeShell.Api.Models.DomainValueFrame", b =>
                {
                    b.HasBaseType("KnowledgeShell.Api.Models.DomainValue");

                    b.Property<Guid>("ValueId")
                        .HasColumnType("uuid");

                    b.HasIndex("ValueId");

                    b.HasDiscriminator().HasValue("DomainValueFrame");
                });

            modelBuilder.Entity("KnowledgeShell.Api.Models.DomainValueString", b =>
                {
                    b.HasBaseType("KnowledgeShell.Api.Models.DomainValue");

                    b.Property<string>("Value")
                        .HasColumnType("text");

                    b.HasDiscriminator().HasValue("DomainValueString");
                });

            modelBuilder.Entity("KnowledgeShell.Api.Models.DomainValue", b =>
                {
                    b.HasOne("KnowledgeShell.Api.Models.Domain", "Domain")
                        .WithMany("DomainValues")
                        .HasForeignKey("DomainId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("KnowledgeShell.Api.Models.Frame", b =>
                {
                    b.HasOne("KnowledgeShell.Api.Models.Frame", "Parent")
                        .WithMany("Children")
                        .HasForeignKey("ParentId");

                    b.HasOne("KnowledgeShell.Api.Models.Position", "Position")
                        .WithMany()
                        .HasForeignKey("PositionId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("KnowledgeShell.Api.Models.Slot", b =>
                {
                    b.HasOne("KnowledgeShell.Api.Models.Domain", "Domain")
                        .WithMany()
                        .HasForeignKey("DomainId");

                    b.HasOne("KnowledgeShell.Api.Models.Frame", "Owner")
                        .WithMany("OwnSlots")
                        .HasForeignKey("OwnerId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("KnowledgeShell.Api.Models.Slot", "Parent")
                        .WithMany("Children")
                        .HasForeignKey("ParentId");

                    b.HasOne("KnowledgeShell.Api.Models.Production", "Production")
                        .WithMany()
                        .HasForeignKey("ProductionId");

                    b.HasOne("KnowledgeShell.Api.Models.DomainValue", "Value")
                        .WithMany()
                        .HasForeignKey("ValueId");
                });

            modelBuilder.Entity("KnowledgeShell.Api.Models.DomainValueFrame", b =>
                {
                    b.HasOne("KnowledgeShell.Api.Models.Frame", "Value")
                        .WithMany()
                        .HasForeignKey("ValueId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}
