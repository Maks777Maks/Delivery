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
        [HttpGet("getuserprofile")]
        public IActionResult GetUserProfile()
        {
            string userId = "";
            try
            {
                userId = User.Claims.FirstOrDefault().Value;
            }
            catch (Exception)
            {
                return BadRequest("Потрібно спочатку залогінитися!");
            }

            if (string.IsNullOrEmpty(userId))
            {
                return BadRequest("Потрібно спочатку залогінитися!");

            }

            var query = _context.Users.Include(x => x.UserProfile).AsQueryable();
            var u = query.FirstOrDefault(c => c.Id == userId);
            var result = new UserProfileInfoVM
            {
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
            string imagePath = u.UserProfile.Photo != null ? path + u.UserProfile.Photo :
                    path + _configuration.GetValue<string>("DefaultImage");

            result.Photo = imagePath;

            return Ok(result);
        }

        [HttpPost("setuserprofile")]
        public IActionResult SetUserBaseProfile([FromBody] UserBaseProfileInfoVM model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Передані некоректні дані");
            }

            var userId = User.Claims.FirstOrDefault().Value;

            if (string.IsNullOrEmpty(userId))
            {
                return BadRequest("Потрібно спочатку залогінитися!");
            }

            var query = _context.Users.Include(x => x.UserProfile).AsQueryable();
            var u = query.FirstOrDefault(c => c.Id == userId);

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
            // var userId = User.Claims.ToList()[0].Value;

            if (!ModelState.IsValid)
            {
                return BadRequest("Передані некоректні дані");
            }

            var userId = User.Claims.FirstOrDefault().Value;

            if (string.IsNullOrEmpty(userId))
            {
                return BadRequest("Потрібно спочатку залогінитися!");
            }

            var user = _context.Users.FirstOrDefault(x => x.Id == userId);

            if (user == null || string.IsNullOrWhiteSpace(model.Password))
            {
                return BadRequest("Передані некоректні дані");
            }

            var isValid = await _userManager.CheckPasswordAsync(user, model.Password);

            if (isValid)
            {
                return BadRequest("Введено старий пароль! Спробуйте щераз!");
            }

            var hash_password = _userManager.PasswordHasher.HashPassword(user, model.Password);
            user.PasswordHash = hash_password;
            var result = await _userManager.UpdateAsync(user);

            return Ok();
        }
    }
}