using Delivery.DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Delivery.ViewModels
{
    public class GetTypeOfCuisineViewModel
    {
        public int Id { get; set; }
        public string TypeOfCuisineName { get; set; }
        public string Image { get; set; }
    }

    public class GetAllTypesOfCuisinesViewModel
    {
        public ICollection<GetTypeOfCuisineViewModel> TypesOfCuisines { get; set; }
    }

    public class FiltersTypesOfDishesViewModel
    {
        public int CurrentPage { get; set; }
    }

    public class FiltersTypesOfCuisinesViewModel
    {
        public int CurrentPage { get; set; }
    }

    public class GetTypeOfDishesViewModel
    {
        public int Id { get; set; }
        public string TypeOfDishName { get; set; }
        // public string Image { get; set; }
    }

    public class GetAllTypesOfDishesViewModel
    {
        public ICollection<GetTypeOfDishesViewModel> TypeOfDishes { get; set; }
    }

    public class GetDishesViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Ingredients { get; set; }
        public string Description { get; set; }
        public double Weight { get; set; }
        public string Image { get; set; }
        public bool IsVegetarian { get; set; }
        public decimal Price { get; set; }
        public bool IsAvailable { get; set; }
        public int TypeOfCuisineId { get; set; }
        public virtual TypeOfCuisine TypeOfCuisineF { get; set; }
        public int TypeOfDishId { get; set; }
        public string TypeOfCuisineName { get; set; }
    }

    public class GetAllDishesViewModel
    {
        public ICollection<GetDishesViewModel> Dishes { get; set; }
    }

    public class FiltersDishesViewModel
    {
        public int CurrentPage { get; set; }
    }
    public class AddDishToCartViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }

    public class AllCartViewModel
    {
        public ICollection<AddDishToCartViewModel> AllCart { get; set; }
    }
}
