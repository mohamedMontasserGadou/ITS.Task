using API.Infrastructure.Db;
using API.Models.Dto;
using API.Models.Entities;
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
        [HttpGet]
        public async Task<List<ItemDto>> GetItemByStepId(int stepId)
        {
            var step = await _dbContext.Steps.Include(s => s.Items).Where(s => s.Id == stepId).SingleAsync();
            var stepItems = step.Items;

            return stepItems.Select(i => new ItemDto { Id = i.Id, Description = i.Description, Title = i.Title }).ToList();
        }

        [HttpPost("AddNewItem")]
        public async Task<int> AddNewItem(CreateNewItemDto input)
        {
            var step = await _dbContext.Steps.Include(s => s.Items).Where(s => s.Id == input.StepId).SingleAsync();
            step.Items.Add(new Item { Description = input.Description, Title = input.Title });

            await _dbContext.SaveChangesAsync();


            return step.Items.OrderByDescending(i => i.Id).First().Id;
        }

        [HttpPost("EditItem")]
        public async Task EditItem(EditItemDto input)
        {
            var item = await _dbContext.Items.SingleAsync(i => i.Id == input.Id);

            item.Title = input.Title;
            item.Description = input.Description;

            await _dbContext.SaveChangesAsync();
        }

        [HttpPost("RemoveItem")]
        public async Task RemoveItem(int itemId)
        {
            var item = await _dbContext.Items.SingleAsync(i => i.Id == itemId);

            _dbContext.Items.Remove(item);

            await _dbContext.SaveChangesAsync();
        }
    }
}
