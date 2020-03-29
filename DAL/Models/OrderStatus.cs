using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Delivery.DAL.Models
{
    [Table("tblOrdersStatuses")]
    public class OrderStatus
    {
        [Key]
        public int StatusId { get; set; }
        [Required, StringLength(100)]
        public string StatusName { get; set; }
    }
}