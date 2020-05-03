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
    [ApiController]
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
            // var query = _context.Users.Include(x => x.UserProfile).AsQueryable();
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
            // var query = _context.Users.Include(x => x.UserProfile).AsQueryable();
            GetAllDishesViewModel result = new GetAllDishesViewModel();
            result.Dishes = query.Select(d => new GetDishesViewModel
            {
                Id = d.Id,
                Name = d.Name,
                Description = d.Description,
                Price = d.Price,
                Ingredients = d.Ingredients,
                Weight = d.Weight,
                Image = d.Image,
                TypeOfDishId = d.TypeOfDishId
                
            }).ToList();

            //result.TypeOfDishes = query.Select(t => new GetTypeOfDishesViewModel
            //{
            //    TypeOfDishId = t.TypeOfDishId,
            //    TypeOfDishName = t.TypeOfDishName
            //}).ToList();


            return Ok(result);
        }

        [HttpPost]
        [Route("addtocart")]
        public IActionResult AddDishToCart([FromBody] AddDishToCartViewModel model)
        {
            var newCart = new TestCart
            {
                Name = model.Name
            };

            _context.TestCarts.Add(newCart);
            _context.SaveChanges();

            return Ok(new AddDishToCartViewModel
            {
                Id = newCart.Id,
                Name = newCart.Name
            });
           
        }
    }
}