namespace KnowledgeShell.Api.Data
{
    using Microsoft.EntityFrameworkCore;
    using KnowledgeShell.Api.Models;

    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<FrameBase> FrameBases { get; set; }
        public DbSet<Frame> Frames { get; set; }
        public DbSet<Position> Positions { get; set; }
        public DbSet<Domain> Domains { get; set; }
        public DbSet<Slot> Slots { get; set; }
        public DbSet<Production> Productions { get; set; }
        public DbSet<DomainValue> DomainValues { get; set; }
        public DbSet<DomainValueString> DomainValueStrings { get; set; }
        public DbSet<DomainValueFrame> DomainValueFrames { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSnakeCaseNamingConvention();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Base-Frame
            modelBuilder
                .Entity<FrameBase>()
                .HasMany(fb => fb.Frames)
                .WithOne(fr => fr.FrameBase)
                .HasForeignKey(fr => fr.FrameBaseId)
                .OnDelete(DeleteBehavior.Cascade);

            // Base-Domain
            modelBuilder
                .Entity<FrameBase>()
                .HasMany(fb => fb.Domains)
                .WithOne(d => d.FrameBase)
                .HasForeignKey(d => d.FrameBaseId)
                .OnDelete(DeleteBehavior.Cascade);

            // Frame parent-child hierarchy
            modelBuilder
                .Entity<Frame>()
                .HasMany(pfr => pfr.Children)
                .WithOne(fr => fr.Parent)
                .HasForeignKey(fr => fr.ParentId)
                .OnDelete(DeleteBehavior.SetNull);

            // Frame-Slot
            modelBuilder
                .Entity<Frame>()
                .HasMany(fr => fr.OwnSlots)
                .WithOne(sl => sl.Owner)
                .HasForeignKey(sl => sl.OwnerId)
                .OnDelete(DeleteBehavior.Cascade);

            // Frame-Position
            modelBuilder
                .Entity<Frame>()
                .HasOne(fr => fr.Position)
                .WithOne()
                .HasForeignKey<Frame>(fr => fr.PositionId)
                .OnDelete(DeleteBehavior.Cascade);

            // Slot parent-child hierarchy
            modelBuilder
                .Entity<Slot>()
                .HasMany(psl => psl.Children)
                .WithOne(sl => sl.Parent)
                .HasForeignKey(sl => sl.ParentId)
                .OnDelete(DeleteBehavior.SetNull);

            // Slot-Domain
            modelBuilder
                .Entity<Slot>()
                .HasOne(sl => sl.Domain)
                .WithMany()
                .OnDelete(DeleteBehavior.SetNull);

            // Slot-Value
            modelBuilder
                .Entity<Slot>()
                .HasOne(sl => sl.Value)
                .WithMany()
                .OnDelete(DeleteBehavior.SetNull);

            // Slot.Domain and Slot.Value don't have to be unique 
            modelBuilder
                .Entity<Slot>()
                .HasIndex(sl => sl.DomainId)
                .IsUnique(false);

            modelBuilder
                .Entity<Slot>()
                .HasIndex(sl => sl.ValueId)
                .IsUnique(false);

            //Slot-Production
            modelBuilder
                .Entity<Slot>()
                .HasOne(sl => sl.Production)
                .WithOne(pr => pr.Slot)
                .HasForeignKey<Production>(pr => pr.SlotId)
                .OnDelete(DeleteBehavior.Cascade);

            //Domain-Values
            modelBuilder
                .Entity<Domain>()
                .HasMany(d => d.DomainValues)
                .WithOne(dv => dv.Domain)
                .HasForeignKey(dv => dv.DomainId)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
