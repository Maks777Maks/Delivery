using System;
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
        [Required]
        public int Weight { get; set; }
        [Required, StringLength(200)]
        public string Image { get; set; }
        [Required]
        public bool IsVegetarian { get; set; }
        [Required]
        public decimal Price { get; set; }
        [Required]
        public bool IsAvailable { get; set; }

        public int TypeOfCuisineId { get; set; }
        public virtual TypeOfCuisine TypeOfCuisine { get; set; }
        public int TypeOfDishId { get; set; }
        public virtual TypeOfDish TypeOfDish { get; set; }
    }
}
