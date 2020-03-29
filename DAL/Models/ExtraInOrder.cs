using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Delivery.DAL.Models
{
    [Table("tblExtrasInOrder")]
    public class ExtraInOrder
    {
        [Key]
        public int ExtraInOrderId { get; set; }

        [ForeignKey("OrderId")]
        public int OrderId { get; set; }
        public virtual Order Order { get; set; }

        [ForeignKey("ExtraId")]
        public int ExtraId { get; set; }
        public virtual Extra Extra { get; set; }

        [Required]
        public int Amount { get; set; }
    }
}
