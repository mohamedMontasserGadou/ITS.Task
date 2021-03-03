using API.Infrastructure.Db;
using API.Models.Entities;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Infrastructure.Seed
{
    public static class SeedDataHelper
    {
        public static IHost Seed(this IHost host)
        {
            using (var scope = host.Services.CreateScope())
            {
                using (var appContext = scope.ServiceProvider.GetRequiredService<AppDbContext>())
                {
                    if (appContext.Steps.Any())
                        return host;

                    appContext.Steps.Add(CreateDefaultData());
                    appContext.SaveChanges();
                }
            }
            return host;
        }


        private static Step CreateDefaultData()
        {
            return new Step
            {
                Items = new List<Item>
                {
                    new Item
                    {
                        Description = "Test",
                        Title = "Test",
                    },
                    new Item
                    {
                        Description = "Test",
                        Title = "Test",
                    },
                    new Item
                    {
                        Description = "Test",
                        Title = "Test",
                    }
                }
            };
        }
    }
}
