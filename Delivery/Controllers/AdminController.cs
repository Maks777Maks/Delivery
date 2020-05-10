using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Delivery.DAL.EFContext;
using Delivery.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
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
            var query = _context.Dishes.AsQueryable();
            GetAllDishesAdminViewModel result = new GetAllDishesAdminViewModel();
            result.Dishes = query.Select(d => new GetDishesAdminViewModel
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