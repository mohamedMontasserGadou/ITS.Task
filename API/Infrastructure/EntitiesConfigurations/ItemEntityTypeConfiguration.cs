
using API.Models.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace API.Infrastructure.EntitiesConfigurations
{
    public class ItemEntityTypeConfiguration : IEntityTypeConfiguration<Item>
    {
        public void Configure(EntityTypeBuilder<Item> modelBuilder)
        {
            modelBuilder.ToTable("Items");
            modelBuilder.Property(item => item.Id).UseIdentityColumn();
            modelBuilder.Property(item => item.Title).HasMaxLength(50);
            modelBuilder.Property(item => item.Description).HasMaxLength(150);
        }
    }
}
