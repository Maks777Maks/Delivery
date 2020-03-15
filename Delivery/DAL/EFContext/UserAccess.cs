using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Delivery.DAL.EFContext
{
    [Table("tblUsersAccesses")]
    public class UserAccess
    {
        [Key, ForeignKey("BlockedUser")]
        public string Id { get; set; }
        public virtual DbUser BlockedUser { get; set; }

        public DateTime DateBlock { get; set; }

        [Required, StringLength(500)]
        public string Reason { get; set; }

        public bool IsUnblock { get; set; }
    }
}
