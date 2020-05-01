using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Delivery.DAL.EFContext
{
    [Table("tblUserProfile")]
    public class UserProfile : BaseProfile
    {
        [Key, ForeignKey("User")]
        public string Id { get; set; }
        public virtual DbUser User { get; set; }

        [StringLength(200)]
        public string Address { get; set; }
    }
}
