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
    public class AuthController : ControllerBase
    {
        private readonly UserManager<DbUser> _userManager;
        private readonly SignInManager<DbUser> _signInManager;
        private readonly EFDbContext _context;
        private readonly IJwtTokenService _jwtTokenService;
        public AuthController(EFDbContext context, UserManager<DbUser> userManager, SignInManager<DbUser> sigInManager,
            IJwtTokenService jwtTokenService)
        {
            _userManager = userManager;
            _signInManager = sigInManager;
            _context = context;
            _jwtTokenService = jwtTokenService;
        }

        [HttpPost("login")]
        public async Task<ActionResult<string>> Login([FromBody] LoginModel model)
        {
            if (!ModelState.IsValid)
            {
                return "Введіть всі дані";
            }
            var user = _context.Users.Include(u=> u.UserProfile).FirstOrDefault(x => x.Email == model.Email);
            if (user == null)
            {
                return "Не правильна електронна пошта!";
            }
            var res = _signInManager
                .PasswordSignInAsync(user, model.Password, false, false).Result;
            if (!res.Succeeded)
            {
                return "Не правильний пароль!";
            }

            await _signInManager.SignInAsync(user, isPersistent: false);

            return Ok(new { token = _jwtTokenService.CreateToken(user) });
        }

        [HttpPost("register")]
        public IActionResult Register([FromBody] RegisterModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Введіть всі дані");
            }

            var roleName = "User";
            var user = new DbUser
            {
                Email = model.Email,
                UserName = model.Name,
                PhoneNumber = model.Phone
            };
            var result = _userManager.CreateAsync(user, model.Password).Result;
            var userProfile = new UserProfile
            {
                Id = user.Id,
                FirstName = model.Name != null ? model.Name : null,
                MiddleName = "",
                LastName = model.Surname != null ? model.Surname : null,
                RegistrationDate = DateTime.Now,
                BirthDate = Convert.ToDateTime(model.BirthDate),
                Address = model.Address
            };
            var userAccess = new UserAccess
            {
                Id = user.Id,
                Reason = "",
                DateBlock = DateTime.Now,
                IsUnblock = false
            };
            _context.UserProfile.Add(userProfile);
            _context.UsersAccesses.Add(userAccess);
            result = _userManager.AddToRoleAsync(user, roleName).Result;
            return Ok();
        }


        [HttpPost("forgot-password")]
        public ActionResult<string> SendEmailForgotPassword([FromBody] ForgotPasswordModel model)
        {
            if (!ModelState.IsValid)
                return "Введіть пошту";

            var user = _context.Users.FirstOrDefault(x => x.Email == model.Email);

            if (user == null)
                return "Введена неправильна пошта!";

            string url = "https://localhost:44362/api/auth/change-password" + "/" + "id=" + user.Id;
            EmailService.SendEmail(model.Email, url);
            return Ok();
        }

        [HttpPost("change-password")]
        public ActionResult<string> ForgotPassword([FromBody] ChangePasswordModel model)
        {    
            if (!ModelState.IsValid)
                return "Введіть всі дані";

            var user = _context.Users.FirstOrDefault(x => x.Id == model.Id);
            PasswordHasher<DbUser> hasher = new PasswordHasher<DbUser>();
            string hashedPassword = hasher.HashPassword(user, model.NewPassword);
            if (hasher.VerifyHashedPassword(user, hashedPassword, model.NewPassword) == PasswordVerificationResult.Success)
                user.PasswordHash = hashedPassword;
            _userManager.UpdateAsync(user);

            return Ok();
        }

    }
}