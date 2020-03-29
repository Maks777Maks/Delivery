using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Delivery.DAL.Models
{
    [Table("tblDishesInOrder")]
    public class DishInOrder
    {
        [Key]
        public int DishesInOrderId { get; set; }

        [ForeignKey("OrderId")]
        public int OrderId { get; set; }
        public virtual Order Order { get; set; }

        [ForeignKey("DishId")]
        public int DishId { get; set; }
        public virtual Dish Dish { get; set; }

        public int Amount { get; set; }
    }
}
