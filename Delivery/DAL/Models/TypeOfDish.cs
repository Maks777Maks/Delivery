using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Delivery.DAL.Models
{
    [Table("tblTypesOfDishes")]
    public class TypeOfDish
    {
        [Key]
        public int TypeOfDishId { get; set; }
        [Required, StringLength(150)]
        public string TypeOfDishName { get; set; }
        [StringLength(200)]
        public string Image { get; set; }
    }
}
