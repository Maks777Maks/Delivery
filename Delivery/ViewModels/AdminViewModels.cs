using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Delivery.ViewModels
{

    public class GetUserViewModel
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string LastName { get; set; }
        public string Phone { get; set; }
        public int Age { get; set; }
        public string Email { get; set; }
        public bool Status { get; set; }
        public string Description { get; set; }
    }

    public class GetAllUsersViewModel
    {
        public ICollection<GetUserViewModel> Users { get; set; }
    }

    public class FiltersUsersViewModel
    {
        public int CurrentPage { get; set; }
       
    }

    public class ChangeImage
    {
        public string Photo { get; set; }
    }

}
