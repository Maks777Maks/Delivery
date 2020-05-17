using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Delivery.ViewModels
{
    public class IdUserVM
    {
        public string Id { get; set; }
    }
    public class UserProfileInfoVM
    {
        public string Name { get; set; }
        public string MiddleName { get; set; }
        public string Surname { get; set; }
        public DateTime BirthDate { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }
        public string Photo { get; set; }
    }

    public class UserBaseProfileInfoVM
    {
        public string Name { get; set; }
        public string MiddleName { get; set; }

        public string Surname { get; set; }
        public DateTime BirthDate { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }
    }

    public class UserNewPasswordVM
    {
        public string Password { get; set; }
    }
}
