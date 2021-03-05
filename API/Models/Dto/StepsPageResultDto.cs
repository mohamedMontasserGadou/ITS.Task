using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models.Dto
{
    public class StepsPageResultDto
    {
        public int Total { get; set; }
        public List<StepDto> Data { get; set; }
    }
}
