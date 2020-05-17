using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Delivery.ViewModels
{
    public class LoginModel
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
    public class RegisterModel
    {       
        public string Name { get; set; }
        public string Surname { get; set; }
        public string BirthDate { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }
        public string Password { get; set; }
    }

    public class ForgotPasswordModel
    {
        public string Email { get; set; }
    }

    public class ChangePasswordModel
    {
        public string Id { get; set; }
        public string NewPassword { get; set; }
    }
}
