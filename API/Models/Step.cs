﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models
{
    public class Step
    {
        public int Id { get; set; }
        public List<Item> Items { get; set; }
    }
}
