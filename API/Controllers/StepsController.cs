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
    public class StepsController : ControllerBase
    {
        private readonly AppDbContext _dbContext;
        public StepsController(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        [HttpPost("AddNewStep")]
        public async Task<int> AddNewStep()
        {
            var createdStep = await _dbContext.AddAsync(new Step());

            await _dbContext.SaveChangesAsync();

            return createdStep.Entity.Id;
        }
        [HttpGet("GetAllSteps")]
        public async Task<List<StepDto>> GetAllSteps()
        {
            var stepsIds = await _dbContext.Steps.Select(s => s.Id).ToListAsync();

            return stepsIds.Select(s => new StepDto { Id = s }).ToList();
        }

        [HttpPost("RemoveStep")]
        public async Task RemoveStep([FromBody]int stepId)
        {
            var removedStep = await _dbContext.Steps.Include(s => s.Items).SingleOrDefaultAsync(s => s.Id == stepId);

            if (removedStep == null)
                return;

            _dbContext.Steps.Remove(removedStep);
            await _dbContext.SaveChangesAsync();
        }

    }
}
