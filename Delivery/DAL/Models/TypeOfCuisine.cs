using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Delivery.DAL.Models
{
    [Table("tblTypesOfCuisines")]
    public class TypeOfCuisine
    {
        [Key]
        public int Id { get; set; }
        [Required, StringLength(200)]
        public string TypeOfCuisineName { get; set; }
        [StringLength(200)]
        public string Image { get; set; }
    }
}
