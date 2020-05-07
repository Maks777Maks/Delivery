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

    public class GetTypeOfDishesAdminViewModel
    {
        public int Id { get; set; }
        public string TypeOfDishName { get; set; }
    }

    public class GetAllTypesOfDishesAdminViewModel
    {
        public ICollection<GetTypeOfDishesAdminViewModel> TypeOfDishes { get; set; }
    }

    public class FiltersTypesOfDishesAdminViewModel
    {
        public int CurrentPage { get; set; }

    }

    public class GetDishesAdminViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Ingredients { get; set; }
        public string Description { get; set; }
        public double Weight { get; set; }
        public string Image { get; set; }
        public decimal Price { get; set; }
        public int TypeOfDishId { get; set; }
    }

    public class GetAllDishesAdminViewModel
    {
        public ICollection<GetDishesAdminViewModel> Dishes { get; set; }
    }

    public class FiltersDishesAdminViewModel
    {
        public int CurrentPage { get; set; }

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
