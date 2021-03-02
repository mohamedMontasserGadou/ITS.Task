using API.Infrastructure.EntitiesConfigurations;
using API.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Infrastructure.Db
{
    public class AppDbContext : DbContext
    {
        public virtual DbSet<Step> Steps { get; set; }
        public virtual DbSet<Item> Items { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration( new StepEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new ItemEntityTypeConfiguration());
        }
    }
}
