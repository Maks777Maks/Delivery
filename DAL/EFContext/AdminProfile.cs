using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Delivery.DAL.EFContext
{
    [Table("tblAdminProfile")]
    public class AdminProfile : BaseProfile
    {
        [Key, ForeignKey("User")]
        public string Id { get; set; }

        public virtual DbUser User { get; set; }
    }
}
