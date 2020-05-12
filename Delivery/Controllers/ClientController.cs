using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Delivery.DAL.EFContext;
using Delivery.DAL.Models;
using Delivery.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Delivery.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
      public class ClientController : ControllerBase
    {
        private readonly EFDbContext _context;
        public ClientController(EFDbContext context)
        {
            _context = context;
        }

        [HttpPost("gettypesdishes")]
        public IActionResult GetAllTypesOfDishes([FromBody] FiltersTypesOfDishesViewModel model)
        {
            var query = _context.TypesOfDishes.AsQueryable();
            GetAllTypesOfDishesViewModel result = new GetAllTypesOfDishesViewModel();

            result.TypeOfDishes = query.Select(t => new GetTypeOfDishesViewModel
            {
                Id = t.Id,
                TypeOfDishName = t.TypeOfDishName
            }).ToList();

            return Ok(result);
        }

        [HttpPost("getdishes")]
        public IActionResult GetDishes([FromBody] FiltersDishesViewModel model)
        {
            var query = _context.Dishes.AsQueryable();
            GetAllDishesViewModel result = new GetAllDishesViewModel();

            var queryCuisines = _context.TypesOfCuisines.AsQueryable();
            GetAllTypesOfCuisinesViewModel cuisines = new GetAllTypesOfCuisinesViewModel();

            cuisines.TypesOfCuisines = queryCuisines.Select(c => new GetTypeOfCuisineViewModel
            {
                Id = c.Id,
                TypeOfCuisineName = c.TypeOfCuisineName
            }).ToList();

            result.Dishes = query.Select(d => new GetDishesViewModel
            {
                Id = d.Id,
                Name = d.Name,
                Description = d.Description,
                Price = d.Price,
                Ingredients = d.Ingredients,
                Weight = d.Weight,
                Image = d.Image,
                TypeOfDishId = d.TypeOfDishId,
                IsAvailable = d.IsAvailable,
                IsVegetarian = d.IsVegetarian,
                TypeOfCuisineId = d.TypeOfCuisineId,
                TypeOfCuisineName = ""
            }).ToList();

            foreach (var item in result.Dishes)
            {
                var typeCuisine = _context.TypesOfCuisines.Find(item.TypeOfCuisineId);
                item.TypeOfCuisineName = typeCuisine.TypeOfCuisineName;
            }

            return Ok(result);
        }

        [HttpPost("gettypescuisines")]
        public IActionResult GetAllTypesOfCuisines([FromBody] FiltersTypesOfCuisinesViewModel model)
        {
            var queryCuisines = _context.TypesOfCuisines.AsQueryable();
            GetAllTypesOfCuisinesViewModel result = new GetAllTypesOfCuisinesViewModel();

            result.TypesOfCuisines = queryCuisines.Select(c => new GetTypeOfCuisineViewModel
            {
                Id = c.Id,
                Image = c.Image,
                TypeOfCuisineName = c.TypeOfCuisineName
            }).ToList();
            return Ok(result);
        }
    }
}