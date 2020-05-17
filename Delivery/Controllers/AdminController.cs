using System;
using System.Collections.Generic;
using System.Linq;
using Delivery.DAL.EFContext;
using Delivery.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Delivery.Controllers
{
    [Authorize(Roles = "Admin")]
    [Produces("application/json")]
    [Route("api/[controller]")]

    public class AdminController : ControllerBase
    {
        private readonly UserManager<DbUser> _userManager;
        private readonly EFDbContext _context;

        public AdminController(UserManager<DbUser> userManager, EFDbContext context)
        {
            _context = context;
            _userManager = userManager;
        }

        [HttpPost("getusers")]
        public IActionResult GetAllUsers([FromBody] FiltersUsersViewModel model)

        {
            if (!ModelState.IsValid)
            {
                return BadRequest("");
            }

            var query = _context.UserProfile.Include(u => u.User).AsQueryable();

            GetAllUsersViewModel result = new GetAllUsersViewModel();

            result.Users = query.Select(u => new GetUserViewModel
            {
                Id = u.Id,
                LastName = u.LastName,
                Name = u.FirstName,
                Email = u.User.Email,
                Phone = u.User.PhoneNumber,
                Status = true,
                Description = "LA LA LA ",
                Age = DateTime.Now.Year - (u.BirthDate.Year),
            }).ToList();

            return Ok(result);
        }
        [HttpPost("getdishes")]
        public IActionResult GetDishes([FromBody] FiltersDishesAdminViewModel model)
        {
            var Dishes = _context.Dishes.ToList();
            var query = _context.DishesInOrder.Where(x => x.Order.OrderStatusId == 3).AsQueryable();
            GetAllDishesAdminViewModel result = new GetAllDishesAdminViewModel();
            result.Dishes = new List<GetDishesAdminViewModel>();
            foreach(var item in Dishes)
            {
                int temp = query.Where(x => x.Dish.Id == item.Id).Count();
                if (temp > 0)
                {
                    result.Dishes.Add(new GetDishesAdminViewModel
                    {
                        Id = item.Id,
                        Name = item.Name,
                        Description = item.Description,
                        Price = item.Price,
                        Ingredients = item.Ingredients,
                        Weight = item.Weight,
                        Image = item.Image,
                        TypeOfDishId = item.TypeOfDishId,
                        Count = temp
                    });
                }
            }
            result.Dishes = result.Dishes.OrderBy(o => o.Count).Reverse().ToList();
            return Ok(result);
        }


        [HttpGet("getprocentdishes")]
        public IActionResult GetAllOrderDishes()

        {
            var typeOfCuisine = _context.TypesOfCuisines.ToList();
            var query = _context.DishesInOrder.Where(x => x.Order.OrderStatusId == 3).AsQueryable();
           
            GetPieDataViewModel result = new GetPieDataViewModel();
            result.TypeOfCuisines = new List<GetTypeOfCuisineViewModel>();
            foreach (var item in typeOfCuisine)
            {
                int temp = query.Where(x => x.Dish.TypeOfCuisine.Id == item.Id).Count();
                result.TypeOfCuisines.Add(new GetTypeOfCuisineViewModel
                {
                    Id = item.Id,
                    Name = item.TypeOfCuisineName,
                    Count = temp
                });
            }
            return Ok(result);
        }
    }
}