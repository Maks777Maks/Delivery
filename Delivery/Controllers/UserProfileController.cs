using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Delivery.DAL.EFContext;
using Delivery.Services;
using Delivery.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Delivery.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class UserProfileController : ControllerBase
    {
        private readonly UserManager<DbUser> _userManager;
        private readonly EFDbContext _context;
        private readonly IJwtTokenService _jwtTokenService;
        public UserProfileController(EFDbContext context, UserManager<DbUser> userManager,
            IJwtTokenService jwtTokenService)
        {
            _userManager = userManager;
            _context = context;
            _jwtTokenService = jwtTokenService;
        }
        [HttpPost("getuserprofile")]
        public IActionResult GetUserProfile([FromBody] IdUserVM model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("");
            }
            var query = _context.Users.Include(x => x.UserProfile).AsQueryable();
            var u = query.FirstOrDefault(c => c.Id == model.Id);
            var result =  new UserProfileInfoVM
            {
                Id = u.Id,
                Name = u.UserProfile != null ? u.UserProfile.FirstName : null,
                Surname = u.UserProfile != null ? u.UserProfile.LastName : null,
                Email = u.Email,
                Phone = u.PhoneNumber,
                BirthDate = u.UserProfile == null ? DateTime.Now : u.UserProfile.BirthDate,
                Address = u.UserProfile.Address == null ? "no address" : u.UserProfile.Address,
                Photo = u.UserProfile.Photo
            };
            return Ok(result);
        }

        [HttpPost("setuserprofile")]
        public IActionResult SetUserBaseProfile([FromBody] UserBaseProfileInfoVM model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("");
            }

            var query = _context.Users.Include(x => x.UserProfile).AsQueryable();
            var u = query.FirstOrDefault(c => c.Id == model.Id);
            if (u == null)
            {
                return BadRequest("");
            }

            u.UserProfile.FirstName = model.Name;
            u.UserProfile.LastName = model.Surname;
            u.UserProfile.BirthDate = model.BirthDate;
            u.UserProfile.Address = model.Address;
            u.PhoneNumber = model.Phone;
            u.UserName = model.Email;
            u.Email = model.Email;
            _context.SaveChanges();

            var result = new UserProfileInfoVM
            {
                Id = u.Id,
                Name = u.UserProfile != null ? u.UserProfile.FirstName : null,
                Surname = u.UserProfile != null ? u.UserProfile.LastName : null,
                Email = u.Email,
                Phone = u.PhoneNumber,
                BirthDate = u.UserProfile == null ? DateTime.Now : u.UserProfile.BirthDate,
                Address = u.UserProfile.Address == null ? "no address" : u.UserProfile.Address,
                Photo = u.UserProfile.Photo
            };
            return Ok(result);
        }
    }
}