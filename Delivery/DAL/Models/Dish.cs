﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Delivery.DAL.Models
{
    [Table("tblDishes")]
    public class Dish
    {
        [Key]
        public int Id { get; set; }
        [Required, StringLength(200)]
        public string Name { get; set; }
        [Required, StringLength(500)]
        public string Ingredients { get; set; }
        [Required, StringLength(1000)]
        public string Description { get; set; }

        public int Weight { get; set; }
        [Required, StringLength(200)]
        public string Image { get; set; }

        public bool IsVegetarian { get; set; }

        public decimal Price { get; set; }

        public bool IsAvailable { get; set; }

        [ForeignKey("TypeOfCuisine")]
        public int TypeOfCuisineId { get; set; }
        public virtual TypeOfCuisine TypeOfCuisine { get; set; }

        [ForeignKey("TypeOfDish")]
        public int TypeOfDishId { get; set; }
        public virtual TypeOfDish TypeOfDish { get; set; }
    }
}
