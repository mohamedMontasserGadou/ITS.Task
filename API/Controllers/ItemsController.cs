using API.Infrastructure.Db;
using API.Models.Dto;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ItemsController : ControllerBase
    {
        private readonly AppDbContext _dbContext;
        public ItemsController(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        public async Task<List<ItemDto>> GetItemByStepId(int stepId)
        {
            var step = await _dbContext.Steps.Include(s => s.Items).Where(s => s.Id == stepId).SingleAsync();
            var stepItems = step.Items;

            return stepItems.Select(i => new ItemDto { Id = i.Id, Description = i.Description, Title = i.Title }).ToList();
        }
    }
}
