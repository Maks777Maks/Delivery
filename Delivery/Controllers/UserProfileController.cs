using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Delivery.DAL.EFContext;
using Delivery.Services;
using Delivery.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace Delivery.Controllers
{
    // [Authorize]
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class UserProfileController : ControllerBase
    {
        private readonly UserManager<DbUser> _userManager;
        private readonly EFDbContext _context;
        private readonly IJwtTokenService _jwtTokenService;
        private readonly IConfiguration _configuration;
        public UserProfileController(EFDbContext context, UserManager<DbUser> userManager,
            IJwtTokenService jwtTokenService, IConfiguration configuration)
        {
            _userManager = userManager;
            _context = context;
            _jwtTokenService = jwtTokenService;
            _configuration = configuration;
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
                MiddleName = u.UserProfile != null ? u.UserProfile.MiddleName : null,
                Surname = u.UserProfile != null ? u.UserProfile.LastName : null,
                Email = u.Email,
                Phone = u.PhoneNumber,
                BirthDate = u.UserProfile == null ? DateTime.Now : u.UserProfile.BirthDate,
                Address = u.UserProfile.Address == null ? "no address" : u.UserProfile.Address,
                Photo = u.UserProfile.Photo
            };

            string path = $"{_configuration.GetValue<string>("UserUrlImages")}/250_";
            result.Photo = result.Photo != null ? path + result.Photo :
                    path + _configuration.GetValue<string>("DefaultImage");

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
            u.UserProfile.MiddleName = model.MiddleName;
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
                MiddleName = u.UserProfile != null ? u.UserProfile.MiddleName : null,
                Surname = u.UserProfile != null ? u.UserProfile.LastName : null,
                Email = u.Email,
                Phone = u.PhoneNumber,
                BirthDate = u.UserProfile == null ? DateTime.Now : u.UserProfile.BirthDate,
                Address = u.UserProfile.Address == null ? "no address" : u.UserProfile.Address,
                Photo = u.UserProfile.Photo
            };
            return Ok(result);
        }

        [HttpPost("changepassword")]
        public async Task<IActionResult> ChangePassword([FromBody] UserNewPasswordVM model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("");
            }

            // var userId = User.Claims.FirstOrDefault().Value;

            var user = _context.Users.FirstOrDefault(x => x.Id == model.Id);

            if(user == null || string.IsNullOrWhiteSpace(model.Password))
            {
                return BadRequest("");
            }

            var hash_password = _userManager.PasswordHasher.HashPassword(user, model.Password);
            user.PasswordHash = hash_password;
            var result = await _userManager.UpdateAsync(user);

            return Ok();
        }
    }
}