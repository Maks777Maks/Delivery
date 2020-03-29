using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Delivery.DAL.EFContext
{
    public abstract class BaseProfile
    {
        [Required, StringLength(100)]
        public string FirstName { get; set; }
        [Required, StringLength(100)]
        public string MiddleName { get; set; }
        [Required, StringLength(100)]
        public string LastName { get; set; }

        /// <summary>
        /// Фото користувача
        /// </summary>
        [Required, StringLength(150)]
        public string Photo { get; set; }

        /// <summary>
        /// Дата реєстрації
        /// </summary>
        public DateTime RegistrationDate { get; set; }

        /// <summary>
        /// Дата реєстрації
        /// </summary>
        public DateTime BirthDate { get; set; }
    }
}
