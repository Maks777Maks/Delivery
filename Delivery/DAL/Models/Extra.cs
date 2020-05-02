using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Delivery.DAL.Models
{
    [Table("tblExtras")]
    public class Extra
    {
        [Key]
        public int Id { get; set; }
        [Required, StringLength(100)]
        public string Name { get; set; }
        [StringLength(500)]
        public string Description { get; set; }
        [StringLength(150)]
        public string Image { get; set; }
        [StringLength(50)]
        public string Measuring { get; set; }
        [Required]
        public decimal Price { get; set; }
    }
}
