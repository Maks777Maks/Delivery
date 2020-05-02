using Delivery.DAL.EFContext;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Delivery.DAL.Models
{
    [Table("tblOrders")]
    public class Order
    {
        [Key]
        public int Id { get; set; }

        // номер накладної чи рахунку
        [Required, StringLength(100)]
        public string OrderInvoice { get; set; }

        [ForeignKey("DbUser")]
        public string UserId { get; set; }
        public virtual DbUser DbUser { get; set; }

        public ICollection<DishInOrder> Dishes { get; set; }
        public ICollection<ExtraInOrder> Extras { get; set; }

        [Required]
        public DateTime DateOfCreate { get; set; }
        [Required]
        public DateTime DateOfDelivery { get; set; }

        [ForeignKey("OrderStatus")]
        public int OrderStatusId { get; set; }
        public virtual OrderStatus OrderStatus { get; set; }

        public decimal TotalPrice { get; set; }

        [Required, StringLength(200)]
        public string Address { get; set; }

        [StringLength(500)]
        public string CustomerWishes { get; set; }

        public DateTime DateReceived { get; set; }
        public DateTime DateCancel { get; set; }
    }
}
