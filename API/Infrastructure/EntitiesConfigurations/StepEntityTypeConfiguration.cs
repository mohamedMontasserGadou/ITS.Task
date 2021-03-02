using API.Models.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace API.Infrastructure.EntitiesConfigurations
{
    public class StepEntityTypeConfiguration :IEntityTypeConfiguration<Step>
    {
        public void Configure(EntityTypeBuilder<Step> modelBuilder)
        {
            modelBuilder.ToTable("Items");
            modelBuilder.Property(item => item.Id).UseIdentityColumn();
            modelBuilder.HasMany(p => p.Items);
        }
    }
}
