﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models.Dto
{
    public class CreateNewItemDto
    {
        public int StepId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
    }
}
