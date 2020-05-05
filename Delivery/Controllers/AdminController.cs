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
    [Authorize(Roles ="Admin")]
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

            //if(model.Age !=null)
            //{
            //    query = query.Where(x => x.UserProfile.BirthDate.Year == 25);
            //}

            GetAllUsersViewModel result = new GetAllUsersViewModel();
            //IQueryable<UserAccess> accessQuery = _context.UsersAccesses.AsQueryable();
            //var linq = from u in query
            //               join p in accessQuery on u.Id equals p.Id into gj
            //               from x in gj.DefaultIfEmpty()
            //               select new GetUserViewModel               
            //    {
            //        Id = u.Id,
            //        LastName = u.UserProfile.LastName,
            //        Name = u.UserProfile.FirstName,
            //        Email = u.Email,
            //        Phone = u.PhoneNumber,
            //        Age = DateTime.Now.Year - (u.UserProfile.BirthDate.Year),
            //        Status = x != null,
            //        Description = x.Reason
            //    };
            //result.Users = linq.ToList();

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

            //result.Users = query.Select(u=> new GetUserViewModel
            //{
            //    Id = u.Id,
            //    LastName = u.UserProfile != null? u.UserProfile.LastName: null,
            //    Name = u.UserProfile != null ? u.UserProfile.FirstName:null,
            //    Email = u.Email,
            //    Phone = u.PhoneNumber,
            //    Age = u.UserProfile != null ? DateTime.Now.Year - (u.UserProfile.BirthDate.Year):0,
            //    Status = true,
            //    Description = "LA LA LA "
            //}).ToList();
            return Ok(result);
        }

    }
}