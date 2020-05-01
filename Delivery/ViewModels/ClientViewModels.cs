using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Delivery.ViewModels
{
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

    public class FiltersTypesOfDishesViewModel
    {
        public int CurrentPage { get; set; }

    }

    public class GetDishesViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Ingredients { get; set; }
        public string Description { get; set; }
        public double Weight { get; set; }
         public string Image { get; set; }
        //  public bool IsVegetarian { get; set; }
        public decimal Price { get; set; }
        //   public bool IsAvailable { get; set; }
        //  public int TypeOfCuisineId { get; set; }
        // public virtual TypeOfCuisine TypeOfCuisine { get; set; }
        public int TypeOfDishId { get; set; }
        //  public virtual TypeOfDish TypeOfDish { get; set; }
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
